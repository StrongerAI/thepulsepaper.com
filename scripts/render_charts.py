#!/usr/bin/env python3
"""
scripts/render_charts.py
========================
Generates a browseable chart gallery for a weekly edition.

Reads the filled weekly_data_YYYY-MM-DD.json, fetches historical price data
via yfinance, then renders ~16 chart snippets and saves them to:

  scripts/weekly_drafts/charts-YYYY-MM-DD/
    gallery.html          ← open in browser, copy charts from here
    brent_52w.html        ← individual snippets (paste into edition)
    wti_52w.html
    ...

Usage:
  python3 scripts/render_charts.py               # most recent data file
  python3 scripts/render_charts.py 2026-06-21    # specific date
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import yfinance as yf

SCRIPTS_DIR   = Path(__file__).resolve().parent
DRAFTS_DIR    = SCRIPTS_DIR / "weekly_drafts"
HISTORICAL    = SCRIPTS_DIR / "historical_data.json"
PKT           = ZoneInfo("Asia/Karachi")

# Edition palette
INK    = "#1a1a1a"
PAPER  = "#FFF1E5"
MUTED  = "#7a6a5a"
ACCENT = "#c0392b"
GREEN  = "#1a6632"
AMBER  = "#b06000"

sys.path.insert(0, str(SCRIPTS_DIR))
from chart_snippets import (
    line_chart, bar_chart, horizontal_bar, data_table, dual_axis_chart
)


# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

def find_data_file(date_slug: str | None) -> Path:
    if date_slug:
        p = DRAFTS_DIR / f"weekly_data_{date_slug}.json"
        if not p.exists():
            sys.exit(f"Error: {p} not found.")
        return p
    files = sorted(DRAFTS_DIR.glob("weekly_data_*.json"))
    if not files:
        sys.exit("Error: no weekly_data_*.json found. Run gather_weekly.py first.")
    return files[-1]


def parse_num(val) -> float | None:
    try:
        return float(str(val).replace(",", "").replace("%", "").replace("$", "").split()[0])
    except Exception:
        return None


def is_filled(val) -> bool:
    return not str(val).startswith("FILL_ME")


def fmt_pct(v: float | None) -> dict:
    if v is None:
        return {"value": "—", "class": ""}
    sign = "+" if v > 0 else ""
    cls = "ptd-green" if v > 0 else ("ptd-red" if v < 0 else "")
    return {"value": f"{sign}{v:.2f}%", "class": cls}


# ---------------------------------------------------------------------------
# YFINANCE HISTORY
# ---------------------------------------------------------------------------

def fetch_weekly(symbol: str, weeks: int = 52) -> tuple[list, list]:
    """Fetch weekly closing prices (last Friday close each week)."""
    try:
        period = "1y" if weeks <= 52 else "2y"
        hist = yf.Ticker(symbol).history(period=period).dropna(subset=["Close"])
        if hist.empty:
            return [], []
        weekly = hist["Close"].resample("W").last().dropna().tail(weeks)
        labels = [d.strftime("%-d %b") for d in weekly.index]
        values = [round(float(v), 4) for v in weekly.values]
        return labels, values
    except Exception as e:
        print(f"  [warn] fetch_weekly {symbol}: {e}")
        return [], []


def normalize_to_100(values: list) -> list:
    """Rebase a price series so index 0 = 100."""
    if not values or values[0] == 0:
        return values
    base = values[0]
    return [round(v / base * 100, 2) for v in values]


def session_pct(markets: dict, name: str) -> float | None:
    d = markets.get(name)
    if not d or not d.get("prev_close") or d["prev_close"] == 0:
        return None
    return (d["close"] - d["prev_close"]) / d["prev_close"] * 100


# ---------------------------------------------------------------------------
# CHART BUILDERS
# ---------------------------------------------------------------------------

def build_commodities_charts(markets: dict) -> list[dict]:
    charts = []

    # Brent 52-week trend
    print("  Brent 52w...", end=" ", flush=True)
    lb, vb = fetch_weekly("BZ=F", 52)
    if lb:
        charts.append({
            "id": "brent_52w", "category": "Commodities & Energy",
            "title": "Brent Crude — 52-Week Trend ($/bbl)",
            "html": line_chart(
                "Brent Crude — 52-Week Trend ($/bbl)", lb,
                [{"label": "Brent", "data": vb, "color": ACCENT}],
                fill=True, note="Source: ICE via yfinance. Weekly Friday close."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # WTI 52-week trend
    print("  WTI 52w...", end=" ", flush=True)
    lw, vw = fetch_weekly("CL=F", 52)
    if lw:
        charts.append({
            "id": "wti_52w", "category": "Commodities & Energy",
            "title": "WTI Crude — 52-Week Trend ($/bbl)",
            "html": line_chart(
                "WTI Crude — 52-Week Trend ($/bbl)", lw,
                [{"label": "WTI", "data": vw, "color": "#8b1a1a"}],
                fill=True, note="Source: NYMEX via yfinance. Weekly Friday close."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # Brent vs WTI overlay
    if lb and lw and len(lb) == len(lw):
        charts.append({
            "id": "brent_vs_wti", "category": "Commodities & Energy",
            "title": "Brent vs. WTI — 52 Weeks",
            "html": line_chart(
                "Brent vs. WTI — 52 Weeks ($/bbl)", lb,
                [
                    {"label": "Brent", "data": vb, "color": ACCENT},
                    {"label": "WTI",   "data": vw, "color": "#8b1a1a"},
                ],
                note="Source: ICE / NYMEX via yfinance."
            )
        })

    # Gold 52-week trend
    print("  Gold 52w...", end=" ", flush=True)
    lg, vg = fetch_weekly("GC=F", 52)
    if lg:
        charts.append({
            "id": "gold_52w", "category": "Commodities & Energy",
            "title": "Gold — 52-Week Trend ($/oz)",
            "html": line_chart(
                "Gold — 52-Week Trend ($/oz)", lg,
                [{"label": "Gold", "data": vg, "color": AMBER}],
                fill=True, note="Source: COMEX via yfinance. Weekly Friday close."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # Commodities weekly % change bar
    comm_names = [
        ("Brent Crude ($/bbl)", "BZ=F", "Brent"),
        ("WTI Crude ($/bbl)",   "CL=F", "WTI"),
        ("Gold ($/oz)",         "GC=F", "Gold"),
        ("Silver ($/oz)",       "SI=F", "Silver"),
        ("Natural Gas ($/MMBtu)", "NG=F", "Nat Gas"),
    ]
    bar_labels, bar_values = [], []
    for full_name, _, short in comm_names:
        pct = session_pct(markets, full_name)
        if pct is not None:
            bar_labels.append(short)
            bar_values.append(round(pct, 2))
    if bar_labels:
        charts.append({
            "id": "commodities_session_pct",
            "category": "Commodities & Energy",
            "title": "Commodities — Session Change (%)",
            "html": bar_chart(
                "Commodities — Session Change (%)", bar_labels, bar_values,
                note="vs. previous trading session close."
            )
        })

    return charts


def build_fx_charts(markets: dict) -> list[dict]:
    charts = []

    # USD/PKR 52-week
    print("  USD/PKR 52w...", end=" ", flush=True)
    lp, vp = fetch_weekly("PKR=X", 52)
    if lp:
        charts.append({
            "id": "pkr_52w", "category": "FX & Pakistan Macro",
            "title": "USD / PKR — 52-Week Trend",
            "html": line_chart(
                "USD / PKR — 52-Week Trend", lp,
                [{"label": "USD/PKR", "data": vp, "color": ACCENT}],
                fill=True,
                note="Source: yfinance (spot indicative). Verify against SBP for published rates."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # EUR/USD 24-week
    print("  EUR/USD 24w...", end=" ", flush=True)
    le, ve = fetch_weekly("EURUSD=X", 24)
    if le:
        charts.append({
            "id": "eurusd_24w", "category": "FX & Pakistan Macro",
            "title": "EUR / USD — 24-Week Trend",
            "html": line_chart(
                "EUR / USD — 24-Week Trend", le,
                [{"label": "EUR/USD", "data": ve, "color": "#1565c0"}],
                note="Source: yfinance. Weekly Friday close."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # FX session % change
    fx_pairs = [
        ("EUR / USD", "EUR/USD"),
        ("GBP / USD", "GBP/USD"),
        ("USD / CNY", "USD/CNY"),
        ("USD / PKR", "USD/PKR"),
    ]
    fl, fv = [], []
    for full, short in fx_pairs:
        pct = session_pct(markets, full)
        if pct is not None:
            fl.append(short)
            fv.append(round(pct, 2))
    if fl:
        charts.append({
            "id": "fx_session_pct", "category": "FX & Pakistan Macro",
            "title": "FX — Session Change (%)",
            "html": bar_chart(
                "FX — Session Change (%)", fl, fv,
                note="vs. previous trading session close."
            )
        })

    return charts


def build_equities_charts(markets: dict) -> list[dict]:
    charts = []

    # S&P 500 12-week
    print("  S&P 500 12w...", end=" ", flush=True)
    ls, vs = fetch_weekly("^GSPC", 12)
    if ls:
        charts.append({
            "id": "sp500_12w", "category": "Global Equities",
            "title": "S&P 500 — 12-Week Trend",
            "html": line_chart(
                "S&P 500 — 12-Week Trend", ls,
                [{"label": "S&P 500", "data": vs, "color": "#1565c0"}],
                fill=True, note="Source: NYSE via yfinance."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # Asia equities — normalized to 100
    print("  Asia equities 12w...", end=" ", flush=True)
    asia_symbols = [
        ("^N225",   "Nikkei",     "#6a1b9a"),
        ("^HSI",    "Hang Seng",  ACCENT),
        ("^BSESN",  "Sensex",     AMBER),
    ]
    asia_datasets = []
    ref_labels = None
    for sym, label, color in asia_symbols:
        al, av = fetch_weekly(sym, 12)
        if al:
            if ref_labels is None:
                ref_labels = al
            if len(av) == len(ref_labels):
                asia_datasets.append({"label": label, "data": normalize_to_100(av), "color": color})
    if asia_datasets and ref_labels:
        charts.append({
            "id": "asia_equities_12w", "category": "Global Equities",
            "title": "Asia Equities — 12-Week Trend (Indexed to 100)",
            "html": line_chart(
                "Asia Equities — 12-Week Trend (Indexed = 100 at start)",
                ref_labels, asia_datasets,
                note="Rebased to 100 at start of period. Source: yfinance."
            )
        })
        print("OK")
    else:
        print("SKIP")

    # Global equities session % change
    eq_pairs = [
        ("S&P 500", "S&P"), ("Nasdaq", "Nasdaq"),
        ("Nikkei 225", "Nikkei"), ("Hang Seng", "Hang Seng"),
        ("Sensex", "Sensex"),
    ]
    el, ev = [], []
    for full, short in eq_pairs:
        pct = session_pct(markets, full)
        if pct is not None:
            el.append(short)
            ev.append(round(pct, 2))
    if el:
        charts.append({
            "id": "equities_session_pct", "category": "Global Equities",
            "title": "Global Equities — Session Change (%)",
            "html": horizontal_bar(
                "Global Equities — Session Change (%)", el, ev,
                note="vs. previous trading session close."
            )
        })

    return charts


def build_psx_charts(psx: dict) -> list[dict]:
    charts = []
    key_indices = ["KSE100", "KSE30", "KMI30", "ALLSHR", "BKTI", "OGTI", "ACI"]
    labels, values = [], []
    rows = []
    for name in key_indices:
        if name not in psx:
            continue
        d = psx[name]
        pct_str = d.get("change_pct", "0").replace("%", "").replace("+", "").strip()
        try:
            pct = float(pct_str)
        except Exception:
            pct = 0.0
        labels.append(name)
        values.append(round(pct, 2))
        pct_cell = fmt_pct(pct)
        rows.append([name, d.get("current", "—"), d.get("change", "—"), pct_cell,
                     d.get("high", "—"), d.get("low", "—")])

    if labels:
        charts.append({
            "id": "psx_daily_pct", "category": "Pakistan Markets (PSX)",
            "title": "PSX Indices — Daily Change (%)",
            "html": horizontal_bar(
                "PSX Indices — Daily Change (%)", labels, values,
                note="Source: dps.psx.com.pk. Verify before publishing."
            )
        })
    if rows:
        charts.append({
            "id": "psx_snapshot", "category": "Pakistan Markets (PSX)",
            "title": "PSX Indices — Snapshot",
            "html": data_table(
                "PSX Indices — Snapshot",
                ["Index", "Current", "Change", "Chg %", "High", "Low"],
                rows,
                note="Source: dps.psx.com.pk. Verify before publishing."
            )
        })
    return charts


def build_manual_charts(manual: dict) -> list[dict]:
    charts = []

    # Yield curve table
    yield_fields = [
        ("T-bill 3M cut-off yield (%)",  "3-Month T-Bill"),
        ("T-bill 6M cut-off yield (%)",  "6-Month T-Bill"),
        ("T-bill 12M cut-off yield (%)", "12-Month T-Bill"),
        ("PIB 2Y cut-off yield (%)",     "2-Year PIB"),
        ("PIB 3Y cut-off yield (%)",     "3-Year PIB"),
    ]
    yield_rows = []
    for key, label in yield_fields:
        val = manual.get(key, "")
        if is_filled(val):
            num = parse_num(val)
            yield_rows.append([label, f"{num:.2f}%" if num else val])
    if yield_rows:
        charts.append({
            "id": "yield_curve", "category": "FX & Pakistan Macro",
            "title": "Pakistan Yield Curve",
            "html": data_table(
                "Pakistan Yield Curve",
                ["Instrument", "Cut-off Yield"],
                yield_rows,
                note="Source: SBP auction results. Verify against latest SBP circular."
            )
        })

    # Fuel prices table
    fuel_fields = [
        ("Petrol (MS) price (Rs/L)",  "Petrol (MS)"),
        ("Diesel (HSD) price (Rs/L)", "Diesel (HSD)"),
        ("Kerosene price (Rs/L)",     "Kerosene"),
        ("LDO price (Rs/L)",          "Light Diesel Oil"),
    ]
    fuel_rows = []
    for key, label in fuel_fields:
        val = manual.get(key, "")
        if is_filled(val):
            fuel_rows.append([label, f"Rs {val}/L"])
    if fuel_rows:
        charts.append({
            "id": "fuel_prices", "category": "FX & Pakistan Macro",
            "title": "Pakistan Fuel Prices (OGRA)",
            "html": data_table(
                "Pakistan Fuel Prices (OGRA)",
                ["Product", "Retail Price"],
                fuel_rows,
                note="Source: OGRA fortnightly notification."
            )
        })

    # Markets snapshot (all instruments)
    snap_rows = []
    for name, d in manual.items():
        pass  # handled separately via markets dict

    return charts


def build_markets_snapshot(markets: dict) -> list[dict]:
    rows = []
    for name, d in markets.items():
        if not d:
            rows.append([name, "—", "—", {"value": "STALE", "class": "ptd-red"}])
            continue
        pct = None
        if d.get("prev_close") and d["prev_close"] != 0:
            pct = (d["close"] - d["prev_close"]) / d["prev_close"] * 100
        rows.append([name, f"{d['close']:.6g}", d.get("date", "—"), fmt_pct(pct)])
    if not rows:
        return []
    return [{
        "id": "markets_snapshot", "category": "Markets Snapshot",
        "title": "All Market Instruments — Current Snapshot",
        "html": data_table(
            "All Market Instruments — Current Snapshot",
            ["Instrument", "Price", "Date", "Session Chg"],
            rows,
            note="Source: yfinance. Verify before publishing."
        )
    }]


def build_historical_charts(history: dict) -> list[dict]:
    """Charts that require accumulated historical data (multiple weeks)."""
    if len(history) < 2:
        return []

    dates = sorted(history.keys())
    labels = [datetime.strptime(d, "%Y-%m-%d").strftime("%-d %b") for d in dates]
    charts = []

    def series(key):
        return [history[d].get(key) for d in dates]

    # SBP reserves trend
    reserves = series("sbp_reserves")
    if any(v is not None for v in reserves):
        charts.append({
            "id": "sbp_reserves_trend", "category": "FX & Pakistan Macro",
            "title": "SBP Gross Reserves — Weekly Trend ($bn)",
            "html": line_chart(
                "SBP Gross Reserves — Weekly Trend ($bn)", labels,
                [{"label": "Gross Reserves ($bn)", "data": reserves, "color": GREEN}],
                fill=True, note="Source: SBP weekly bulletin. Manual entry."
            )
        })

    # Policy rate (step chart — but Chart.js line is fine)
    policy = series("policy_rate")
    if any(v is not None for v in policy):
        charts.append({
            "id": "policy_rate_trend", "category": "FX & Pakistan Macro",
            "title": "SBP Policy Rate — Weekly (%)",
            "html": line_chart(
                "SBP Policy Rate — Weekly (%)", labels,
                [{"label": "Policy Rate (%)", "data": policy, "color": ACCENT}],
                note="Source: SBP MPC decisions. Manual entry."
            )
        })

    # CPI + SPI dual axis
    cpi = series("cpi_yoy")
    spi = series("spi_yoy")
    if any(v is not None for v in cpi) and any(v is not None for v in spi):
        charts.append({
            "id": "inflation_trend", "category": "FX & Pakistan Macro",
            "title": "Inflation — CPI and SPI YoY (%)",
            "html": dual_axis_chart(
                "Inflation — CPI and SPI YoY (%)", labels,
                {"label": "CPI YoY (%)", "data": cpi, "color": ACCENT},
                {"label": "SPI YoY (%)", "data": spi, "color": AMBER},
                note="Source: PBS. CPI monthly, SPI weekly. Manual entry."
            )
        })

    # FBR revenue vs target
    fbr = series("fbr_ytd")
    tgt = series("fbr_target")
    if any(v is not None for v in fbr):
        ds = [{"label": "FBR YTD Revenue (Rs bn)", "data": fbr, "color": GREEN}]
        if any(v is not None for v in tgt):
            ds.append({"label": "Prorated Target (Rs bn)", "data": tgt, "color": ACCENT})
        charts.append({
            "id": "fbr_revenue_trend", "category": "FX & Pakistan Macro",
            "title": "FBR Revenue YTD vs. Target (Rs bn)",
            "html": line_chart(
                "FBR Revenue YTD vs. Target (Rs bn)", labels, ds,
                note="Source: FBR press releases. Manual entry."
            )
        })

    return charts


# ---------------------------------------------------------------------------
# GALLERY BUILDER
# ---------------------------------------------------------------------------

def build_gallery(charts: list[dict], date_slug: str) -> str:
    categories_order = [
        "Commodities & Energy",
        "FX & Pakistan Macro",
        "Global Equities",
        "Pakistan Markets (PSX)",
        "Markets Snapshot",
    ]

    by_cat: dict[str, list] = {}
    for c in charts:
        cat = c.get("category", "Other")
        by_cat.setdefault(cat, []).append(c)

    ordered_cats = [c for c in categories_order if c in by_cat]
    for cat in by_cat:
        if cat not in ordered_cats:
            ordered_cats.append(cat)

    # Build JS chart store for Copy buttons.
    # Escape </script> so the JSON string doesn't prematurely close the <script> block.
    # In JS strings, <\/ is identical to </ — browsers treat \/ as an escaped forward slash.
    chart_store = {}
    for c in charts:
        chart_store[c["id"]] = c["html"]
    chart_store_json = json.dumps(chart_store, ensure_ascii=False).replace("</script>", r"<\/script>")
    chart_store_js = "var PULSE_CHARTS=" + chart_store_json + ";"

    sections_html = ""
    for cat in ordered_cats:
        cat_charts = by_cat[cat]
        cards = ""
        for c in cat_charts:
            cid = c["id"]
            cards += f"""
<div style="margin-bottom:20px;border:1px solid #d8ccc0;background:#fffaf4">
  <div style="padding:16px 16px 4px">
    {c['html']}
  </div>
  <div style="padding:8px 16px 10px;border-top:1px solid #d8ccc0;display:flex;align-items:center;gap:12px">
    <button onclick="copyChart('{cid}')"
      style="font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:1px;
             text-transform:uppercase;background:#1a1a1a;color:#FFF1E5;border:none;
             padding:5px 14px;cursor:pointer;flex-shrink:0"
      onmouseover="this.style.background='#c0392b'"
      onmouseout="this.style.background='#1a1a1a'">Copy HTML</button>
    <span id="msg_{cid}" style="font-family:'IBM Plex Mono',monospace;font-size:9px;
      color:#1a6632;display:none">Copied to clipboard</span>
    <span style="font-family:'IBM Plex Mono',monospace;font-size:9px;color:#7a6a5a;margin-left:auto">{cid}.html</span>
  </div>
</div>"""
        sections_html += f"""
<div style="margin:36px 0 12px;font-family:'IBM Plex Mono',monospace;font-size:9px;
  letter-spacing:2px;text-transform:uppercase;color:#7a6a5a;
  padding-bottom:8px;border-bottom:1px solid #d8ccc0">{cat.upper()}</div>
{cards}"""

    from chart_snippets import _SHARED_CSS
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Chart Gallery — {date_slug} — The Pulse Paper</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Libre+Baskerville:wght@400;700&family=Crimson+Pro:wght@400;600&display=swap" rel="stylesheet">
<style>
* {{ margin:0; padding:0; box-sizing:border-box }}
:root {{ --card-bg:#fffaf4; --border:#d8ccc0; --muted:#7a6a5a }}
body {{ background:#FFF1E5; color:#1a1a1a; font-family:'Crimson Pro',serif; font-size:15px; line-height:1.6 }}
{_SHARED_CSS}
</style>
</head>
<body>
<div style="background:#1a1a1a;color:#FFF1E5;padding:24px 40px 20px">
  <div style="font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:2.5px;
    text-transform:uppercase;color:#c0392b;margin-bottom:8px">The Pulse Paper</div>
  <h1 style="font-family:'Libre Baskerville',serif;font-size:28px;font-weight:400;margin-bottom:8px">
    Chart Gallery — {date_slug}</h1>
  <p style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:rgba(255,241,229,.55)">
    {len(charts)} charts ready. Click <strong style="color:rgba(255,241,229,.8)">Copy HTML</strong>
    on any chart to get a self-contained snippet — paste directly into the edition.</p>
</div>
<div style="max-width:860px;margin:0 auto;padding:0 28px 60px">
  {sections_html}
</div>
<script>
{chart_store_js}
function copyChart(id) {{
  var html = PULSE_CHARTS[id];
  if (!html) return;
  navigator.clipboard.writeText(html).then(function() {{
    var msg = document.getElementById('msg_' + id);
    if (msg) {{ msg.style.display='inline'; setTimeout(function(){{msg.style.display='none';}}, 2500); }}
  }}).catch(function() {{
    var ta = document.createElement('textarea');
    ta.value = html;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    var msg = document.getElementById('msg_' + id);
    if (msg) {{ msg.style.display='inline'; setTimeout(function(){{msg.style.display='none';}}, 2500); }}
  }});
}}
</script>
</body>
</html>"""


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Render chart gallery for a weekly edition")
    parser.add_argument("date", nargs="?", help="Date slug e.g. 2026-06-21")
    args = parser.parse_args()

    data_path = find_data_file(args.date)
    data = json.loads(data_path.read_text(encoding="utf-8"))
    date_slug = data.get("date_slug", datetime.now(PKT).strftime("%Y-%m-%d"))
    markets = data.get("markets", {})
    psx     = data.get("psx", {})
    manual  = data.get("manual", {})

    out_dir = DRAFTS_DIR / f"charts-{date_slug}"
    out_dir.mkdir(exist_ok=True)

    print(f"=== Pulse Chart Renderer — {date_slug} ===")
    print(f"  Data: {data_path.name}")
    print(f"  Output: {out_dir}\n")

    # Load historical data for trend charts
    history = {}
    if HISTORICAL.exists():
        try:
            history = json.loads(HISTORICAL.read_text(encoding="utf-8"))
        except Exception:
            pass
    print(f"  Historical data: {len(history)} week(s) accumulated\n")

    all_charts: list[dict] = []

    print("[1/5] Commodities & Energy charts...")
    all_charts += build_commodities_charts(markets)

    print("[2/5] FX & Macro charts...")
    all_charts += build_fx_charts(markets)
    all_charts += build_manual_charts(manual)

    print("[3/5] Global Equities charts...")
    all_charts += build_equities_charts(markets)

    print("[4/5] PSX charts...")
    all_charts += build_psx_charts(psx)
    all_charts += build_markets_snapshot(markets)

    print("[5/5] Historical trend charts...")
    all_charts += build_historical_charts(history)

    # Save individual snippet files
    for c in all_charts:
        fpath = out_dir / f"{c['id']}.html"
        fpath.write_text(c["html"], encoding="utf-8")

    # Save gallery
    gallery_html = build_gallery(all_charts, date_slug)
    gallery_path = out_dir / "gallery.html"
    gallery_path.write_text(gallery_html, encoding="utf-8")

    print(f"\n  {len(all_charts)} charts rendered")
    print(f"  ✓  {gallery_path}")
    print(f"\nNext: open gallery.html in your browser and copy charts into the edition.")


if __name__ == "__main__":
    main()
