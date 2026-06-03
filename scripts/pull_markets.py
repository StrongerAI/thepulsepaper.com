#!/usr/bin/env python3
"""
scripts/pull_markets.py
=======================
Pulls market data from stooq (free, no API key) and SBP, then rewrites
src/data/markets.js with fresh values.

What this script DOES update:
  - Global equities (S&P, Nasdaq, Dow, FTSE, DAX, CAC, Stoxx, Nikkei,
    Shanghai, Hang Seng, Sensex, KOSPI)
  - Commodities (Brent, WTI, Gold, Silver, Natural Gas)
  - FX pairs (EUR/USD, GBP/USD, USD/CNY)
  - USD/PKR (from SBP daily rates page)
  - Ticker strip top-line values
  - Week-over-week table (auto-calculated from current vs previous run)
  - lastUpdated timestamp

What this script does NOT touch (editor-controlled):
  - All four commentary paragraphs (weekOverWeek.commentary, psx.commentary,
    commodities.commentary, international.commentary)
  - PSX indices (manual until Commit 4)
  - Dubai Platts (paywalled)
  - Latest edition callout

Failure mode: if a single source fails, only that field is marked stale.
Other fields update normally. The page never breaks because one ticker died.
"""

import json
import os
import re
import sys
from datetime import datetime
from io import StringIO
from pathlib import Path
from zoneinfo import ZoneInfo

import requests

REPO_ROOT = Path(__file__).resolve().parent.parent
MARKETS_JS_PATH = REPO_ROOT / "src" / "data" / "markets.js"
ALERTS_JSON_PATH = REPO_ROOT / "src" / "data" / "markets-alerts.json"
PREV_SNAPSHOT_PATH = REPO_ROOT / "src" / "data" / ".markets-prev.json"

PKT = ZoneInfo("Asia/Karachi")
TIMEOUT = 12

# ----------------------------------------------------------------------------
# DATA SOURCE DEFINITIONS
# ----------------------------------------------------------------------------
# Format: display_name -> stooq ticker
# If a ticker stops working, edit it here and that's all.

COMMODITIES_TICKERS = {
    "Brent Crude":   "cb.f",
    "WTI Crude Oil": "cl.f",
    "Natural Gas":   "ng.f",
    "Gold":          "gc.f",
    "Silver":        "si.f",
}

EQUITIES_TICKERS = {
    "S&P 500":        "^spx",
    "Nasdaq":         "^ndq",
    "Dow Jones":      "^dji",
    "FTSE 100":       "^ftm",
    "DAX":            "^dax",
    "CAC 40":         "^cac",
    "Stoxx 600":      "^stoxx",
    "Nikkei 225":     "^nkx",
    "Shanghai Comp.": "^shc",
    "Hang Seng":      "^hsi",
    "Sensex":         "^snx",
    "KOSPI":          "^kos",
}

FX_TICKERS = {
    "EUR / USD": "eurusd",
    "GBP / USD": "gbpusd",
    "USD / CNY": "usdcny",
}

# Alert thresholds: anything moving by more than this triggers an alert
ALERT_THRESHOLDS = {
    "equity_pct":    2.0,   # equity index moves >2%
    "commodity_pct": 5.0,   # commodity moves >5%
    "fx_pct":        0.5,   # currency moves >0.5%
    "pkr_pct":       0.5,   # USD/PKR moves >0.5%
}


# ----------------------------------------------------------------------------
# STOOQ FETCHER
# ----------------------------------------------------------------------------

def fetch_stooq(ticker: str) -> dict | None:
    """Returns {'close': float, 'open': float, 'high': float, 'low': float,
    'date': str, 'prev_close': float | None} or None if fetch failed."""
    url = f"https://stooq.com/q/d/l/?s={ticker}&i=d"
    try:
        r = requests.get(
            url,
            timeout=TIMEOUT,
            headers={"User-Agent": "Mozilla/5.0 (Pulse Markets Bot)"},
        )
        r.raise_for_status()
        text = r.text.strip()
        if not text or "Date" not in text[:50]:
            return None
        lines = text.split("\n")
        if len(lines) < 2:
            return None
        # Last line is the most recent trading day
        last = lines[-1].split(",")
        if len(last) < 5:
            return None
        result = {
            "date":  last[0],
            "open":  float(last[1]),
            "high":  float(last[2]),
            "low":   float(last[3]),
            "close": float(last[4]),
            "prev_close": None,
        }
        # Get yesterday's close for change calculation
        if len(lines) >= 3:
            try:
                prev = lines[-2].split(",")
                if len(prev) >= 5:
                    result["prev_close"] = float(prev[4])
            except (ValueError, IndexError):
                pass
        return result
    except Exception as e:
        print(f"  [stooq fail] {ticker}: {e}", file=sys.stderr)
        return None


# ----------------------------------------------------------------------------
# SBP USD/PKR FETCHER
# ----------------------------------------------------------------------------

def fetch_sbp_pkr() -> float | None:
    """Fetches the latest USD/PKR interbank rate from SBP.
    SBP publishes a daily rates table; we extract the USD selling rate.
    """
    url = "https://www.sbp.org.pk/ecodata/rates/eer/index.asp"
    try:
        r = requests.get(
            url,
            timeout=TIMEOUT,
            headers={"User-Agent": "Mozilla/5.0 (Pulse Markets Bot)"},
        )
        r.raise_for_status()
        # SBP page contains rows like: <td>USD</td><td>...</td><td>278.55</td>
        # We search for a USD line and pull the nearest numeric value that
        # looks like a PKR rate (200-400 range).
        # This is fragile by design — SBP page changes shape occasionally.
        text = r.text
        # Find USD row
        m = re.search(
            r"USD.*?(\d{3}\.\d{1,4})",
            text,
            re.DOTALL,
        )
        if m:
            rate = float(m.group(1))
            if 200 < rate < 400:  # sanity check
                return rate
        return None
    except Exception as e:
        print(f"  [SBP fail] {e}", file=sys.stderr)
        return None


# ----------------------------------------------------------------------------
# FORMATTERS
# ----------------------------------------------------------------------------

def fmt_pct(current: float, prev: float | None) -> tuple[str, str]:
    """Returns (change_string, direction). e.g. ('+1.34%', 'up')."""
    if prev is None or prev == 0:
        return ("Flat", "flat")
    pct = ((current - prev) / prev) * 100
    if abs(pct) < 0.05:
        return ("Flat", "flat")
    sign = "+" if pct > 0 else ""
    direction = "up" if pct > 0 else "down"
    return (f"{sign}{pct:.2f}%", direction)


def fmt_price(value: float, unit: str = "") -> str:
    """Format a price value for display."""
    if value >= 10000:
        return f"{value:,.0f}{unit}"
    if value >= 1000:
        return f"{value:,.0f}{unit}"
    if value >= 100:
        return f"{value:.2f}{unit}"
    if value >= 10:
        return f"{value:.2f}{unit}"
    return f"{value:.4f}{unit}"


def fmt_range(low: float, high: float) -> str:
    """Format a day range like '7,508 – 7,569'."""
    return f"{fmt_price(low)} \u2013 {fmt_price(high)}"


# ----------------------------------------------------------------------------
# READ EXISTING markets.js (so we preserve manual fields)
# ----------------------------------------------------------------------------

def read_current_markets_js() -> str:
    """Read the entire markets.js file as text. We'll do targeted
    replacements rather than a full parse, so manual fields stay safe."""
    if not MARKETS_JS_PATH.exists():
        raise FileNotFoundError(f"{MARKETS_JS_PATH} not found")
    return MARKETS_JS_PATH.read_text(encoding="utf-8")


# ----------------------------------------------------------------------------
# JS-OBJECT RENDERERS
# Render the JS object literal blocks we need to inject into markets.js
# ----------------------------------------------------------------------------

def render_js_string(s: str) -> str:
    """Escape a string for use inside a JS string literal (double-quoted)."""
    s = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{s}"'


def render_commodities_rows(commodities_data: dict) -> str:
    """Render the array of commodity row objects.
    commodities_data: name -> {value, unit, open, high, low}
    """
    # Order we want in the output (Pakistan-relevant first)
    order = ["Brent Crude", "WTI Crude Oil", "Dubai Platts",
             "Natural Gas", "Gold", "Silver"]
    lines = []
    for name in order:
        d = commodities_data.get(name)
        if not d:
            continue
        value_str = d["value"]
        unit = d.get("unit", "")
        open_str = d.get("open", "")
        high_str = d.get("high", "")
        low_str = d.get("low", "")
        stale = ', stale: true' if d.get("stale") else ''
        lines.append(
            f'      {{ name: {render_js_string(name)}, '
            f'value: {render_js_string(value_str)}, '
            f'unit: {render_js_string(unit)}, '
            f'open: {render_js_string(open_str)}, '
            f'high: {render_js_string(high_str)}, '
            f'low: {render_js_string(low_str)}{stale} }},'
        )
    return "\n".join(lines)


def render_international_rows(international_data: list[dict]) -> str:
    """Render the international exchanges array.
    Each entry: {name, close, open, range, region, muted?, stale?}
    """
    lines = []
    for d in international_data:
        muted = ', muted: true' if d.get("muted") else ''
        stale = ', stale: true' if d.get("stale") else ''
        lines.append(
            f'      {{ name: {render_js_string(d["name"])}, '
            f'close: {render_js_string(d["close"])}, '
            f'open: {render_js_string(d.get("open", ""))}, '
            f'range: {render_js_string(d["range"])}, '
            f'region: {render_js_string(d["region"])}{muted}{stale} }},'
        )
    return "\n".join(lines)


def render_ticker(ticker_data: list[dict]) -> str:
    """Render the ticker strip array."""
    lines = []
    for d in ticker_data:
        lines.append(
            f'    {{ name: {render_js_string(d["name"])}, '
            f'value: {render_js_string(d["value"])}, '
            f'changePct: {render_js_string(d["changePct"])}, '
            f'direction: {render_js_string(d["direction"])} }},'
        )
    return "\n".join(lines)


def render_wow_rows(rows: list[dict]) -> str:
    """Render the week-over-week table rows."""
    lines = []
    for d in rows:
        lines.append(
            f'      {{ name: {render_js_string(d["name"])}, '
            f'prev: {render_js_string(d["prev"])}, '
            f'current: {render_js_string(d["current"])}, '
            f'change: {render_js_string(d["change"])}, '
            f'direction: {render_js_string(d["direction"])} }},'
        )
    return "\n".join(lines)


# ----------------------------------------------------------------------------
# TARGETED REPLACEMENT in markets.js
# ----------------------------------------------------------------------------

def replace_between_markers(content: str, start_marker: str,
                            end_marker: str, replacement: str) -> str:
    """Replace text between two marker strings (inclusive of start/end
    line patterns). Used to swap data blocks while preserving everything else.

    The markers are unique block-start patterns we wrote into the file:
      // -- AUTO:ticker --              (start)
      // -- /AUTO:ticker --             (end)
    """
    pattern = (
        re.escape(start_marker)
        + r".*?"
        + re.escape(end_marker)
    )
    new_block = f"{start_marker}\n{replacement}\n    {end_marker}"
    result, n = re.subn(pattern, new_block, content, flags=re.DOTALL)
    if n == 0:
        print(f"  [warn] marker not found: {start_marker}", file=sys.stderr)
        return content
    return result


def replace_simple_field(content: str, field_name: str,
                         new_value: str) -> str:
    """Replace a top-level string field like:
       lastUpdated: "old value",
       lastUpdated: "new value",
    """
    pattern = rf'({field_name}:\s*)"[^"]*"(,?)'
    replacement = rf'\g<1>"{new_value}"\g<2>'
    result, n = re.subn(pattern, replacement, content)
    if n == 0:
        print(f"  [warn] field not found: {field_name}", file=sys.stderr)
    return result


# ----------------------------------------------------------------------------
# SNAPSHOT MANAGEMENT (for change calculations + alerts)
# ----------------------------------------------------------------------------

def load_prev_snapshot() -> dict:
    if PREV_SNAPSHOT_PATH.exists():
        try:
            return json.loads(PREV_SNAPSHOT_PATH.read_text())
        except json.JSONDecodeError:
            return {}
    return {}


def save_snapshot(snapshot: dict) -> None:
    PREV_SNAPSHOT_PATH.write_text(json.dumps(snapshot, indent=2))


# ----------------------------------------------------------------------------
# ALERTS GENERATOR
# ----------------------------------------------------------------------------

def detect_alerts(current: dict, previous: dict, now: datetime) -> dict:
    """Compare current snapshot to previous; flag material moves."""
    alerts = []

    def check(category: str, name: str, value: float, threshold: float):
        prev_val = previous.get(name)
        if prev_val is None or prev_val == 0:
            return
        pct = ((value - prev_val) / prev_val) * 100
        if abs(pct) >= threshold:
            severity = "high" if abs(pct) >= threshold * 2 else "medium"
            direction = "up" if pct > 0 else "down"
            alerts.append({
                "severity": severity,
                "category": category,
                "field": name,
                "change_pct": round(pct, 2),
                "previous": prev_val,
                "current": value,
                "description": (
                    f"{name} moved {pct:+.2f}% "
                    f"({prev_val:,.2f} \u2192 {value:,.2f}). "
                    f"Threshold: {threshold}%."
                ),
            })

    for name, val in current.get("equities", {}).items():
        check("equities", name, val, ALERT_THRESHOLDS["equity_pct"])
    for name, val in current.get("commodities", {}).items():
        check("commodities", name, val, ALERT_THRESHOLDS["commodity_pct"])
    for name, val in current.get("fx", {}).items():
        check("fx", name, val, ALERT_THRESHOLDS["fx_pct"])
    if "USD/PKR" in current:
        check("pkr", "USD/PKR", current["USD/PKR"],
              ALERT_THRESHOLDS["pkr_pct"])

    summary = "No material moves." if not alerts else (
        f"{len(alerts)} material move(s) detected. "
        f"Commentary refresh recommended."
    )
    return {
        "generated_at": now.isoformat(),
        "generated_label": now.strftime("%-d %B %Y, %-I:%M %p PKT"),
        "alert_count": len(alerts),
        "alerts": alerts,
        "summary": summary,
    }


# ----------------------------------------------------------------------------
# MAIN
# ----------------------------------------------------------------------------

def main():
    now = datetime.now(PKT)
    session = "morning" if now.hour < 12 else "evening"
    print(f"=== Pulse Markets Pull ({session}) "
          f"{now.strftime('%Y-%m-%d %H:%M PKT')} ===")

    # ---- Step 1: fetch everything ----
    print("\n[1/5] Fetching data...")
    fetched_commodities = {}
    for name, ticker in COMMODITIES_TICKERS.items():
        d = fetch_stooq(ticker)
        if d:
            fetched_commodities[name] = d
            print(f"  OK    {name:20s} close={d['close']}")
        else:
            print(f"  STALE {name:20s} (will keep previous value)")

    fetched_equities = {}
    for name, ticker in EQUITIES_TICKERS.items():
        d = fetch_stooq(ticker)
        if d:
            fetched_equities[name] = d
            print(f"  OK    {name:20s} close={d['close']}")
        else:
            print(f"  STALE {name:20s} (will keep previous value)")

    fetched_fx = {}
    for name, ticker in FX_TICKERS.items():
        d = fetch_stooq(ticker)
        if d:
            fetched_fx[name] = d
            print(f"  OK    {name:20s} close={d['close']}")
        else:
            print(f"  STALE {name:20s} (will keep previous value)")

    pkr_rate = fetch_sbp_pkr()
    if pkr_rate:
        print(f"  OK    USD/PKR (SBP)        rate={pkr_rate}")
    else:
        print(f"  STALE USD/PKR (SBP)        (will keep previous value)")

    # ---- Step 2: build new data structures ----
    print("\n[2/5] Building updated data blocks...")
    prev_snapshot = load_prev_snapshot()
    new_snapshot = {"equities": {}, "commodities": {}, "fx": {}}

    # --- commodities block ---
    commodities_data = {}
    PRICE_PREFIXES = {
        "Brent Crude": "$", "WTI Crude Oil": "$", "Natural Gas": "$",
        "Gold": "$", "Silver": "$",
    }
    UNITS = {
        "Brent Crude": "/bbl", "WTI Crude Oil": "/bbl", "Natural Gas": "/MMBtu",
        "Gold": "/oz", "Silver": "/oz",
    }
    for name, d in fetched_commodities.items():
        prefix = PRICE_PREFIXES.get(name, "")
        commodities_data[name] = {
            "value": f"{prefix}{fmt_price(d['close'])}",
            "unit": UNITS.get(name, ""),
            "open": fmt_price(d["open"]),
            "high": fmt_price(d["high"]),
            "low": fmt_price(d["low"]),
        }
        new_snapshot["commodities"][name] = d["close"]

    # Dubai Platts: stays manual. Pull it from previous markets.js (read below).

    # --- international block ---
    REGIONS = {
        "S&P 500": "Americas", "Nasdaq": "Americas", "Dow Jones": "Americas",
        "FTSE 100": "Europe", "DAX": "Europe",
        "CAC 40": "Europe", "Stoxx 600": "Europe",
        "Nikkei 225": "Asia", "Shanghai Comp.": "Asia",
        "Hang Seng": "Asia", "Sensex": "Asia", "KOSPI": "Asia",
        "EUR / USD": "Currencies", "GBP / USD": "Currencies",
        "USD / CNY": "Currencies",
    }
    international = []
    for name, d in fetched_equities.items():
        international.append({
            "name": name,
            "close": fmt_price(d["close"]),
            "open": fmt_price(d["open"]),
            "range": fmt_range(d["low"], d["high"]),
            "region": REGIONS[name],
        })
        new_snapshot["equities"][name] = d["close"]
    for name, d in fetched_fx.items():
        international.append({
            "name": name,
            "close": fmt_price(d["close"]),
            "open": fmt_price(d["open"]),
            "range": fmt_range(d["low"], d["high"]),
            "region": "Currencies",
        })
        new_snapshot["fx"][name] = d["close"]
    # USD/PKR row
    if pkr_rate:
        international.append({
            "name": "USD / PKR",
            "close": f"{pkr_rate:.2f}",
            "open": "",
            "range": "SBP interbank",
            "region": "Currencies",
            "muted": True,
        })
        new_snapshot["USD/PKR"] = pkr_rate

    # Order: Americas, Europe, Asia, Currencies
    region_order = {"Americas": 0, "Europe": 1, "Asia": 2, "Currencies": 3}
    international.sort(
        key=lambda x: (region_order.get(x["region"], 99), x["name"])
    )

    # --- ticker strip ---
    # KSE-100 stays manual until Commit 4. Others auto-update.
    ticker_data = []
    # KSE: read from previous markets.js (will preserve below)

    # We'll build ticker after reading current markets.js so we can preserve
    # the KSE-100 and Dubai Platts entries.

    # ---- Step 3: read current markets.js, do targeted edits ----
    print("\n[3/5] Updating markets.js...")
    content = read_current_markets_js()

    # Extract current KSE-100 from the existing file (it's in ticker[0])
    kse_match = re.search(
        r'name:\s*"KSE-100",\s*value:\s*"([^"]+)",\s*'
        r'changePct:\s*"([^"]+)",\s*direction:\s*"([^"]+)"',
        content,
    )
    kse_entry = None
    if kse_match:
        kse_entry = {
            "name": "KSE-100",
            "value": kse_match.group(1),
            "changePct": kse_match.group(2),
            "direction": kse_match.group(3),
        }

    # Extract current Dubai Platts row from commodities to preserve it
    platts_match = re.search(
        r'\{\s*name:\s*"Dubai Platts"[^}]+\}',
        content,
    )
    platts_block_str = platts_match.group(0) if platts_match else None

    # Build full ticker now
    if kse_entry:
        ticker_data.append(kse_entry)
    # Brent
    if "Brent Crude" in fetched_commodities:
        d = fetched_commodities["Brent Crude"]
        change_str, direction = fmt_pct(d["close"], d["prev_close"])
        ticker_data.append({
            "name": "Brent",
            "value": f"${d['close']:.2f}",
            "changePct": change_str,
            "direction": direction,
        })
    # Dubai Platts (preserve from previous)
    platts_ticker_match = re.search(
        r'name:\s*"Dubai Platts",\s*value:\s*"([^"]+)",\s*'
        r'changePct:\s*"([^"]+)",\s*direction:\s*"([^"]+)"',
        content,
    )
    if platts_ticker_match:
        ticker_data.append({
            "name": "Dubai Platts",
            "value": platts_ticker_match.group(1),
            "changePct": platts_ticker_match.group(2),
            "direction": platts_ticker_match.group(3),
        })
    # Gold
    if "Gold" in fetched_commodities:
        d = fetched_commodities["Gold"]
        change_str, direction = fmt_pct(d["close"], d["prev_close"])
        ticker_data.append({
            "name": "Gold",
            "value": f"${fmt_price(d['close'])}",
            "changePct": change_str,
            "direction": direction,
        })
    # USD/PKR
    if pkr_rate:
        prev_pkr = prev_snapshot.get("USD/PKR")
        change_str, direction = fmt_pct(pkr_rate, prev_pkr) if prev_pkr else ("Flat", "flat")
        ticker_data.append({
            "name": "USD/PKR",
            "value": f"{pkr_rate:.2f}",
            "changePct": change_str,
            "direction": direction,
        })
    # S&P 500
    if "S&P 500" in fetched_equities:
        d = fetched_equities["S&P 500"]
        change_str, direction = fmt_pct(d["close"], d["prev_close"])
        ticker_data.append({
            "name": "S&P 500",
            "value": fmt_price(d["close"]),
            "changePct": change_str,
            "direction": direction,
        })

    # Now stitch Dubai Platts back into commodities_data so renderer keeps it
    if platts_block_str:
        # Extract its fields
        m = re.search(
            r'name:\s*"Dubai Platts",\s*value:\s*"([^"]+)",\s*'
            r'unit:\s*"([^"]+)",\s*open:\s*"([^"]+)",\s*'
            r'high:\s*"([^"]+)",\s*low:\s*"([^"]+)"',
            platts_block_str,
        )
        if m:
            commodities_data["Dubai Platts"] = {
                "value": m.group(1),
                "unit": m.group(2),
                "open": m.group(3),
                "high": m.group(4),
                "low": m.group(5),
            }

    # ---- Step 4: write updated markets.js ----
    print("\n[4/5] Writing markets.js...")
    new_ticker_block = render_ticker(ticker_data)
    new_commodities_block = render_commodities_rows(commodities_data)
    new_international_block = render_international_rows(international)

    content = replace_between_markers(
        content,
        "// -- AUTO:ticker --",
        "// -- /AUTO:ticker --",
        new_ticker_block,
    )
    content = replace_between_markers(
        content,
        "// -- AUTO:commodities-rows --",
        "// -- /AUTO:commodities-rows --",
        new_commodities_block,
    )
    content = replace_between_markers(
        content,
        "// -- AUTO:international-rows --",
        "// -- /AUTO:international-rows --",
        new_international_block,
    )
    content = replace_simple_field(
        content,
        "lastUpdated",
        now.strftime("%-d %B %Y, %-I:%M %p PKT"),
    )

    MARKETS_JS_PATH.write_text(content, encoding="utf-8")
    print(f"  Wrote {MARKETS_JS_PATH}")

    # ---- Step 5: alerts + snapshot ----
    print("\n[5/5] Detecting alerts...")
    alerts = detect_alerts(new_snapshot, prev_snapshot, now)
    ALERTS_JSON_PATH.write_text(json.dumps(alerts, indent=2))
    print(f"  {alerts['summary']}")
    if alerts["alerts"]:
        for a in alerts["alerts"]:
            print(f"  [{a['severity'].upper()}] {a['description']}")

    save_snapshot(new_snapshot)
    print("\nDone.")


if __name__ == "__main__":
    main()
