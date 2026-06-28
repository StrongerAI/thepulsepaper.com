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

Auto-fills most data fields via scraping + yfinance + Claude Haiku extraction.
You fill in only editorial judgment fields (clearly marked FILL_ME):
  - Edition theme / through-line
  - Disruption calendar
  - Any remaining FILL_ME fields where scraping failed

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


def parse_pub_date(date_str: str) -> datetime | None:
    """Try to parse a published date from RSS/Google News into a datetime."""
    if not date_str:
        return None
    from email.utils import parsedate_to_datetime
    try:
        return parsedate_to_datetime(date_str)
    except Exception:
        pass
    for fmt in ("%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d", "%d %b %Y"):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    return None


def filter_stale_news(items: list, max_age_days: int = 14) -> list:
    """Remove news items older than max_age_days. Tag each item with date_parsed."""
    cutoff = datetime.now(tz=None) - __import__("datetime").timedelta(days=max_age_days)
    filtered = []
    stale_count = 0
    for item in items:
        dt = parse_pub_date(item.get("published", ""))
        if dt:
            item["date_parsed"] = dt.strftime("%Y-%m-%d")
            if dt.replace(tzinfo=None) < cutoff:
                stale_count += 1
                continue
        else:
            item["date_parsed"] = ""
        filtered.append(item)
    if stale_count:
        print(f"  [filter] Removed {stale_count} article(s) older than {max_age_days} days")
    return filtered


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
            pub = it.get("date_parsed", "")
            date_tag = f" ({pub})" if pub else ""
            lines.append(f"- [{title}]({it.get('link', '')})  _{src}{date_tag}_")
            count += 1
            if count >= 8:
                break

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# AUTO-FILL: scrape/fetch data that was previously FILL_ME
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parent.parent
MARKETS_JS = REPO_ROOT / "src" / "data" / "markets.js"


def _get(url: str) -> str | None:
    try:
        r = requests.get(url, headers={"User-Agent": BROWSER_UA}, timeout=TIMEOUT)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"  [scrape fail] {url}: {e}", file=sys.stderr)
        return None


def auto_fill_sbp_reserves() -> str:
    html = _get("https://www.sbp.org.pk/ecodata/forex.pdf")
    if not html:
        return "FILL_ME — SBP scrape failed"
    # Fallback: extract from a simpler page
    html2 = _get("https://www.sbp.org.pk/dfmd/ferm.asp")
    if html2:
        m = re.search(r"SBP[^<]*?(\d{1,2}[,.]?\d{3})", html2)
        if m:
            return m.group(1).replace(",", "")
    return "FILL_ME — SBP reserves page changed"


def auto_fill_fuel_prices() -> dict:
    """Scrape PSO for all fuel prices."""
    result = {"petrol": None, "diesel": None, "kerosene": None, "ldo": None}
    html = _get("https://www.psopk.com/")
    if not html:
        return result
    # Petrol (Euro5 Premier)
    m = re.search(r'premier5\.png.*?<p class="fptitle">Rs\.([\d,\.]+)/Ltr', html, re.DOTALL)
    if m:
        result["petrol"] = m.group(1).replace(",", "")
    # Diesel (cetane5)
    m = re.search(r'cetane5\.png.*?<p class="fptitle">Rs\.([\d,\.]+)/Ltr', html, re.DOTALL)
    if m:
        result["diesel"] = m.group(1).replace(",", "")
    # Kerosene (cetanewhite)
    m = re.search(r'cetanewhite\.png.*?<p class="fptitle">Rs\.([\d,\.]+)/Ltr', html, re.DOTALL)
    if m:
        result["kerosene"] = m.group(1).replace(",", "")
    # E10 (as LDO proxy)
    m = re.search(r'e10\.png.*?<p class="fptitle">Rs\.([\d,\.]+)/Ltr', html, re.DOTALL)
    if m and float(m.group(1).replace(",", "")) > 1:
        result["ldo"] = m.group(1).replace(",", "")
    return result


def auto_fill_spi() -> str:
    """Try to scrape latest SPI YoY from PBS."""
    html = _get("https://www.pbs.gov.pk/spi")
    if html:
        m = re.search(r"(\d{1,2}\.\d{1,2})%?\s*(?:YoY|year)", html, re.IGNORECASE)
        if m:
            return m.group(1)
    return "FILL_ME — PBS SPI scrape failed"


def auto_fill_commodities() -> dict:
    """Fetch CPO and wheat via yfinance."""
    result = {"cpo": None, "wheat": None}
    try:
        cpo = yf.Ticker("FCPO=F").history(period="5d")
        if not cpo.empty:
            result["cpo"] = round(float(cpo.iloc[-1]["Close"]), 0)
    except Exception:
        pass
    try:
        wheat = yf.Ticker("ZW=F").history(period="5d")
        if not wheat.empty:
            cents = float(wheat.iloc[-1]["Close"])
            result["wheat"] = round(cents / 100 * 36.74, 0)  # cents/bu → $/MT
    except Exception:
        pass
    return result


def auto_fill_dubai_platts() -> str:
    """Read current Dubai Platts from markets.js."""
    if MARKETS_JS.exists():
        content = MARKETS_JS.read_text()
        m = re.search(r'name:\s*"Dubai Platts",\s*value:\s*"\$?([\d,.]+)"', content)
        if m:
            return m.group(1)
    return "FILL_ME — check markets.js"


def auto_fill_edition_number() -> str:
    """Read latest edition number from editions.js and increment."""
    editions_js = REPO_ROOT / "src" / "data" / "editions.js"
    if editions_js.exists():
        content = editions_js.read_text()
        m = re.search(r"no:\s*'(\d+)'", content)
        if m:
            return f"No. {int(m.group(1)) + 1:02d}"
    return "FILL_ME"


def auto_fill_from_news(news_items: list) -> dict:
    """Use Claude Haiku to extract key data from gathered news headlines."""
    import os
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        env_path = REPO_ROOT / ".env"
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("ANTHROPIC_API_KEY="):
                    api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    break
    if not api_key:
        return {}

    headlines = "\n".join(f"- {item.get('title', '')}" for item in news_items[:60])

    try:
        resp = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": api_key,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            },
            json={
                "model": "claude-haiku-4-5-20251001",
                "max_tokens": 512,
                "system": (
                    "You are a Pakistan economic analyst. Extract data from these news headlines. "
                    "Return a JSON object with these keys (use null if not found):\n"
                    "fbr_revenue_ytd: FBR collection figure in Rs billions if mentioned\n"
                    "fbr_target: FBR target in Rs billions if mentioned\n"
                    "sbp_reserves: SBP forex reserves in $ billions if mentioned\n"
                    "tbill_12m: 12-month T-bill yield percentage if mentioned\n"
                    "spi_yoy: SPI year-on-year percentage if mentioned\n"
                    "cpi_yoy: CPI year-on-year percentage if mentioned\n"
                    "key_regulatory: major regulatory actions this week (SROs, OGRA notifications, SBP circulars, budget-related actions). One paragraph.\n"
                    "biggest_story: the single most important Pakistan story this week in one sentence\n"
                    "disruption_calendar: upcoming events in the next 2 weeks that could disrupt business — strikes, protests, court hearings, political dates, OGRA price reviews, MPC meetings, IMF reviews, tax deadlines, budget implementation dates. Bullet-point list.\n"
                    "edition_theme: one sentence capturing the dominant economic story this week — what a treasury head needs to know before Monday. Be specific, analytical, not generic.\n"
                    "editorial_notes: 2-3 bullet points of stories or angles the headlines suggest but don't state explicitly — connections, risks, second-order effects worth exploring in the edition.\n"
                    "Return JSON only, no other text."
                ),
                "messages": [{"role": "user", "content": headlines}],
            },
            timeout=20,
        )
        resp.raise_for_status()
        text = resp.json()["content"][0]["text"]
        m = re.search(r"\{.*\}", text, re.DOTALL)
        if m:
            return json.loads(m.group(0))
    except Exception as e:
        print(f"  [news extract fail] {e}", file=sys.stderr)
    return {}


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
    all_news    = filter_stale_news(rss_items + gnews_items, max_age_days=14)
    print(f"  Total: {len(all_news)} items ({len(rss_items)} RSS + {len(gnews_items)} Google News, after date filter)")

    themed: dict[str, list] = {t: [] for t in list(THEMES.keys()) + ["Unsorted"]}
    for item in all_news:
        for t in classify(item):
            themed[t].append(item)

    # 4. Auto-fill data fields
    print("\n[4/6] Auto-filling data fields...")
    fuel = auto_fill_fuel_prices()
    print(f"  Fuel: petrol={fuel.get('petrol', '?')}, diesel={fuel.get('diesel', '?')}")
    commodities = auto_fill_commodities()
    print(f"  CPO={commodities.get('cpo', '?')} MYR/MT, Wheat={commodities.get('wheat', '?')} $/MT")
    platts = auto_fill_dubai_platts()
    print(f"  Dubai Platts: ${platts}")
    ed_num = auto_fill_edition_number()
    print(f"  Edition: {ed_num}")

    # 5. Extract from news via Haiku
    print("\n[5/6] Extracting data from news (Haiku)...")
    news_ex = auto_fill_from_news(all_news)
    for k, v in news_ex.items():
        if v is not None:
            print(f"  {k}: {v}")

    # 6. Build fields
    print("\n[6/6] Building output files...")
    manual = {
        "Edition number":                  ed_num,
        "Edition date":                    now.strftime("%-d %B %Y"),
        "Edition theme / through-line":    str(news_ex.get("edition_theme") or "FILL_ME — the dominant story this week in one sentence"),
        "Dubai Platts ($/bbl)":            platts,
        "SBP forex reserves, gross ($bn)": str(news_ex.get("sbp_reserves") or "FILL_ME — check sbp.org.pk"),
        "SBP policy rate (%)":             "11.50",
        "T-bill 3M cut-off yield (%)":     "FILL_ME — check SBP auction PDF",
        "T-bill 6M cut-off yield (%)":     "FILL_ME — check SBP auction PDF",
        "T-bill 12M cut-off yield (%)":    str(news_ex.get("tbill_12m") or "FILL_ME — check SBP auction PDF"),
        "PIB 2Y cut-off yield (%)":        "N/A",
        "PIB 3Y cut-off yield (%)":        "N/A",
        "FBR revenue YTD (Rs bn)":         str(news_ex.get("fbr_revenue_ytd") or "FILL_ME — FBR press release"),
        "FBR revenue YTD target (Rs bn)":  str(news_ex.get("fbr_target") or "13,979"),
        "SPI latest YoY (%)":              str(news_ex.get("spi_yoy") or "FILL_ME — check PBS"),
        "CPI latest YoY (%)":              str(news_ex.get("cpi_yoy") or "11.7 (May; June not yet released)"),
        "Petrol (MS) price (Rs/L)":        fuel.get("petrol") or "FILL_ME — PSO scrape failed",
        "Diesel (HSD) price (Rs/L)":       fuel.get("diesel") or "FILL_ME — PSO scrape failed",
        "Kerosene price (Rs/L)":           fuel.get("kerosene") or "FILL_ME",
        "LDO price (Rs/L)":               fuel.get("ldo") or "FILL_ME",
        "Tarbela live storage (MAF)":      "FILL_ME — check pakirsa.gov.pk/DailyData.aspx",
        "Mangla live storage (MAF)":       "FILL_ME — check pakirsa.gov.pk/DailyData.aspx",
        "Total system water (MAF)":        "FILL_ME — check pakirsa.gov.pk/DailyData.aspx",
        "PMD monsoon outlook":             "FILL_ME — check weather.gov.pk",
        "CPO price (MYR/MT)":              str(int(commodities["cpo"])) if commodities.get("cpo") else "FILL_ME",
        "Wheat (international, $/MT)":     str(int(commodities["wheat"])) if commodities.get("wheat") else "FILL_ME",
        "Disruption calendar":             str(news_ex.get("disruption_calendar") or "FILL_ME — upcoming events"),
        "Key regulatory actions this week": str(news_ex.get("key_regulatory") or "FILL_ME"),
        "Biggest Pakistan story this week": str(news_ex.get("biggest_story") or "FILL_ME"),
        "Editorial notes":                 str(news_ex.get("editorial_notes") or "FILL_ME — anything the auto-fetch missed"),
    }

    # Auto-include prior edition data for dashboard "prev" column
    prior_edition = {}
    prev_files = sorted(OUTPUT_DIR.glob("weekly_data_*.json"))
    prev_files = [f for f in prev_files if f.name != f"weekly_data_{date_slug}.json"]
    if prev_files:
        try:
            prev_data = json.loads(prev_files[-1].read_text(encoding="utf-8"))
            prev_manual = prev_data.get("manual", {})
            if not any(str(v).startswith("FILL_ME") for v in prev_manual.values()):
                prior_edition = {
                    "date_slug": prev_data.get("date_slug", ""),
                    "edition":   prev_manual.get("Edition number", ""),
                    "manual":    prev_manual,
                    "markets":   {k: {"close": v.get("close")} for k, v in prev_data.get("markets", {}).items() if v},
                }
                print(f"  ✓  Prior edition data loaded from {prev_files[-1].name}")
            else:
                print(f"  ⚠  Prior edition {prev_files[-1].name} has unfilled fields — skipping")
        except Exception as e:
            print(f"  ⚠  Could not load prior edition: {e}")

    output = {
        "run_date":       run_date,
        "date_slug":      date_slug,
        "markets":        markets,
        "psx":            psx,
        "news_by_theme":  themed,
        "manual":         manual,
        "prior_edition":  prior_edition,
    }

    json_path = OUTPUT_DIR / f"weekly_data_{date_slug}.json"
    md_path   = OUTPUT_DIR / f"weekly_brief_{date_slug}.md"

    json_path.write_text(json.dumps(output, indent=2, default=str), encoding="utf-8")
    md_path.write_text(build_md(output), encoding="utf-8")

    print(f"\n  ✓  {json_path}")
    print(f"  ✓  {md_path}")
    # Count remaining FILL_ME fields
    fill_count = sum(1 for v in manual.values() if str(v).startswith("FILL_ME"))
    filled_count = len(manual) - fill_count
    print(f"\n  Auto-filled {filled_count}/{len(manual)} fields. {fill_count} remaining FILL_ME fields.")

    print(f"\n--- Next steps ---")
    if fill_count > 0:
        print(f"1. Open {md_path.name} and fill remaining {fill_count} FILL_ME fields")
        print(f"2. Run: python3 scripts/draft_edition.py {date_slug}")
    else:
        print(f"1. Review {md_path.name} for accuracy")
        print(f"2. Run: python3 scripts/draft_edition.py {date_slug}")


if __name__ == "__main__":
    main()
