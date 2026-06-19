#!/usr/bin/env python3
"""
scripts/gather_weekly.py
========================
Saturday data-gathering script for the weekly edition.

Run once before writing each edition. Takes ~60 seconds.

Auto-fetches:
  - Global market prices (yfinance: crude, gold, silver, nat gas, equities, FX)
  - PSX indices (scrape dps.psx.com.pk)
  - Pakistan + global news via direct RSS feeds
  - Pakistan economic news via Google News RSS (free, no API key)

You fill in manually (clearly marked FILL_ME in output):
  - Dubai Platts, SBP reserves, policy rate, T-bill/PIB yields
  - FBR revenue, SPI/CPI, fuel prices, IRSA water levels
  - PMD monsoon outlook, disruption calendar, edition theme

Output (written to scripts/weekly_drafts/):
  - weekly_data_YYYY-MM-DD.json   (feeds draft_edition.py)
  - weekly_brief_YYYY-MM-DD.md    (human-readable review)

Usage:
  python3 scripts/gather_weekly.py
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import quote_plus
from zoneinfo import ZoneInfo

import feedparser
import requests
import yfinance as yf
from bs4 import BeautifulSoup

OUTPUT_DIR = Path(__file__).resolve().parent / "weekly_drafts"
PKT = ZoneInfo("Asia/Karachi")
TIMEOUT = 20
BROWSER_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"


# ---------------------------------------------------------------------------
# CONFIGURATION
# ---------------------------------------------------------------------------

MARKET_SYMBOLS = {
    "Brent Crude ($/bbl)":    "BZ=F",
    "WTI Crude ($/bbl)":      "CL=F",
    "Gold ($/oz)":            "GC=F",
    "Silver ($/oz)":          "SI=F",
    "Natural Gas ($/MMBtu)":  "NG=F",
    "S&P 500":                "^GSPC",
    "Nasdaq":                 "^IXIC",
    "Nikkei 225":             "^N225",
    "Hang Seng":              "^HSI",
    "Sensex":                 "^BSESN",
    "EUR / USD":              "EURUSD=X",
    "GBP / USD":              "GBPUSD=X",
    "USD / CNY":              "CNY=X",
    "USD / PKR":              "PKR=X",
}

# Direct RSS feeds — Pakistan + international
RSS_FEEDS = {
    "Dawn Business":        "https://www.dawn.com/feeds/business",
    "Business Recorder":    "https://www.brecorder.com/feeds/latest-news",
    "The News Business":    "https://www.thenews.com.pk/rss/2/9",
    "Al Jazeera Economy":   "https://www.aljazeera.com/xml/rss/all.xml",
}

# Google News RSS queries — replaces Tavily, zero cost
GNEWS_QUERIES = [
    "Pakistan economy macro this week",
    "Pakistan SBP reserves rupee exchange rate",
    "Pakistan FBR tax revenue",
    "Pakistan budget IMF programme",
    "KSE-100 PSX stock market Pakistan",
    "Pakistan oil fuel prices OGRA petrol diesel",
    "Pakistan inflation SPI CPI",
    "Brent crude oil OPEC price",
    "Pakistan exports imports trade balance",
    "Pakistan agriculture monsoon wheat cotton",
    "Pakistan logistics shipping freight Karachi port",
    "Pakistan political news government",
]

# Theme buckets for classifying gathered news
THEMES = {
    "Macro / PKR / Inflation": [
        "inflation", "spi", "cpi", "rupee", "reer", "pkr", "reserves",
        "sbp", "policy rate", "interest rate", "monetary",
    ],
    "Oil / Energy / Fuel": [
        "oil", "brent", "crude", "opec", "fuel", "petrol", "diesel",
        "ogra", "platts", "pso", "lng", "gas", "energy",
    ],
    "Budget / IMF / Fiscal": [
        "budget", "imf", "fbr", "tax", "fiscal", "deficit", "tranche",
        "levy", "fy27", "fy26", "revenue", "expenditure",
    ],
    "Commodities": [
        "palm", "cpo", "soybean", "wheat", "cotton", "commodity",
        "hdpe", "sugar", "urea", "fertilizer", "resin",
    ],
    "Markets / KSE / PSX": [
        "kse", "psx", "stock", "bond", "yield", "equities",
        "index", "t-bill", "pib", "securities",
    ],
    "Trade / Logistics": [
        "shipping", "freight", "port", "container", "suez",
        "export", "import", "trade", "logistics", "karachi port",
    ],
    "Weather / Agriculture": [
        "monsoon", "rain", "crop", "irsa", "water", "harvest",
        "wheat", "cotton", "pmd", "drought", "flood",
    ],
    "Political / Regulatory": [
        "government", "ministry", "sro", "notification", "policy",
        "political", "province", "cabinet", "parliament",
    ],
}


# ---------------------------------------------------------------------------
# FETCHERS
# ---------------------------------------------------------------------------

def fetch_yfinance(symbol: str) -> dict | None:
    try:
        hist = yf.Ticker(symbol).history(period="10d").dropna(subset=["Close"])
        if hist.empty:
            return None
        last = hist.iloc[-1]
        return {
            "date":       str(last.name.date()),
            "close":      float(last["Close"]),
            "open":       float(last["Open"]),
            "high":       float(last["High"]),
            "low":        float(last["Low"]),
            "prev_close": float(hist.iloc[-2]["Close"]) if len(hist) >= 2 else None,
        }
    except Exception as e:
        print(f"  [yfinance fail] {symbol}: {e}", file=sys.stderr)
        return None


def pct_change(current: float, prev: float | None) -> str:
    if prev and prev != 0:
        pct = ((current - prev) / prev) * 100
        sign = "+" if pct > 0 else ""
        return f"{sign}{pct:.2f}%"
    return "n/a"


def fetch_psx() -> dict:
    url = "https://dps.psx.com.pk/indices"
    try:
        r = requests.get(url, headers={"User-Agent": BROWSER_UA}, timeout=TIMEOUT)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        table = soup.find("table")
        indices = {}
        if table:
            for row in table.find_all("tr"):
                cells = row.find_all(["td", "th"])
                if len(cells) < 6:
                    continue
                name = re.sub(r"\s*\([\d\-\s:]+\)\s*", "", cells[0].get_text(strip=True)).strip()
                if name.lower() in ("index", ""):
                    continue
                indices[name] = {
                    "current":    cells[3].get_text(strip=True),
                    "change":     cells[4].get_text(strip=True),
                    "change_pct": cells[5].get_text(strip=True),
                    "high":       cells[1].get_text(strip=True),
                    "low":        cells[2].get_text(strip=True),
                }
        return indices
    except Exception as e:
        print(f"  [PSX fail] {e}", file=sys.stderr)
        return {}


def fetch_rss(feeds: dict, max_per_feed: int = 12) -> list:
    items = []
    for name, url in feeds.items():
        try:
            r = requests.get(url, headers={"User-Agent": BROWSER_UA}, timeout=TIMEOUT)
            parsed = feedparser.parse(r.text)
            count = 0
            for e in parsed.entries[:max_per_feed]:
                items.append({
                    "source":    name,
                    "title":     e.get("title", "").strip(),
                    "summary":   (e.get("summary", "") or "")[:300].strip(),
                    "link":      e.get("link", ""),
                    "published": e.get("published", e.get("updated", "")),
                })
                count += 1
            status = f"{count} items" if count else "no entries (feed may be down)"
            print(f"  [rss]   {name}: {status}")
        except Exception as ex:
            print(f"  [rss fail] {name}: {ex}")
    return items


def fetch_gnews(queries: list, max_per_query: int = 5) -> list:
    items = []
    for q in queries:
        url = f"https://news.google.com/rss/search?q={quote_plus(q)}&hl=en-US&gl=US&ceid=US:en"
        try:
            r = requests.get(url, headers={"User-Agent": BROWSER_UA}, timeout=TIMEOUT)
            feed = feedparser.parse(r.text)
            count = 0
            for e in feed.entries[:max_per_query]:
                items.append({
                    "source":    f"Google News",
                    "query":     q,
                    "title":     e.get("title", "").strip(),
                    "summary":   (e.get("summary", "") or "")[:300].strip(),
                    "link":      e.get("link", ""),
                    "published": e.get("published", ""),
                })
                count += 1
            print(f"  [gnews] {q}: {count} results")
        except Exception as ex:
            print(f"  [gnews fail] {q}: {ex}")
    return items


def classify(item: dict) -> list:
    blob = (item.get("title", "") + " " + item.get("summary", "")).lower()
    hits = [theme for theme, kws in THEMES.items() if any(kw in blob for kw in kws)]
    return hits or ["Unsorted"]


# ---------------------------------------------------------------------------
# MARKDOWN BRIEF BUILDER
# ---------------------------------------------------------------------------

def build_md(data: dict) -> str:
    lines = [
        "# The Pulse Paper — Weekly Data Brief",
        f"**Gathered:** {data['run_date']}",
        "",
        "_Auto-gathered. Verify all figures before publishing._",
        "_Fill in every FILL_ME field, then run: `python3 scripts/draft_edition.py`_",
        "",
        "---",
        "## MANUAL FIELDS — complete before drafting",
        "",
    ]
    for k, v in data["manual"].items():
        lines.append(f"- **{k}:** {v}")

    lines += ["", "---", "## MARKET DATA (auto-fetched)", ""]
    for name, d in data["markets"].items():
        if d:
            wow = pct_change(d["close"], d.get("prev_close"))
            lines.append(f"- **{name}:** {d['close']:.6g}  ({wow} vs prev session, as of {d['date']})")
        else:
            lines.append(f"- **{name}:** ⚠ STALE — fetch failed, check manually")

    key_indices = ["KSE100", "KSE30", "KMI30", "ALLSHR", "BKTI", "OGTI", "ACI"]
    lines += ["", "---", "## PSX INDICES (auto-fetched)", ""]
    for name in key_indices:
        if name in data["psx"]:
            d = data["psx"][name]
            lines.append(f"- **{name}:** {d['current']}  {d['change']} ({d['change_pct']})")
    other_psx = {k: v for k, v in data["psx"].items() if k not in key_indices}
    if other_psx:
        lines.append("")
        lines.append("**Other indices:**")
        for name, d in other_psx.items():
            lines.append(f"- {name}: {d['current']}  {d['change_pct']}")

    lines += ["", "---", "## NEWS BY THEME", ""]
    for theme, items in data["news_by_theme"].items():
        if not items:
            continue
        lines.append(f"\n### {theme}")
        seen = set()
        count = 0
        for it in items:
            title = it.get("title", "")
            if title in seen or not title:
                continue
            seen.add(title)
            src = it.get("source", "")
            lines.append(f"- [{title}]({it.get('link', '')})  _{src}_")
            count += 1
            if count >= 8:
                break

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    now = datetime.now(PKT)
    run_date = now.strftime("%-d %B %Y, %-I:%M %p PKT")
    date_slug = now.strftime("%Y-%m-%d")

    print(f"=== Pulse Weekly Gather — {run_date} ===\n")
    OUTPUT_DIR.mkdir(exist_ok=True)

    # 1. Market data
    print("[1/4] Fetching market data (yfinance)...")
    markets = {}
    for label, sym in MARKET_SYMBOLS.items():
        d = fetch_yfinance(sym)
        markets[label] = d
        if d:
            wow = pct_change(d["close"], d.get("prev_close"))
            print(f"  OK    {label}: {d['close']:.6g}  ({wow})")
        else:
            print(f"  STALE {label}")

    # 2. PSX indices
    print("\n[2/4] Fetching PSX indices...")
    psx = fetch_psx()
    kse = psx.get("KSE100", {})
    print(f"  Got {len(psx)} indices  |  KSE-100: {kse.get('current', 'n/a')}  {kse.get('change_pct', '')}")

    # 3. News
    print("\n[3/4] Gathering news...")
    rss_items   = fetch_rss(RSS_FEEDS)
    gnews_items = fetch_gnews(GNEWS_QUERIES)
    all_news    = rss_items + gnews_items
    print(f"  Total: {len(all_news)} items ({len(rss_items)} RSS + {len(gnews_items)} Google News)")

    themed: dict[str, list] = {t: [] for t in list(THEMES.keys()) + ["Unsorted"]}
    for item in all_news:
        for t in classify(item):
            themed[t].append(item)

    # 4. Manual fields scaffold
    print("\n[4/4] Building output files...")
    manual = {
        "Edition number":                  "FILL_ME — e.g. No. 06",
        "Edition date":                    now.strftime("%-d %B %Y"),
        "Edition theme / through-line":    "FILL_ME — the dominant story this week in one sentence",
        "Dubai Platts ($/bbl)":            "FILL_ME — check broker report or Platts",
        "SBP forex reserves, gross ($bn)": "FILL_ME — SBP weekly bulletin",
        "SBP policy rate (%)":             "FILL_ME — last MPC decision",
        "T-bill 3M cut-off yield (%)":     "FILL_ME — latest SBP auction",
        "T-bill 6M cut-off yield (%)":     "FILL_ME — latest SBP auction",
        "T-bill 12M cut-off yield (%)":    "FILL_ME — latest SBP auction",
        "PIB 2Y cut-off yield (%)":        "FILL_ME — latest SBP auction (if held this week)",
        "PIB 3Y cut-off yield (%)":        "FILL_ME — latest SBP auction (if held this week)",
        "FBR revenue YTD (Rs bn)":         "FILL_ME — FBR press release / media report",
        "FBR revenue YTD target (Rs bn)":  "FILL_ME — budget prorated target",
        "SPI latest YoY (%)":              "FILL_ME — PBS weekly SPI release (Thursday)",
        "CPI latest YoY (%)":              "FILL_ME — PBS monthly release (if out this week)",
        "Petrol (MS) price (Rs/L)":        "FILL_ME — current OGRA fortnightly notification",
        "Diesel (HSD) price (Rs/L)":       "FILL_ME — current OGRA notification",
        "Kerosene price (Rs/L)":           "FILL_ME — current OGRA notification",
        "LDO price (Rs/L)":                "FILL_ME — current OGRA notification",
        "Tarbela live storage (MAF)":      "FILL_ME — IRSA weekly bulletin",
        "Mangla live storage (MAF)":       "FILL_ME — IRSA weekly bulletin",
        "Total system water (MAF)":        "FILL_ME — IRSA weekly bulletin",
        "PMD monsoon outlook":             "FILL_ME — PMD advisory / media report",
        "CPO price (MYR/MT)":              "FILL_ME — Bursa Malaysia / broker report",
        "Wheat (international, $/MT)":     "FILL_ME — CBOT or broker report",
        "Disruption calendar":             "FILL_ME — upcoming events: strikes, protests, political dates, elections",
        "Key regulatory actions this week":"FILL_ME — SROs, OGRA notifications, SBP circulars issued this week",
        "Editorial notes":                 "FILL_ME — anything the auto-fetch missed that matters this week",
    }

    output = {
        "run_date":      run_date,
        "date_slug":     date_slug,
        "markets":       markets,
        "psx":           psx,
        "news_by_theme": themed,
        "manual":        manual,
    }

    json_path = OUTPUT_DIR / f"weekly_data_{date_slug}.json"
    md_path   = OUTPUT_DIR / f"weekly_brief_{date_slug}.md"

    json_path.write_text(json.dumps(output, indent=2, default=str), encoding="utf-8")
    md_path.write_text(build_md(output), encoding="utf-8")

    print(f"\n  ✓  {json_path}")
    print(f"  ✓  {md_path}")
    print(f"\n--- Next steps ---")
    print(f"1. Open {md_path.name} and fill in all FILL_ME fields")
    print(f"2. Save the filled values back into {json_path.name} under 'manual'")
    print(f"3. Run: python3 scripts/draft_edition.py {date_slug}")


if __name__ == "__main__":
    main()
