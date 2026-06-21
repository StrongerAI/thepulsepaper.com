#!/usr/bin/env python3
"""
scripts/pull_markets.py
=======================
Pulls market data from yfinance (free, no API key) and SBP, then rewrites
src/data/markets.js with fresh values.

What this script DOES update:
  - Global equities (S&P, Nasdaq, Dow, FTSE, DAX, CAC, Stoxx, Nikkei,
    Shanghai, Hang Seng, Sensex, KOSPI)
  - Commodities (Brent, WTI, Gold, Silver, Natural Gas)
  - FX pairs (EUR/USD, GBP/USD, USD/CNY)
  - USD/PKR (from SBP daily rates page)
  - Ticker strip top-line values
  - Week-over-week table rows (auto-calculated from weekly OHLC; manual rows
    KSE-100, Dubai Platts, Petrol, SPI are preserved from the existing file)
  - lastUpdated timestamp

What this script does NOT touch (editor-controlled):
  - All four commentary paragraphs (weekOverWeek.commentary, psx.commentary,
    commodities.commentary, international.commentary)
  - PSX indices (no reliable free feed)
  - Dubai Platts (paywalled)
  - KSE-100, Petrol (MS), SPI wow rows (no free yfinance source)
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
import yfinance as yf

REPO_ROOT = Path(__file__).resolve().parent.parent
MARKETS_JS_PATH = REPO_ROOT / "src" / "data" / "markets.js"
ALERTS_JSON_PATH = REPO_ROOT / "src" / "data" / "markets-alerts.json"
PREV_SNAPSHOT_PATH = REPO_ROOT / "src" / "data" / ".markets-prev.json"
WEEKLY_KSE_PATH  = REPO_ROOT / "src" / "data" / ".markets-weekly-kse.json"
PETROL_PATH      = REPO_ROOT / "src" / "data" / ".markets-petrol.json"
CHART_HISTORY_PATH = REPO_ROOT / "src" / "data" / ".markets-chart-history.json"

PKT = ZoneInfo("Asia/Karachi")
TIMEOUT = 12

# ----------------------------------------------------------------------------
# DATA SOURCE DEFINITIONS
# ----------------------------------------------------------------------------
# Format: display_name -> yfinance ticker
# If a ticker stops working, edit it here and that's all.

COMMODITIES_TICKERS = {
    "Brent Crude":   "BZ=F",
    "WTI Crude Oil": "CL=F",
    "Natural Gas":   "NG=F",
    "Gold":          "GC=F",
    "Silver":        "SI=F",
}

EQUITIES_TICKERS = {
    "S&P 500":        "^GSPC",
    "Nasdaq":         "^IXIC",
    "Dow Jones":      "^DJI",
    "FTSE 100":       "^FTSE",
    "DAX":            "^GDAXI",
    "CAC 40":         "^FCHI",
    "Stoxx 600":      "^STOXX",
    "Nikkei 225":     "^N225",
    "Shanghai Comp.": "000001.SS",
    "Hang Seng":      "^HSI",
    "Sensex":         "^BSESN",
    "KOSPI":          "^KS11",
}

FX_TICKERS = {
    "EUR / USD": "EURUSD=X",
    "GBP / USD": "GBPUSD=X",
    "USD / CNY": "CNY=X",
}

# Week-over-week table: instruments with yfinance weekly data
WOW_TICKERS = {
    "Brent crude":  "BZ=F",
    "WTI crude":    "CL=F",
    "Gold":         "GC=F",
    "Silver":       "SI=F",
    "Natural Gas":  "NG=F",
    "USD / PKR":    "PKR=X",
    "EUR / USD":    "EURUSD=X",
    "S&P 500":      "^GSPC",
}

# These rows have no automatable source — preserved from the existing file
MANUAL_WOW_NAMES = {"KSE-100", "Dubai Platts", "SPI (YoY)"}

# Display order in the table
WOW_ROW_ORDER = [
    "KSE-100", "Brent crude", "WTI crude", "Dubai Platts",
    "Gold", "Silver", "Natural Gas", "USD / PKR", "EUR / USD",
    "S&P 500", "Petrol (MS)", "SPI (YoY)",
]

# PSX scraper: ticker code -> display name, grouped for page layout
PSX_HEADLINE = [
    ("KSE100",  "KSE-100"),
    ("KSE30",   "KSE-30"),
    ("KMI30",   "KMI-30"),
    ("ALLSHR",  "All Share"),
]
PSX_SECTOR = [
    ("BKTI",    "BKTI (Banks)"),
    ("OGTI",    "OGTI (Oil & Gas)"),
    ("ACI",     "ACI (Consumer)"),
    ("JSGBKTI", "JSGBKTI"),
]
PSX_THEMATIC = [
    ("KMIALLSHR", "KMI All Share"),
    ("PSXDIV20",  "PSX Div 20"),
    ("MZNPI",     "Meezan Pak (MZNPI)"),
    ("MII30",     "MII-30 (Islamic)"),
    ("NITPGI",    "NIT Gateway"),
    ("NBPPGI",    "NBP Growth"),
    ("JSMFI",     "JS Momentum"),
]

# Alert thresholds: anything moving by more than this triggers an alert
ALERT_THRESHOLDS = {
    "equity_pct":    2.0,   # equity index moves >2%
    "commodity_pct": 5.0,   # commodity moves >5%
    "fx_pct":        0.5,   # currency moves >0.5%
    "pkr_pct":       0.5,   # USD/PKR moves >0.5%
}


# ----------------------------------------------------------------------------
# YFINANCE FETCHER
# ----------------------------------------------------------------------------

def fetch_yfinance(ticker: str) -> dict | None:
    """Returns {'close': float, 'open': float, 'high': float, 'low': float,
    'date': str, 'prev_close': float | None} or None if fetch failed.
    Uses the last two valid (non-NaN) trading days so holidays are handled."""
    try:
        hist = yf.Ticker(ticker).history(period="10d")
        hist = hist.dropna(subset=["Close"])
        if hist.empty:
            return None
        last = hist.iloc[-1]
        result = {
            "date":       str(last.name.date()),
            "open":       float(last["Open"]),
            "high":       float(last["High"]),
            "low":        float(last["Low"]),
            "close":      float(last["Close"]),
            "prev_close": float(hist.iloc[-2]["Close"]) if len(hist) >= 2 else None,
        }
        return result
    except Exception as e:
        print(f"  [yfinance fail] {ticker}: {e}", file=sys.stderr)
        return None


# ----------------------------------------------------------------------------
# SBP USD/PKR FETCHER
# ----------------------------------------------------------------------------

def fetch_sbp_pkr() -> float | None:
    """Fetches USD/PKR interbank rate. Tries SBP first (official), falls
    back to yfinance PKR=X if SBP page is unavailable."""
    url = "https://www.sbp.org.pk/ecodata/rates/eer/index.asp"
    try:
        r = requests.get(
            url,
            timeout=TIMEOUT,
            headers={"User-Agent": "Mozilla/5.0 (Pulse Markets Bot)"},
        )
        r.raise_for_status()
        m = re.search(r"USD.*?(\d{3}\.\d{1,4})", r.text, re.DOTALL)
        if m:
            rate = float(m.group(1))
            if 200 < rate < 400:
                return rate
    except Exception as e:
        print(f"  [SBP fail] {e} — trying yfinance fallback", file=sys.stderr)

    # Fallback: yfinance PKR=X (Yahoo Finance interbank rate)
    try:
        d = fetch_yfinance("PKR=X")
        if d and 200 < d["close"] < 400:
            print("  [PKR] using yfinance fallback", file=sys.stderr)
            return d["close"]
    except Exception as e:
        print(f"  [PKR yfinance fail] {e}", file=sys.stderr)
    return None


# ----------------------------------------------------------------------------
# WEEKLY OHLC FETCHER (for week-over-week table)
# ----------------------------------------------------------------------------

def fetch_weekly_prev(ticker: str) -> dict | None:
    """Return {prev, current} weekly closing prices via yfinance weekly OHLC.
    period='1mo' yields 4-5 weekly candles; we take the last two."""
    try:
        hist = yf.Ticker(ticker).history(period="1mo", interval="1wk")
        hist = hist.dropna(subset=["Close"])
        if len(hist) < 2:
            return None
        return {
            "prev":    float(hist.iloc[-2]["Close"]),
            "current": float(hist.iloc[-1]["Close"]),
        }
    except Exception as e:
        print(f"  [weekly fail] {ticker}: {e}", file=sys.stderr)
        return None


def fmt_wow_price(name: str, value: float) -> str:
    """Format a closing price for the week-over-week table."""
    if name in ("EUR / USD", "GBP / USD"):
        return f"{value:.4f}"
    if name == "USD / PKR":
        return f"{value:.2f}"
    # Equity indices: no currency prefix
    if name in ("S&P 500", "KSE-100"):
        return f"{value:,.0f}"
    if value >= 1000:
        return f"${value:,.0f}"
    return f"${value:.2f}"


def fetch_psx_indices() -> dict:
    """Scrape dps.psx.com.pk/indices for all PSX index values.
    Returns {ticker: {value, abs_change, direction}} or {} on failure."""
    url = "https://dps.psx.com.pk/indices"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        )
    }
    try:
        r = requests.get(url, headers=headers, timeout=TIMEOUT)
        r.raise_for_status()
    except Exception as e:
        print(f"  [PSX fail] {e}", file=sys.stderr)
        return {}

    pattern = (
        r'topIndices__item__name[^>]*>([^<]+)</div>'
        r'<div class="topIndices__item__val">([\d,\.]+)</div>'
        r'</div><div class="change__text--([^"]+)">'
        r'<div class="topIndices__item__change">'
        r'<i class="icon-([^"]+)"></i>\s*([-\d,\.]+)</div>'
    )
    result = {}
    for m in re.finditer(pattern, r.text):
        ticker = m.group(1).strip()
        value  = float(m.group(2).replace(",", ""))
        cls    = m.group(3)   # "pos" or "neg"
        change = float(m.group(5).replace(",", ""))
        result[ticker] = {
            "value":      value,
            "abs_change": change,
            "direction":  "up" if "pos" in cls else "down",
        }
    return result


def fetch_pso_petrol() -> float | None:
    """Scrape PSO homepage for Euro5 Premier price (= government-regulated Motor Spirit MS).
    PSO labels RON92 petrol as 'Euro5 Premier' under the Euro5 fuel branding.
    Price is set fortnightly by OGRA (1st and 16th of each month)."""
    url = "https://www.psopk.com/"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        )
    }
    try:
        r = requests.get(url, headers=headers, timeout=TIMEOUT)
        r.raise_for_status()
        m = re.search(
            r'premier5\.png.*?<p class="fptitle">Rs\.([\d,\.]+)/Ltr',
            r.text, re.DOTALL
        )
        if m:
            return float(m.group(1).replace(",", ""))
        print("  [PSO] price pattern not found in page", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  [PSO fail] {e}", file=sys.stderr)
        return None


def update_petrol_snapshot(curr_price: float) -> tuple[float | None, float]:
    """Track petrol price across fortnightly OGRA revisions.
    Shifts prev←curr only when the price actually changes.
    Returns (prev_price, curr_price)."""
    data: dict = {}
    if PETROL_PATH.exists():
        try:
            data = json.loads(PETROL_PATH.read_text())
        except Exception:
            pass

    stored = data.get("curr_price")
    if stored is None:
        data = {"prev_price": None, "curr_price": curr_price}
    elif abs(curr_price - stored) > 0.005:
        data = {"prev_price": stored, "curr_price": curr_price}
    # else: price unchanged — leave data as-is

    PETROL_PATH.write_text(json.dumps(data, indent=2))
    return data.get("prev_price"), data["curr_price"]


def fmt_psx_value(value: float) -> str:
    return f"{value:,.0f}"


def fmt_psx_change(abs_change: float, value: float) -> str:
    """Format as '+2,305 (+1.34%)' matching the existing PSX section style."""
    prev = value - abs_change
    pct  = (abs_change / prev * 100) if prev else 0.0
    if abs_change >= 0:
        return f"+{abs_change:,.0f} (+{pct:.2f}%)"
    return f"{abs_change:,.0f} ({pct:.2f}%)"


def update_weekly_kse(kse_value: float, now: datetime) -> tuple[float | None, float]:
    """Maintain a week-over-week KSE-100 snapshot.
    Shifts prev←curr whenever the ISO week number changes.
    Returns (prev_week_close, curr_week_close)."""
    data: dict = {}
    if WEEKLY_KSE_PATH.exists():
        try:
            data = json.loads(WEEKLY_KSE_PATH.read_text())
        except Exception:
            pass

    current_week = now.strftime("%Y-W%W")
    if data.get("week") != current_week:
        data = {
            "week":       current_week,
            "prev_close": data.get("curr_close"),
            "curr_close": kse_value,
        }
    else:
        data["curr_close"] = kse_value

    WEEKLY_KSE_PATH.write_text(json.dumps(data, indent=2))
    return data.get("prev_close"), data["curr_close"]


def update_chart_history(kse_close: float, brent_close: float, now: datetime) -> None:
    """Append one data point per week to the KSE/Brent chart history.
    Uses Friday as the weekly anchor. Only appends if the current week
    is not already in the history."""
    data: dict = {"kse": [], "brent": []}
    if CHART_HISTORY_PATH.exists():
        try:
            data = json.loads(CHART_HISTORY_PATH.read_text())
        except Exception:
            pass

    week_key = now.strftime("%Y-W%W")
    date_label = now.strftime("%-d %b")

    existing_kse_weeks = {e.get("week") for e in data.get("kse", [])}
    existing_brent_weeks = {e.get("week") for e in data.get("brent", [])}

    if week_key not in existing_kse_weeks:
        data.setdefault("kse", []).append({
            "week": week_key, "date": date_label, "value": int(round(kse_close))
        })
    else:
        for e in data["kse"]:
            if e.get("week") == week_key:
                e["value"] = int(round(kse_close))
                e["date"] = date_label

    if week_key not in existing_brent_weeks:
        data.setdefault("brent", []).append({
            "week": week_key, "date": date_label, "value": round(brent_close, 2)
        })
    else:
        for e in data["brent"]:
            if e.get("week") == week_key:
                e["value"] = round(brent_close, 2)
                e["date"] = date_label

    CHART_HISTORY_PATH.write_text(json.dumps(data, indent=2))


def build_chart_history_block(marker_name: str) -> str:
    """Build the JS array content for kse-history or brent-history from the JSON file."""
    if not CHART_HISTORY_PATH.exists():
        return ""
    data = json.loads(CHART_HISTORY_PATH.read_text())
    key = "kse" if "kse" in marker_name else "brent"
    entries = data.get(key, [])
    lines = []
    for e in entries:
        val = e["value"]
        if key == "brent":
            lines.append(f'    {{ date: "{e["date"]}", value: {val} }},')
        else:
            lines.append(f'    {{ date: "{e["date"]}", value: {val} }},')
    return "\n".join(lines)


def render_psx_indexed_rows(rows: list[dict]) -> str:
    """Render PSX headline or sector rows (with high/low fields)."""
    lines = []
    for d in rows:
        lines.append(
            f'      {{ name: {render_js_string(d["name"])}, '
            f'value: {render_js_string(d["value"])}, '
            f'change: {render_js_string(d["change"])}, '
            f'high: {render_js_string(d.get("high", ""))}, '
            f'low: {render_js_string(d.get("low", ""))}, '
            f'direction: {render_js_string(d["direction"])} }},'
        )
    return "\n".join(lines)


def render_psx_thematic_rows(rows: list[dict]) -> str:
    """Render PSX thematic rows (no high/low)."""
    lines = []
    for d in rows:
        lines.append(
            f'      {{ name: {render_js_string(d["name"])}, '
            f'value: {render_js_string(d["value"])}, '
            f'change: {render_js_string(d["change"])}, '
            f'direction: {render_js_string(d["direction"])} }},'
        )
    return "\n".join(lines)


def parse_preserved_wow_row(content: str, name: str) -> dict | None:
    """Read an existing weekOverWeek row from the file by instrument name."""
    pattern = (
        r'name:\s*"' + re.escape(name) + r'",\s*'
        r'prev:\s*"([^"]+)",\s*'
        r'current:\s*"([^"]+)",\s*'
        r'change:\s*"([^"]+)",\s*'
        r'direction:\s*"([^"]+)"'
    )
    m = re.search(pattern, content)
    if not m:
        return None
    return {
        "name":      name,
        "prev":      m.group(1),
        "current":   m.group(2),
        "change":    m.group(3),
        "direction": m.group(4),
    }


def build_wow_rows(weekly: dict, preserved: dict) -> list[dict]:
    """Assemble the full weekOverWeek row list in display order.

    Routing:
      - MANUAL_WOW_NAMES or not in WOW_TICKERS → use preserved dict
        (covers: manual editor rows, PSX-scraped KSE-100, PSO-scraped Petrol)
      - in WOW_TICKERS → compute from yfinance weekly OHLC
    """
    rows = []
    for name in WOW_ROW_ORDER:
        if name in MANUAL_WOW_NAMES or name not in WOW_TICKERS:
            row = preserved.get(name)
            if row:
                rows.append(row)
        else:
            d = weekly.get(name)
            if d:
                change_str, direction = fmt_pct(d["current"], d["prev"])
                rows.append({
                    "name":      name,
                    "prev":      fmt_wow_price(name, d["prev"]),
                    "current":   fmt_wow_price(name, d["current"]),
                    "change":    change_str,
                    "direction": direction,
                })
    return rows


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
        d = fetch_yfinance(ticker)
        if d:
            fetched_commodities[name] = d
            print(f"  OK    {name:20s} close={d['close']}")
        else:
            print(f"  STALE {name:20s} (will keep previous value)")

    fetched_equities = {}
    for name, ticker in EQUITIES_TICKERS.items():
        d = fetch_yfinance(ticker)
        if d:
            fetched_equities[name] = d
            print(f"  OK    {name:20s} close={d['close']}")
        else:
            print(f"  STALE {name:20s} (will keep previous value)")

    fetched_fx = {}
    for name, ticker in FX_TICKERS.items():
        d = fetch_yfinance(ticker)
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

    petrol_price = fetch_pso_petrol()
    if petrol_price:
        print(f"  OK    Petrol (MS/PSO)      Rs.{petrol_price:.2f}/Ltr")
    else:
        print("  STALE Petrol (MS/PSO)      (will keep existing row)")

    print("  Fetching PSX indices from dps.psx.com.pk...")
    psx_data = fetch_psx_indices()
    if psx_data:
        print(f"  OK    PSX ({len(psx_data)} indices scraped)")
    else:
        print("  STALE PSX (will keep existing values)")

    print("  Fetching weekly OHLC for week-over-week table...")
    wow_weekly = {}
    for name, ticker in WOW_TICKERS.items():
        d = fetch_weekly_prev(ticker)
        if d:
            wow_weekly[name] = d
            print(f"  OK    {name:20s} prev={d['prev']:.2f}  curr={d['current']:.2f}")
        else:
            print(f"  STALE {name:20s} (will keep existing row)")

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
    ticker_data = []
    # KSE-100 and Dubai Platts are resolved after reading markets.js below

    # ---- Step 3: read current markets.js, do targeted edits ----
    print("\n[3/5] Updating markets.js...")
    content = read_current_markets_js()

    # Parse manually-maintained wow rows before we overwrite the block
    wow_preserved = {}
    for name in MANUAL_WOW_NAMES:
        row = parse_preserved_wow_row(content, name)
        if row:
            wow_preserved[name] = row

    # Build live KSE-100 ticker entry from PSX scrape (or fall back to existing)
    kse_entry = None
    kse_raw = psx_data.get("KSE100") if psx_data else None
    if kse_raw:
        prev_val = kse_raw["value"] - kse_raw["abs_change"]
        change_str, direction = fmt_pct(kse_raw["value"], prev_val if prev_val else None)
        kse_entry = {
            "name":      "KSE-100",
            "value":     fmt_psx_value(kse_raw["value"]),
            "changePct": change_str,
            "direction": direction,
        }
        # Update weekly KSE snapshot and auto-populate wow row
        prev_week, curr_week = update_weekly_kse(kse_raw["value"], now)
        if prev_week is not None:
            wk_change, wk_dir = fmt_pct(curr_week, prev_week)
            wow_preserved["KSE-100"] = {
                "name":      "KSE-100",
                "prev":      fmt_psx_value(prev_week),
                "current":   fmt_psx_value(curr_week),
                "change":    wk_change,
                "direction": wk_dir,
            }
    else:
        # Fall back: preserve existing KSE-100 ticker entry from file
        kse_match = re.search(
            r'name:\s*"KSE-100",\s*value:\s*"([^"]+)",\s*'
            r'changePct:\s*"([^"]+)",\s*direction:\s*"([^"]+)"',
            content,
        )
        if kse_match:
            kse_entry = {
                "name":      "KSE-100",
                "value":     kse_match.group(1),
                "changePct": kse_match.group(2),
                "direction": kse_match.group(3),
            }

    # Build Petrol (MS) wow row from PSO scrape + fortnightly snapshot
    if petrol_price:
        prev_p, curr_p = update_petrol_snapshot(petrol_price)
        if prev_p is not None:
            diff = curr_p - prev_p
            if abs(diff) < 0.005:
                petrol_change, petrol_dir = "Flat", "flat"
            else:
                sign = "+" if diff > 0 else "-"
                petrol_change = f"{sign}Rs {abs(diff):.2f}"
                petrol_dir    = "up" if diff > 0 else "down"
            wow_preserved["Petrol (MS)"] = {
                "name":      "Petrol (MS)",
                "prev":      f"Rs {prev_p:.2f}",
                "current":   f"Rs {curr_p:.2f}",
                "change":    petrol_change,
                "direction": petrol_dir,
            }
        else:
            # First run — no prev yet; show current, flag as pending
            wow_preserved["Petrol (MS)"] = {
                "name":      "Petrol (MS)",
                "prev":      "–",
                "current":   f"Rs {curr_p:.2f}",
                "change":    "–",
                "direction": "flat",
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

    # --- PSX blocks ---
    def _psx_rows(group: list, include_hl: bool) -> list[dict]:
        rows = []
        for ticker, display_name in group:
            d = psx_data.get(ticker)
            if not d:
                continue
            row = {
                "name":      display_name,
                "value":     fmt_psx_value(d["value"]),
                "change":    fmt_psx_change(d["abs_change"], d["value"]),
                "direction": d["direction"],
            }
            if include_hl:
                row.update({"high": "", "low": ""})
            rows.append(row)
        return rows

    psx_headline_rows  = _psx_rows(PSX_HEADLINE,  include_hl=True)  if psx_data else []
    psx_sector_rows    = _psx_rows(PSX_SECTOR,    include_hl=True)  if psx_data else []
    psx_thematic_rows  = _psx_rows(PSX_THEMATIC,  include_hl=False) if psx_data else []

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
    wow_rows = build_wow_rows(wow_weekly, wow_preserved)
    new_wow_block = render_wow_rows(wow_rows)
    content = replace_between_markers(
        content,
        "// -- AUTO:wow-rows --",
        "// -- /AUTO:wow-rows --",
        new_wow_block,
    )

    if psx_headline_rows:
        content = replace_between_markers(
            content,
            "// -- AUTO:psx-headline --",
            "// -- /AUTO:psx-headline --",
            render_psx_indexed_rows(psx_headline_rows),
        )
    if psx_sector_rows:
        content = replace_between_markers(
            content,
            "// -- AUTO:psx-sector --",
            "// -- /AUTO:psx-sector --",
            render_psx_indexed_rows(psx_sector_rows),
        )
    if psx_thematic_rows:
        content = replace_between_markers(
            content,
            "// -- AUTO:psx-thematic --",
            "// -- /AUTO:psx-thematic --",
            render_psx_thematic_rows(psx_thematic_rows),
        )

    # Update chart history (weekly KSE + Brent)
    kse_close = kse_raw["value"] if kse_raw else None
    brent_close = ticker_data.get("Brent Crude", {}).get("close") if ticker_data else None
    if kse_close and brent_close:
        update_chart_history(kse_close, brent_close, now)
        kse_hist_block = build_chart_history_block("kse-history")
        brent_hist_block = build_chart_history_block("brent-history")
        if kse_hist_block:
            content = replace_between_markers(
                content,
                "// -- AUTO:kse-history --",
                "// -- /AUTO:kse-history --",
                kse_hist_block,
            )
        if brent_hist_block:
            content = replace_between_markers(
                content,
                "// -- AUTO:brent-history --",
                "// -- /AUTO:brent-history --",
                brent_hist_block,
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
