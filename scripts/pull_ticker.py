#!/usr/bin/env python3
"""
scripts/pull_ticker.py
======================
Fetches Pakistan business/economic headlines from RSS feeds, classifies
them via Claude Haiku, deduplicates, and writes a JSON feed for the
/ticker page.

Runs on the same cron schedule as pull_markets.py. Zero manual input.
"""

import json
import os
import re
import sys
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

import feedparser
import requests

REPO_ROOT = Path(__file__).resolve().parent.parent
TICKER_JSON = REPO_ROOT / "src" / "data" / "ticker-feed.json"
PKT = ZoneInfo("Asia/Karachi")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
MAX_ITEMS = 30
MAX_AGE_HOURS = 72

RSS_FEEDS = {
    # Pakistan
    "Dawn": "https://www.dawn.com/feeds/business",
    "Business Recorder": "https://www.brecorder.com/feeds/latest-news",
    "Express Tribune": "https://tribune.com.pk/feed/business",
    "The News": "https://www.thenews.com.pk/rss/1/3",
    # International
    "BBC": "https://feeds.bbci.co.uk/news/business/rss.xml",
    "Bloomberg": "https://feeds.bloomberg.com/markets/news.rss",
    "WSJ": "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
}


def fetch_feed(name: str, url: str) -> list[dict]:
    """Fetch and parse an RSS feed. Returns list of {title, link, source, published}."""
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=12)
        r.raise_for_status()
        d = feedparser.parse(r.content)
        items = []
        for e in d.entries[:30]:
            pub = e.get("published", "")
            try:
                from email.utils import parsedate_to_datetime
                dt = parsedate_to_datetime(pub).astimezone(PKT)
            except Exception:
                dt = datetime.now(PKT)
            items.append({
                "title": e.get("title", "").strip(),
                "link": e.get("link", ""),
                "source": name,
                "published": dt.isoformat(),
                "dt": dt,
            })
        return items
    except Exception as e:
        print(f"  [feed fail] {name}: {e}", file=sys.stderr)
        return []


def classify_headlines(items: list[dict]) -> list[dict]:
    """Use Claude Haiku to classify headlines as Pakistan macro/business relevant."""
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        env_path = REPO_ROOT / ".env"
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("ANTHROPIC_API_KEY="):
                    api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    break
    if not api_key:
        print("  [classify] No API key — falling back to keyword filter", file=sys.stderr)
        return keyword_filter(items)

    headlines = "\n".join(f"{i}. {item['title']}" for i, item in enumerate(items))

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
                    "You classify news headlines for a Pakistan economic intelligence product. "
                    "Return ONLY the index numbers of headlines that match EITHER:\n"
                    "A) Pakistan economy, business, markets, fiscal/monetary policy, trade, "
                    "energy, banking, corporate earnings, or agriculture.\n"
                    "B) International macro that directly affects Pakistan: US Fed/CPI/yields, "
                    "OPEC/oil supply, IMF/World Bank on emerging markets, China trade data, "
                    "Gulf economic developments, global commodity price moves (oil, gold, gas), "
                    "USD strength, or central bank decisions by major economies.\n"
                    "EXCLUDE: sports, entertainment, politics without economic angle, crime, "
                    "weather (unless crop/flood impact), US domestic policy unrelated to "
                    "markets, tech company news, European politics, crypto, "
                    "India-specific domestic stories (Indian rupee, Indian stocks, Indian bonds, "
                    "Indian government policy) UNLESS they directly mention Pakistan or affect "
                    "Pakistan's trade/economy. Amazon/Apple/tech investment in India is NOT relevant. "
                    "Spain/Brazil/South Africa domestic economy is NOT relevant.\n"
                    "Be strict. When in doubt, exclude.\n"
                    "Return comma-separated numbers only, nothing else. Example: 0,2,5,7"
                ),
                "messages": [{"role": "user", "content": headlines}],
            },
            timeout=15,
        )
        resp.raise_for_status()
        text = resp.json()["content"][0]["text"].strip()
        indices = set()
        for part in text.split(","):
            part = part.strip()
            if part.isdigit():
                indices.add(int(part))
        result = [item for i, item in enumerate(items) if i in indices]
        print(f"  [classify] Haiku kept {len(result)}/{len(items)} headlines")
        return result
    except Exception as e:
        print(f"  [classify fail] {e} — falling back to keyword filter", file=sys.stderr)
        return keyword_filter(items)


def keyword_filter(items: list[dict]) -> list[dict]:
    """Fallback: keyword-based filter for Pakistan business/economic headlines."""
    keywords = re.compile(
        r"(?i)\b(SBP|PKR|rupee|KSE|PSX|budget|inflation|CPI|SPI|FBR|GDP|IMF|"
        r"trade|export|import|remittance|reserves|deficit|surplus|petrol|diesel|"
        r"OGRA|tariff|tax|revenue|fiscal|monetary|rate cut|rate hike|MPC|"
        r"billion|trillion|cement|textile|bank|SECP|IPO|LSM|current account|"
        r"oil|gas|power|electricity|WAPDA|NEPRA|CPEC|debt|bond|T-bill|"
        r"wheat|cotton|sugar|rice|CPO|gold|forex|interbank|stock|market|"
        r"Fed|ECB|OPEC|Brent|crude|treasury|yield|dollar|euro|sterling|"
        r"emerging market|World Bank|commodit|interest rate|central bank)\b"
    )
    result = [item for item in items if keywords.search(item["title"])]
    print(f"  [keyword] kept {len(result)}/{len(items)} headlines")
    return result


def deduplicate(items: list[dict]) -> list[dict]:
    """Remove near-duplicate headlines (same story from multiple outlets)."""
    seen_tokens = []
    result = []
    for item in items:
        tokens = set(re.findall(r'\w{4,}', item["title"].lower()))
        is_dup = False
        for prev in seen_tokens:
            overlap = len(tokens & prev) / max(len(tokens | prev), 1)
            if overlap > 0.5:
                is_dup = True
                break
        if not is_dup:
            seen_tokens.append(tokens)
            result.append(item)
    return result


def main():
    now = datetime.now(PKT)
    print(f"=== Pulse Ticker Pull {now.strftime('%Y-%m-%d %H:%M PKT')} ===")

    # Load existing feed
    existing = []
    if TICKER_JSON.exists():
        try:
            existing = json.loads(TICKER_JSON.read_text())
        except Exception:
            pass

    # Fetch all feeds
    print("\n[1/4] Fetching RSS feeds...")
    all_items = []
    for name, url in RSS_FEEDS.items():
        items = fetch_feed(name, url)
        print(f"  {name}: {len(items)} items")
        all_items.extend(items)

    if not all_items:
        print("No items fetched. Keeping existing feed.")
        return

    # Filter by age
    cutoff = now - timedelta(hours=MAX_AGE_HOURS)
    all_items = [i for i in all_items if i["dt"] > cutoff]
    print(f"\n[2/4] {len(all_items)} items within {MAX_AGE_HOURS}h window")

    # Sort by date (newest first)
    all_items.sort(key=lambda x: x["dt"], reverse=True)

    # Classify
    print("\n[3/4] Classifying headlines...")
    relevant = classify_headlines(all_items)

    # Deduplicate
    print(f"\n[4/4] Deduplicating...")
    unique = deduplicate(relevant)
    print(f"  {len(unique)} unique headlines")

    # Trim to max
    unique = unique[:MAX_ITEMS]

    # Build output (drop dt, keep serializable fields)
    feed = []
    for item in unique:
        feed.append({
            "title": item["title"],
            "link": item["link"],
            "source": item["source"],
            "published": item["published"],
        })

    # Merge with existing: new items first, then existing (deduped by link)
    seen_links = {item["link"] for item in feed}
    for item in existing:
        if item["link"] not in seen_links and len(feed) < MAX_ITEMS:
            feed.append(item)
            seen_links.add(item["link"])

    TICKER_JSON.write_text(json.dumps(feed, indent=2, ensure_ascii=False))
    print(f"\nWrote {len(feed)} items to {TICKER_JSON}")


if __name__ == "__main__":
    main()
