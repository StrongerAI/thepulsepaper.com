#!/usr/bin/env python3
"""
scripts/chart_snippets.py
=========================
Library of self-contained Chart.js HTML fragments matching The Pulse Paper visual style.

Each function returns a string you can paste into any section of the edition HTML.
Chart.js loads automatically from CDN if not already on the page.
The shared CSS injects once per page via a DOM ID guard.

Usage:
  from chart_snippets import line_chart, bar_chart, horizontal_bar, data_table, dual_axis_chart
  html = line_chart("Brent Crude ($/bbl)", labels, [{"label": "Brent", "data": values}])
"""

import json
import uuid

CHARTJS_CDN = "https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"

# Edition palette
INK    = "#1a1a1a"
PAPER  = "#FFF1E5"
MUTED  = "#7a6a5a"
ACCENT = "#c0392b"
GREEN  = "#1a6632"
AMBER  = "#b06000"

_SHARED_CSS = (
    ".pulse-chart-block{"
    "background:var(--card-bg,#fffaf4);"
    "border:1px solid var(--border,#d8ccc0);"
    "padding:20px 24px;margin:20px 0}"
    ".pulse-chart-title{"
    "font-family:'IBM Plex Mono','Courier New',monospace;"
    "font-size:9px;letter-spacing:2px;text-transform:uppercase;"
    "color:var(--muted,#7a6a5a);margin-bottom:14px;font-weight:500}"
    ".pulse-chart-note{"
    "font-family:'IBM Plex Mono','Courier New',monospace;"
    "font-size:8.5px;color:var(--muted,#7a6a5a);margin-top:10px;opacity:.8}"
    ".pulse-data-table{width:100%;border-collapse:collapse;"
    "font-family:'JetBrains Mono','IBM Plex Mono',monospace;font-size:11px}"
    ".pulse-data-table th{background:#1a1a1a;color:rgba(255,241,229,.7);"
    "font-size:9px;letter-spacing:1px;text-transform:uppercase;"
    "padding:7px 12px;text-align:left;font-weight:400}"
    ".pulse-data-table td{padding:7px 12px;border-bottom:1px solid #d8ccc0;color:#1a1a1a}"
    ".pulse-data-table tr:last-child td{border-bottom:none}"
    ".pulse-data-table tr:nth-child(even) td{background:rgba(0,0,0,.02)}"
    ".ptd-red{color:#b71c1c!important;font-weight:600}"
    ".ptd-green{color:#1b5e20!important;font-weight:600}"
    ".ptd-amber{color:#8b5000!important;font-weight:600}"
)

# Injects shared CSS exactly once per page (checked via DOM ID)
_CSS_INJECTOR = (
    "<script>(function(){if(!document.getElementById('pulse-chart-css')){"
    "var s=document.createElement('style');s.id='pulse-chart-css';"
    f"s.textContent={json.dumps(_SHARED_CSS)};"
    "document.head.appendChild(s);}}());</script>"
)


def _uid() -> str:
    return uuid.uuid4().hex[:8]


def _loader(fn_name: str, fn_body: str) -> str:
    """Lazy-loads Chart.js then calls fn_body. Safe to embed multiple times."""
    return (
        "<script>(function(){"
        f"function {fn_name}(){{{fn_body}}}"
        f"if(window.Chart){{{fn_name}();}}"
        "else{"
        "var e=document.createElement('script');"
        f"e.src='{CHARTJS_CDN}';"
        f"e.onload={fn_name};"
        "document.head.appendChild(e);"
        "}"
        "})();</script>"
    )


def _auto_colors(values: list) -> list:
    """Green for ≥0, red for <0."""
    return [GREEN if (v or 0) >= 0 else ACCENT for v in values]


# ---------------------------------------------------------------------------
# LINE CHART
# ---------------------------------------------------------------------------

def line_chart(
    title: str,
    labels: list,
    datasets: list,
    height: int = 200,
    fill: bool = False,
    note: str | None = None,
) -> str:
    """
    Line / area chart.

    datasets: list of dicts — {"label": str, "data": [float], "color": str (optional)}
    """
    cid = _uid()
    fn  = f"pci_{cid}"
    palette = [ACCENT, GREEN, AMBER, "#1565c0", "#6a1b9a"]

    ds_parts = []
    for i, ds in enumerate(datasets):
        color = ds.get("color") or palette[i % len(palette)]
        bg    = (color + "18") if fill else "transparent"
        fill_js = "true" if fill else "false"
        ds_parts.append(
            f'{{"label":{json.dumps(ds["label"])},'
            f'"data":{json.dumps(ds["data"])},'
            f'"borderColor":"{color}",'
            f'"backgroundColor":"{bg}",'
            f'"borderWidth":1.5,"pointRadius":0,"tension":0.25,"fill":{fill_js}}}'
        )

    show_legend = "true" if len(datasets) > 1 else "false"

    fn_body = (
        f"var el=document.getElementById('c_{cid}');"
        "if(!el)return;"
        f"new Chart(el.getContext('2d'),{{"
        f'"type":"line",'
        f'"data":{{"labels":{json.dumps(labels)},"datasets":[{",".join(ds_parts)}]}},'
        '"options":{'
        '"responsive":true,"maintainAspectRatio":false,'
        '"interaction":{"mode":"index","intersect":false},'
        '"plugins":{'
        f'"legend":{{"display":{show_legend},"labels":{{"font":{{"family":"IBM Plex Mono","size":9}},"color":"{MUTED}","boxWidth":10,"padding":12}}}},'
        f'"tooltip":{{"backgroundColor":"{INK}","titleFont":{{"family":"IBM Plex Mono","size":9}},"bodyFont":{{"family":"JetBrains Mono","size":10}},"padding":10}}'
        '},'
        '"scales":{'
        f'"x":{{"grid":{{"color":"rgba(0,0,0,0.04)"}},"ticks":{{"font":{{"family":"IBM Plex Mono","size":8}},"color":"{MUTED}","maxTicksLimit":8,"maxRotation":0}}}},'
        f'"y":{{"grid":{{"color":"rgba(0,0,0,0.05)"}},"ticks":{{"font":{{"family":"JetBrains Mono","size":9}},"color":"{MUTED}"}}}}'
        "}}}})"
    )

    note_html = f'<div class="pulse-chart-note">{note}</div>' if note else ""
    return (
        f"{_CSS_INJECTOR}"
        f'<div class="pulse-chart-block">'
        f'<div class="pulse-chart-title">{title}</div>'
        f'<div style="position:relative;height:{height}px"><canvas id="c_{cid}"></canvas></div>'
        f"{note_html}"
        f"</div>"
        f"{_loader(fn, fn_body)}"
    )


# ---------------------------------------------------------------------------
# BAR CHART (vertical)
# ---------------------------------------------------------------------------

def bar_chart(
    title: str,
    labels: list,
    values: list,
    colors: list | None = None,
    height: int = 180,
    note: str | None = None,
) -> str:
    """Vertical bar chart. Colors auto red/green by sign if not provided."""
    cid = _uid()
    fn  = f"pci_{cid}"
    if colors is None:
        colors = _auto_colors(values)

    fn_body = (
        f"var el=document.getElementById('c_{cid}');"
        "if(!el)return;"
        f"new Chart(el.getContext('2d'),{{"
        f'"type":"bar",'
        f'"data":{{"labels":{json.dumps(labels)},'
        f'"datasets":[{{"data":{json.dumps(values)},'
        f'"backgroundColor":{json.dumps(colors)},'
        '"borderWidth":0,"borderRadius":2}]}},'
        '"options":{'
        '"responsive":true,"maintainAspectRatio":false,'
        '"plugins":{'
        '"legend":{"display":false},'
        f'"tooltip":{{"backgroundColor":"{INK}","titleFont":{{"family":"IBM Plex Mono","size":9}},"bodyFont":{{"family":"JetBrains Mono","size":10}},"padding":10}}'
        '},'
        '"scales":{'
        f'"x":{{"grid":{{"display":false}},"ticks":{{"font":{{"family":"IBM Plex Mono","size":8}},"color":"{MUTED}","maxRotation":30}}}},'
        f'"y":{{"grid":{{"color":"rgba(0,0,0,0.04)"}},"ticks":{{"font":{{"family":"JetBrains Mono","size":9}},"color":"{MUTED}"}}}}'
        "}}}})"
    )

    note_html = f'<div class="pulse-chart-note">{note}</div>' if note else ""
    return (
        f"{_CSS_INJECTOR}"
        f'<div class="pulse-chart-block">'
        f'<div class="pulse-chart-title">{title}</div>'
        f'<div style="position:relative;height:{height}px"><canvas id="c_{cid}"></canvas></div>'
        f"{note_html}"
        f"</div>"
        f"{_loader(fn, fn_body)}"
    )


# ---------------------------------------------------------------------------
# HORIZONTAL BAR CHART
# ---------------------------------------------------------------------------

def horizontal_bar(
    title: str,
    labels: list,
    values: list,
    colors: list | None = None,
    note: str | None = None,
) -> str:
    """Horizontal bar chart. Colors auto red/green by sign if not provided."""
    cid = _uid()
    fn  = f"pci_{cid}"
    height = max(160, len(labels) * 34)
    if colors is None:
        colors = _auto_colors(values)

    fn_body = (
        f"var el=document.getElementById('c_{cid}');"
        "if(!el)return;"
        f"new Chart(el.getContext('2d'),{{"
        f'"type":"bar",'
        f'"data":{{"labels":{json.dumps(labels)},'
        f'"datasets":[{{"data":{json.dumps(values)},'
        f'"backgroundColor":{json.dumps(colors)},'
        '"borderWidth":0,"borderRadius":2}]}},'
        '"options":{'
        '"indexAxis":"y",'
        '"responsive":true,"maintainAspectRatio":false,'
        '"plugins":{'
        '"legend":{"display":false},'
        f'"tooltip":{{"backgroundColor":"{INK}","titleFont":{{"family":"IBM Plex Mono","size":9}},"bodyFont":{{"family":"JetBrains Mono","size":10}},"padding":10}}'
        '},'
        '"scales":{'
        f'"x":{{"grid":{{"color":"rgba(0,0,0,0.04)"}},"ticks":{{"font":{{"family":"JetBrains Mono","size":9}},"color":"{MUTED}"}}}},'
        f'"y":{{"grid":{{"display":false}},"ticks":{{"font":{{"family":"IBM Plex Mono","size":9}},"color":"{MUTED}"}}}}'
        "}}}})"
    )

    note_html = f'<div class="pulse-chart-note">{note}</div>' if note else ""
    return (
        f"{_CSS_INJECTOR}"
        f'<div class="pulse-chart-block">'
        f'<div class="pulse-chart-title">{title}</div>'
        f'<div style="position:relative;height:{height}px"><canvas id="c_{cid}"></canvas></div>'
        f"{note_html}"
        f"</div>"
        f"{_loader(fn, fn_body)}"
    )


# ---------------------------------------------------------------------------
# DUAL-AXIS LINE CHART
# ---------------------------------------------------------------------------

def dual_axis_chart(
    title: str,
    labels: list,
    left_dataset: dict,
    right_dataset: dict,
    height: int = 220,
    note: str | None = None,
) -> str:
    """
    Two Y-axes on one chart.

    left_dataset / right_dataset: {"label": str, "data": [float], "color": str (optional)}
    """
    cid = _uid()
    fn  = f"pci_{cid}"
    lc  = left_dataset.get("color", ACCENT)
    rc  = right_dataset.get("color", GREEN)

    fn_body = (
        f"var el=document.getElementById('c_{cid}');"
        "if(!el)return;"
        f"new Chart(el.getContext('2d'),{{"
        '"type":"line",'
        f'"data":{{"labels":{json.dumps(labels)},'
        '"datasets":['
        f'{{"label":{json.dumps(left_dataset["label"])},'
        f'"data":{json.dumps(left_dataset["data"])},'
        f'"borderColor":"{lc}","backgroundColor":"transparent",'
        '"borderWidth":1.5,"pointRadius":0,"tension":0.25,"yAxisID":"yL"}},'
        f'{{"label":{json.dumps(right_dataset["label"])},'
        f'"data":{json.dumps(right_dataset["data"])},'
        f'"borderColor":"{rc}","backgroundColor":"transparent",'
        '"borderWidth":1.5,"pointRadius":0,"tension":0.25,"yAxisID":"yR"}}'
        ']}},'
        '"options":{'
        '"responsive":true,"maintainAspectRatio":false,'
        '"interaction":{"mode":"index","intersect":false},'
        '"plugins":{'
        f'"legend":{{"display":true,"labels":{{"font":{{"family":"IBM Plex Mono","size":9}},"color":"{MUTED}","boxWidth":10,"padding":12}}}},'
        f'"tooltip":{{"backgroundColor":"{INK}","titleFont":{{"family":"IBM Plex Mono","size":9}},"bodyFont":{{"family":"JetBrains Mono","size":10}},"padding":10}}'
        '},'
        '"scales":{'
        f'"x":{{"grid":{{"color":"rgba(0,0,0,0.04)"}},"ticks":{{"font":{{"family":"IBM Plex Mono","size":8}},"color":"{MUTED}","maxTicksLimit":8,"maxRotation":0}}}},'
        f'"yL":{{"position":"left","grid":{{"color":"rgba(0,0,0,0.05)"}},"ticks":{{"font":{{"family":"JetBrains Mono","size":9}},"color":"{lc}"}}}},'
        f'"yR":{{"position":"right","grid":{{"drawOnChartArea":false}},"ticks":{{"font":{{"family":"JetBrains Mono","size":9}},"color":"{rc}"}}}}'
        "}}}})"
    )

    note_html = f'<div class="pulse-chart-note">{note}</div>' if note else ""
    return (
        f"{_CSS_INJECTOR}"
        f'<div class="pulse-chart-block">'
        f'<div class="pulse-chart-title">{title}</div>'
        f'<div style="position:relative;height:{height}px"><canvas id="c_{cid}"></canvas></div>'
        f"{note_html}"
        f"</div>"
        f"{_loader(fn, fn_body)}"
    )


# ---------------------------------------------------------------------------
# DATA TABLE (pure HTML — no canvas, no Chart.js)
# ---------------------------------------------------------------------------

def data_table(
    title: str,
    headers: list,
    rows: list,
    note: str | None = None,
) -> str:
    """
    Static HTML table styled to match the edition.

    rows: list of lists. Each cell can be:
      - a plain value (str/int/float) — rendered as-is
      - a dict {"value": str, "class": "ptd-red|ptd-green|ptd-amber"} — styled cell
    """
    th_html = "".join(f"<th>{h}</th>" for h in headers)
    rows_html = ""
    for row in rows:
        tds = ""
        for cell in row:
            if isinstance(cell, dict):
                cls = cell.get("class", "")
                tds += f'<td class="{cls}">{cell["value"]}</td>'
            else:
                tds += f"<td>{cell}</td>"
        rows_html += f"<tr>{tds}</tr>"

    note_html = f'<div class="pulse-chart-note">{note}</div>' if note else ""
    return (
        f"{_CSS_INJECTOR}"
        f'<div class="pulse-chart-block">'
        f'<div class="pulse-chart-title">{title}</div>'
        f'<div style="overflow-x:auto">'
        f'<table class="pulse-data-table">'
        f"<thead><tr>{th_html}</tr></thead>"
        f"<tbody>{rows_html}</tbody>"
        f"</table></div>"
        f"{note_html}"
        f"</div>"
    )
