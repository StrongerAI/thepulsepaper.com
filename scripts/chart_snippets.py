#!/usr/bin/env python3
"""
scripts/chart_snippets.py
=========================
Library of chart HTML fragments matching The Pulse Paper visual style.

Charts are generated as matplotlib PNG images embedded as base64 data URIs.
No JavaScript or CDN dependencies — renders in any browser including file://.
data_table() returns pure HTML (no matplotlib).

Usage:
  from chart_snippets import line_chart, bar_chart, horizontal_bar, data_table, dual_axis_chart
  html = line_chart("Brent Crude ($/bbl)", labels, [{"label": "Brent", "data": values}])
"""

import base64
import io

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

# Edition palette
CARD_BG = "#fffaf4"
BORDER  = "#d8ccc0"
INK     = "#1a1a1a"
MUTED   = "#7a6a5a"
ACCENT  = "#c0392b"
GREEN   = "#1a6632"
AMBER   = "#b06000"

PALETTE = [ACCENT, GREEN, AMBER, "#1565c0", "#6a1b9a"]

_SHARED_CSS = (
    ".pulse-chart-block{background:#fffaf4;border:1px solid #d8ccc0;"
    "padding:20px 24px;margin:20px 0}"
    ".pulse-chart-title{font-family:'IBM Plex Mono','Courier New',monospace;"
    "font-size:9px;letter-spacing:2px;text-transform:uppercase;"
    "color:#7a6a5a;margin-bottom:14px;font-weight:500}"
    ".pulse-chart-note{font-family:'IBM Plex Mono','Courier New',monospace;"
    "font-size:8.5px;color:#7a6a5a;margin-top:10px;opacity:.8}"
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

# Inline <style> block — safe to repeat, CSS is idempotent
_CSS_INJECTOR = f"<style>{_SHARED_CSS}</style>"

# Matplotlib global defaults
plt.rcParams.update({
    "font.family":       "monospace",
    "font.size":         8,
    "text.color":        INK,
    "figure.facecolor":  CARD_BG,
    "axes.facecolor":    CARD_BG,
    "savefig.facecolor": CARD_BG,
})


# ---------------------------------------------------------------------------
# INTERNAL HELPERS
# ---------------------------------------------------------------------------

def _setup_ax(ax, x_grid: bool = False):
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(BORDER)
    ax.spines["bottom"].set_color(BORDER)
    ax.tick_params(colors=MUTED, labelsize=7, length=3)
    ax.grid(axis="y", color=BORDER, linewidth=0.5, alpha=0.8)
    if x_grid:
        ax.grid(axis="x", color=BORDER, linewidth=0.5, alpha=0.8)
    ax.set_axisbelow(True)


def _fig_to_html(fig, title: str, note: str | None) -> str:
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=130, bbox_inches="tight",
                facecolor=CARD_BG, edgecolor="none")
    buf.seek(0)
    b64 = base64.b64encode(buf.read()).decode("utf-8")
    plt.close(fig)
    note_html = f'<div class="pulse-chart-note">{note}</div>' if note else ""
    return (
        f"{_CSS_INJECTOR}"
        f'<div class="pulse-chart-block">'
        f'<div class="pulse-chart-title">{title}</div>'
        f'<img src="data:image/png;base64,{b64}" style="width:100%;display:block">'
        f"{note_html}"
        f"</div>"
    )


def _xticks(labels: list, max_ticks: int = 8) -> tuple[list, list]:
    n = len(labels)
    if n <= max_ticks:
        return list(range(n)), labels
    step = max(1, n // max_ticks)
    idxs = list(range(0, n, step))
    return idxs, [labels[i] for i in idxs]


def _auto_colors(values: list) -> list:
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

    datasets: [{"label": str, "data": [float], "color": str (optional)}]
    """
    fig_h = max(2.2, height / 96)
    fig, ax = plt.subplots(figsize=(8, fig_h))
    _setup_ax(ax)

    for i, ds in enumerate(datasets):
        color = ds.get("color") or PALETTE[i % len(PALETTE)]
        x = list(range(len(ds["data"])))
        y = ds["data"]
        ax.plot(x, y, color=color, linewidth=1.5, label=ds.get("label", ""))
        if fill:
            ax.fill_between(x, y, alpha=0.10, color=color)

    idxs, lbs = _xticks(labels)
    ax.set_xticks(idxs)
    ax.set_xticklabels(lbs, rotation=0, ha="center", fontsize=7, color=MUTED)
    ax.tick_params(axis="y", labelsize=7, labelcolor=MUTED)
    ax.set_xlim(-0.5, len(labels) - 0.5)

    if len(datasets) > 1:
        ax.legend(fontsize=7, framealpha=0.9, facecolor=CARD_BG,
                  edgecolor=BORDER, loc="best")

    plt.tight_layout(pad=0.4)
    return _fig_to_html(fig, title, note)


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
    if colors is None:
        colors = _auto_colors(values)

    fig_h = max(2.0, height / 96)
    fig, ax = plt.subplots(figsize=(8, fig_h))
    _setup_ax(ax)

    x = list(range(len(labels)))
    ax.bar(x, values, color=colors, width=0.6, edgecolor="none")
    ax.axhline(0, color=BORDER, linewidth=0.8)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, rotation=20, ha="right", fontsize=7, color=MUTED)
    ax.tick_params(axis="y", labelsize=7, labelcolor=MUTED)

    plt.tight_layout(pad=0.4)
    return _fig_to_html(fig, title, note)


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
    if colors is None:
        colors = _auto_colors(values)

    fig_h = max(1.8, len(labels) * 0.40)
    fig, ax = plt.subplots(figsize=(8, fig_h))
    _setup_ax(ax, x_grid=True)
    ax.grid(axis="y", visible=False)

    y = list(range(len(labels)))
    ax.barh(y, values, color=colors, height=0.55, edgecolor="none")
    ax.axvline(0, color=BORDER, linewidth=0.8)
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=7, color=MUTED)
    ax.tick_params(axis="x", labelsize=7, labelcolor=MUTED)
    ax.invert_yaxis()

    plt.tight_layout(pad=0.4)
    return _fig_to_html(fig, title, note)


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
    """Two Y-axes on one chart."""
    lc = left_dataset.get("color", ACCENT)
    rc = right_dataset.get("color", GREEN)

    fig_h = max(2.4, height / 96)
    fig, ax1 = plt.subplots(figsize=(8, fig_h))
    _setup_ax(ax1)

    x = list(range(len(labels)))
    ax1.plot(x, left_dataset["data"], color=lc, linewidth=1.5,
             label=left_dataset.get("label", ""))
    ax1.tick_params(axis="y", labelcolor=lc, labelsize=7)
    ax1.spines["left"].set_color(lc)

    ax2 = ax1.twinx()
    ax2.plot(x, right_dataset["data"], color=rc, linewidth=1.5,
             label=right_dataset.get("label", ""))
    ax2.tick_params(axis="y", labelcolor=rc, labelsize=7)
    ax2.spines["right"].set_color(rc)
    ax2.spines["top"].set_visible(False)
    ax2.set_facecolor(CARD_BG)

    idxs, lbs = _xticks(labels)
    ax1.set_xticks(idxs)
    ax1.set_xticklabels(lbs, rotation=0, ha="center", fontsize=7, color=MUTED)
    ax1.set_xlim(-0.5, len(labels) - 0.5)

    lines1, labs1 = ax1.get_legend_handles_labels()
    lines2, labs2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labs1 + labs2, fontsize=7,
               framealpha=0.9, facecolor=CARD_BG, edgecolor=BORDER, loc="best")

    plt.tight_layout(pad=0.4)
    return _fig_to_html(fig, title, note)


# ---------------------------------------------------------------------------
# DATA TABLE (pure HTML — no matplotlib)
# ---------------------------------------------------------------------------

def data_table(
    title: str,
    headers: list,
    rows: list,
    note: str | None = None,
) -> str:
    """
    Static HTML table styled to match the edition.

    Each cell can be a plain value or {"value": str, "class": "ptd-red|ptd-green|ptd-amber"}.
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
