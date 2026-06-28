#!/usr/bin/env python3
"""
scripts/draft_edition.py
========================
Generates a draft weekly edition HTML using the Claude API.

The template HTML is split into three parts:
  - shell_head  : <head> block + dot-trail nav  (copied verbatim, title updated)
  - content     : TOC + heatmap + 10 sections   (Claude generates, two calls)
  - shell_foot  : <footer> onwards               (copied verbatim)

Two Claude calls keep output well within token limits:
  Call A → TOC labels + heatmap + sections 01–05
  Call B → sections 06–10

Prerequisites:
  1. Run gather_weekly.py and fill in all FILL_ME fields in the JSON
  2. Create .env in repo root with ANTHROPIC_API_KEY=sk-ant-...

Usage:
  python3 scripts/draft_edition.py                         # most recent data
  python3 scripts/draft_edition.py 2026-06-21              # specific date
  python3 scripts/draft_edition.py --model claude-opus-4-8 # use Opus
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import anthropic

REPO_ROOT     = Path(__file__).resolve().parent.parent
SCRIPTS_DIR   = Path(__file__).resolve().parent
DRAFTS_DIR    = SCRIPTS_DIR / "weekly_drafts"
EDITIONS_DIR  = REPO_ROOT / "public" / "editions"
STYLE_PROMPT  = SCRIPTS_DIR / "style_prompt.md"
HISTORICAL    = SCRIPTS_DIR / "historical_data.json"
DEFAULT_MODEL = "claude-sonnet-4-6"
PKT           = ZoneInfo("Asia/Karachi")

# Markers used to split the template HTML into shell / content / footer
# Content starts at the ticker (after </header>), not at the TOC —
# so The Take, ticker, TOC, and heatmap are all regenerated every edition.
CONTENT_MARKER = "<!-- TICKER -->"
FOOTER_MARKER  = "<footer"
S06_MARKER     = '<section class="section" id="s06">'


# ---------------------------------------------------------------------------
# UTILITIES
# ---------------------------------------------------------------------------

def load_dotenv():
    env_path = REPO_ROOT / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def find_data_file(date_slug: str | None) -> Path:
    if date_slug:
        p = DRAFTS_DIR / f"weekly_data_{date_slug}.json"
        if not p.exists():
            sys.exit(f"Error: {p} not found. Run gather_weekly.py first.")
        return p
    files = sorted(DRAFTS_DIR.glob("weekly_data_*.json"))
    if not files:
        sys.exit("Error: no weekly_data_*.json found. Run gather_weekly.py first.")
    return files[-1]


def find_template() -> Path:
    editions = sorted(EDITIONS_DIR.glob("*.html"))
    if not editions:
        sys.exit(f"Error: no edition HTML files found in {EDITIONS_DIR}")
    return editions[-1]


def check_fill_me(data: dict) -> list[str]:
    return [k for k, v in data.get("manual", {}).items()
            if isinstance(v, str) and v.startswith("FILL_ME")]


def _parse_num(val) -> float | None:
    try:
        return float(str(val).replace(",", "").replace("%", "").replace("$", "").split()[0])
    except Exception:
        return None


def accumulate_history(data: dict) -> None:
    """Append this week's filled manual fields to historical_data.json."""
    manual    = data.get("manual", {})
    date_slug = data.get("date_slug", "")
    if not date_slug:
        return
    if check_fill_me(data):
        print("  ⚠  Skipping history accumulation — unfilled FILL_ME fields remain")
        return

    history: dict = {}
    if HISTORICAL.exists():
        try:
            history = json.loads(HISTORICAL.read_text(encoding="utf-8"))
        except Exception:
            pass

    history[date_slug] = {
        "sbp_reserves":  _parse_num(manual.get("SBP forex reserves, gross ($bn)", "")),
        "policy_rate":   _parse_num(manual.get("SBP policy rate (%)", "")),
        "tbill_3m":      _parse_num(manual.get("T-bill 3M cut-off yield (%)", "")),
        "tbill_6m":      _parse_num(manual.get("T-bill 6M cut-off yield (%)", "")),
        "tbill_12m":     _parse_num(manual.get("T-bill 12M cut-off yield (%)", "")),
        "pib_2y":        _parse_num(manual.get("PIB 2Y cut-off yield (%)", "")),
        "pib_3y":        _parse_num(manual.get("PIB 3Y cut-off yield (%)", "")),
        "fbr_ytd":       _parse_num(manual.get("FBR revenue YTD (Rs bn)", "")),
        "fbr_target":    _parse_num(manual.get("FBR revenue YTD target (Rs bn)", "")),
        "spi_yoy":       _parse_num(manual.get("SPI latest YoY (%)", "")),
        "cpi_yoy":       _parse_num(manual.get("CPI latest YoY (%)", "")),
        "petrol":        _parse_num(manual.get("Petrol (MS) price (Rs/L)", "")),
        "diesel":        _parse_num(manual.get("Diesel (HSD) price (Rs/L)", "")),
        "tarbela":       _parse_num(manual.get("Tarbela live storage (MAF)", "")),
        "mangla":        _parse_num(manual.get("Mangla live storage (MAF)", "")),
        "brent_dubai":   _parse_num(manual.get("Dubai Platts ($/bbl)", "")),
        "cpo":           _parse_num(manual.get("CPO price (MYR/MT)", "")),
        "wheat":         _parse_num(manual.get("Wheat (international, $/MT)", "")),
    }

    HISTORICAL.write_text(json.dumps(history, indent=2), encoding="utf-8")
    print(f"  ✓  historical_data.json updated ({len(history)} week(s) on record)")


# ---------------------------------------------------------------------------
# TEMPLATE SPLITTER
# ---------------------------------------------------------------------------

def split_template(html: str) -> tuple[str, str, str, str]:
    """Split edition HTML into four pieces:
      shell_head  — CSS, fonts, masthead (everything before <!-- TICKER -->)
      content_a   — ticker + The Take + TOC + heatmap + s01-s05
      content_b   — s06 through s10 (action items)
      shell_foot  — <footer> onwards
    The ticker, The Take, TOC, and heatmap are inside content_a so they
    get regenerated every edition instead of being copied from the template.
    """
    content_pos = html.find(CONTENT_MARKER)
    footer_pos  = html.find(FOOTER_MARKER)
    s06_pos     = html.find(S06_MARKER)

    if content_pos == -1:
        sys.exit("Error: could not find <!-- TICKER --> marker in template.")
    if footer_pos == -1:
        sys.exit("Error: could not find footer marker in template.")
    if s06_pos == -1:
        sys.exit("Error: could not find section 06 marker in template.")

    shell_head  = html[:content_pos]
    content_a   = html[content_pos:s06_pos]
    content_b   = html[s06_pos:footer_pos]
    shell_foot  = html[footer_pos:]

    return shell_head, content_a, content_b, shell_foot


def _week_of_range(ed_date: str) -> str:
    """Given an edition date like '21 June 2026', return 'Week of 22–28 June 2026'."""
    from datetime import timedelta
    for fmt in ("%d %B %Y", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(ed_date, fmt)
            break
        except ValueError:
            continue
    else:
        return f"Week of {ed_date}"
    mon = dt + timedelta(days=(7 - dt.weekday()) % 7 or 7)
    if mon.weekday() != 0:
        mon = dt + timedelta(days=1)
    sun = mon + timedelta(days=6)
    if mon.month == sun.month:
        return f"Week of {mon.day}&ndash;{sun.day} {mon.strftime('%B %Y')}"
    return f"Week of {mon.day} {mon.strftime('%B')}&ndash;{sun.day} {sun.strftime('%B %Y')}"


def update_shell_head(shell_head: str, edition_n: str, ed_date: str, title_phrase: str) -> str:
    """Update edition-specific fields in the shell (head + masthead)."""
    shell_head = re.sub(
        r"<title>[^<]+</title>",
        f"<title>{edition_n} | The Pulse Paper</title>",
        shell_head,
    )
    shell_head = re.sub(
        r'<meta name="description" content="[^"]*"',
        f'<meta name="description" content="{title_phrase} | The Pulse Paper weekly economic intelligence for Pakistan."',
        shell_head,
    )
    # Update masthead meta: edition, week-of, published date
    shell_head = re.sub(
        r'<span>Edition \d+\s*&middot;\s*Vol\.\s*\d+</span>',
        f'<span>{edition_n} &middot; Vol. 1</span>',
        shell_head,
    )
    week_range = _week_of_range(ed_date)
    shell_head = re.sub(
        r'<span>Week of [^<]+</span>',
        f'<span>{week_range}</span>',
        shell_head,
    )
    shell_head = re.sub(
        r'<span>Published: [^<]+</span>',
        f'<span>Published: {ed_date}</span>',
        shell_head,
    )
    return shell_head


def update_shell_foot(shell_foot: str, edition_n: str, ed_date: str) -> str:
    """Update the footer edition line."""
    week_range = _week_of_range(ed_date)
    shell_foot = re.sub(
        r'The Pulse\s*&middot;\s*Edition \d+\s*&middot;\s*Week of [^<]+',
        f'The Pulse &middot; {edition_n} &middot; {week_range}',
        shell_foot,
    )
    return shell_foot


# ---------------------------------------------------------------------------
# DATA FORMATTERS
# ---------------------------------------------------------------------------

def fmt_markets(data: dict) -> str:
    lines = ["MARKET DATA (auto-fetched, verify before publishing):"]
    for name, d in data.get("markets", {}).items():
        if d:
            close = d["close"]
            prev  = d.get("prev_close")
            if prev and prev != 0:
                pct  = ((close - prev) / prev) * 100
                sign = "+" if pct > 0 else ""
                chg  = f"{sign}{pct:.2f}%"
            else:
                chg = "n/a"
            lines.append(f"  {name}: {close:.6g}  ({chg} vs prev session, {d['date']})")
        else:
            lines.append(f"  {name}: STALE")
    return "\n".join(lines)


def fmt_psx(data: dict) -> str:
    psx = data.get("psx", {})
    if not psx:
        return "PSX INDICES: not available"
    lines = ["PSX INDICES (verify against dps.psx.com.pk):"]
    for name in ["KSE100", "KSE30", "KMI30", "ALLSHR", "BKTI", "OGTI", "ACI"]:
        if name in psx:
            d = psx[name]
            lines.append(f"  {name}: {d['current']}  {d['change']} ({d['change_pct']})  H:{d['high']} L:{d['low']}")
    return "\n".join(lines)


def fmt_manual(data: dict) -> str:
    lines = ["EDITOR-FILLED DATA:"]
    for k, v in data.get("manual", {}).items():
        lines.append(f"  {k}: {v}")
    return "\n".join(lines)


def fmt_prior_edition(data: dict) -> str:
    prior = data.get("prior_edition", {})
    if not prior:
        return "PRIOR EDITION DATA: not available (first edition or unfilled prior data)"
    lines = [f"PRIOR EDITION DATA ({prior.get('edition', '?')}, {prior.get('date_slug', '?')}):"]
    lines.append("Use these exact values as the 'prev' column in the dashboard. Do not guess or use template values.")
    prev_manual = prior.get("manual", {})
    for k, v in prev_manual.items():
        lines.append(f"  {k}: {v}")
    prev_markets = prior.get("markets", {})
    if prev_markets:
        lines.append("\n  Prior market closes:")
        for k, v in prev_markets.items():
            lines.append(f"    {k}: {v.get('close', 'n/a')}")
    return "\n".join(lines)


def fmt_news(data: dict, max_per_theme: int = 5) -> str:
    lines = ["NEWS BY THEME (pick the stories that matter for this edition):"]
    for theme, items in data.get("news_by_theme", {}).items():
        if not items or theme == "Unsorted":
            continue
        lines.append(f"\n{theme}:")
        seen, count = set(), 0
        for it in items:
            t = it.get("title", "").strip()
            if t in seen or not t:
                continue
            seen.add(t)
            lines.append(f"  - {t}  [{it.get('source', '')}]")
            count += 1
            if count >= max_per_theme:
                break
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLAUDE CALLER
# ---------------------------------------------------------------------------

def call_claude(client, model: str, system: str, prompt: str, label: str) -> str:
    print(f"  {label} ", end="", flush=True)
    chunks = []
    with client.messages.stream(
        model=model,
        max_tokens=16000,
        system=system,
        messages=[{"role": "user", "content": prompt}],
    ) as stream:
        for i, chunk in enumerate(stream.text_stream):
            chunks.append(chunk)
            if i % 80 == 0:
                print(".", end="", flush=True)
    text = "".join(chunks)
    print(f" {len(text):,} chars")
    return text


def strip_code_fence(text: str) -> str:
    """Remove markdown code fences if the model wrapped the output."""
    if "```html" in text:
        start = text.find("```html") + 7
        end   = text.rfind("```")
        if end > start:
            return text[start:end].strip()
    if text.strip().startswith("```"):
        text = text.strip()[3:]
        if text.endswith("```"):
            text = text[:-3]
        return text.strip()
    return text


# ---------------------------------------------------------------------------
# PROMPTS
# ---------------------------------------------------------------------------

def prompt_call_a(data: dict, template_a: str, edition_n: str, ed_date: str, theme: str) -> str:
    return f"""Generate the first half of {edition_n} of The Pulse Paper, dated {ed_date}.
Through-line this week: {theme}

EDITORIAL DIRECTION:
- Anchor to the previous edition where relevant: compare this week's data to last edition's
  figures to show movement and build reader continuity across editions.
- Go deep on analysis. Do not skim surfaces. Each section should have a clear analytical
  thesis, not just data recitation. State what happened, why it matters for the reader's
  business, and what the second-order consequence is.
- The 10 sections are FIXED in this order and must not be reordered or omitted:
  01 PKR & Macro Pulse, 02 Oil Markets & Energy, 03 Economic Watchout (Budget/Fiscal),
  04 Commodity Watch, 05 Logistics & Ports, 06 Regulatory & Policy,
  07 Weather & Agriculture, 08 Political & Disruption Risk, 09 Global Signals,
  10 (Action Items, in Call B).

VERIFICATION RULES — CRITICAL:
- NEVER fabricate dates, election schedules, policy actions, rate history, or statistics
  not present in the provided data. If the data does not contain a figure, write
  <!-- EDITOR: verify [specific claim] --> instead of inventing one.
- When describing SBP rate history (hikes, cuts, holds), use ONLY the facts in the
  manual fields. Do not infer a rate path from memory.
- If a news article reports crop damage, flood casualties, or similar claims, verify
  the claim is physically possible for the CURRENT calendar date. Crop losses require
  a standing crop — check the agricultural calendar (Kharif sowing: Jun-Jul;
  Kharif harvest: Oct-Nov; Rabi sowing: Nov-Dec; Rabi harvest: Apr-May).
  If an article's figures are from a previous year, do NOT present them as current.
- Check the date_parsed field on news items. If it's more than 14 days old, treat
  the data as historical context, not this week's news.
- For the dashboard "prev" column, use ONLY the figures from PRIOR EDITION DATA below.
  Do not guess baselines from the template HTML.

{fmt_prior_edition(data)}

{fmt_manual(data)}

{fmt_markets(data)}

{fmt_psx(data)}

{fmt_news(data)}

---

TEMPLATE STRUCTURE (previous edition, sections 01–05 plus TOC and heatmap):
Use this as your exact HTML structure — same CSS classes, same data-card layout, same callout-box pattern. Replace ALL content with fresh data and analysis for this edition. Do not reuse any prose or figures from the template.

Where data is FILL_ME, insert an HTML comment: <!-- EDITOR: fill in [field] -->

{template_a}

---

DASHBOARD RULES — the heatmap has two tiers:

TIER 1 — ANCHOR INDICATORS (always present, every edition, in this order):
  Brent Crude, Dubai Platts, WTI Crude, USD/PKR (interbank), Petrol (MS),
  HSD Diesel, SPI (YoY), CPI (YoY), SBP Policy Rate, KSE-100,
  SBP Reserves, Total FX Reserves, Crude Palm Oil
Format: 4-column grid (label, prev edition value, current value, WoW change).
Use hm-red/hm-amber/hm-green/hm-neutral classes for directional colour coding.
The WoW Change column MUST be short — max 10 characters (e.g. "&minus;$12",
"+0.8pp", "Flat", "&minus;Rs 74", "+$100M"). Never add commentary or context
to the change cell — it must fit on one line without wrapping.

TIER 2 — THIS WEEK'S WATCH (rotating, story-driven, 4–8 items):
Add indicators that matter this week but are not permanent anchors
(e.g. T-bill yields, FBR shortfall, wheat, geopolitical events, floods, kerosene).
Format: below the grid, separated by a dashed border-top with the label
"This week's watch" in IBM Plex Mono 8px uppercase. Single-column list with
a 2px left border in var(--border). Each item is one line:
  <span> with IBM Plex Mono 11px 600-weight muted label </span>
  followed by the value and a short editorial context note in 13px body text.
NO colour coding on Tier 2 items — they are informational, not directional.

MASTHEAD: Update the edition number, "Week of" date range, and "Published" date
to match this edition. Also update the footer edition line.

Generate the following HTML fragment for {edition_n} ({ed_date}):
1. <!-- TICKER --> block — a scrolling ticker strip with this week's key numbers
   (same HTML structure as the template: <div class="ticker"><div class="ticker-inner"><span>...</span>...
   duplicated once for seamless scroll). Use CURRENT data, not last edition's.
2. <!-- THE TAKE --> block — "The Take, {edition_n}: [one-sentence editorial thesis]"
   followed by 2–3 paragraphs of executive summary. This is the FIRST thing the reader sees
   after the masthead. It must reflect THIS edition's data and through-line, not the previous edition's.
3. <nav class="toc"> ... </nav>  — section short-titles matching this edition's headings
4. The heatmap <div class="container"> block — following the DASHBOARD RULES above
5. The opening <div class="container"> and sections s01 through s05 (complete <section> elements)

Output raw HTML only. No markdown, no explanation, no code fences.
"""


def prompt_call_b(data: dict, template_b: str, edition_n: str, ed_date: str, theme: str) -> str:
    return f"""Generate the second half of {edition_n} of The Pulse Paper, dated {ed_date}.
Through-line this week: {theme}

EDITORIAL DIRECTION:
- Anchor to the previous edition where relevant: compare this week's data to last edition's
  figures to show movement and build reader continuity.
- Go deep on analysis — each section needs a clear analytical thesis, second-order
  consequences, and specific implications for the reader's business.
- Sections are FIXED: 06 Regulatory & Policy, 07 Weather & Agriculture,
  08 Political & Disruption Risk, 09 Global Signals, 10 Action Items.

VERIFICATION RULES — CRITICAL:
- NEVER fabricate dates, election schedules, policy actions, or statistics not in the data.
  Use <!-- EDITOR: verify [claim] --> for anything uncertain.
- Crop damage claims must be physically possible for the current season (Kharif sowing
  Jun-Jul, harvest Oct-Nov). Do not present prior-year flood data as current.
- Check date_parsed on news items — if older than 14 days, treat as historical context.
- For SBP rate history, use ONLY the facts in the manual fields.

{fmt_prior_edition(data)}

{fmt_manual(data)}

{fmt_markets(data)}

{fmt_news(data)}

---

TEMPLATE STRUCTURE (previous edition, sections 06–10):
Use this as your exact HTML structure. Replace ALL content with fresh data and analysis.

{template_b}

---

Generate the following HTML fragment for {edition_n} ({ed_date}):
Sections s06 through s10 (complete <section> elements) — matching the template structure exactly.
Section 10 is "The Week Ahead: Action Items" — include prioritised action items with red/amber/green urgency markers.
End with the closing </div> that closes the container opened before section 01.

Output raw HTML only. No markdown, no explanation, no code fences.
"""


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate a draft Pulse Paper edition")
    parser.add_argument("date", nargs="?", help="Date slug e.g. 2026-06-21")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    args = parser.parse_args()

    load_dotenv()
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit(
            "Error: ANTHROPIC_API_KEY not set.\n"
            "Create a .env file in the repo root:\n"
            "  echo 'ANTHROPIC_API_KEY=sk-ant-...' > .env"
        )

    data_path     = find_data_file(args.date)
    template_path = find_template()
    style_text    = STYLE_PROMPT.read_text(encoding="utf-8") if STYLE_PROMPT.exists() else ""

    data          = json.loads(data_path.read_text(encoding="utf-8"))
    template_html = template_path.read_text(encoding="utf-8")

    print(f"=== Pulse Draft Generator ===")
    print(f"  Data:      {data_path.name}")
    print(f"  Template:  {template_path.name}")
    print(f"  Model:     {args.model}")

    # Warn on unfilled fields
    unfilled = check_fill_me(data)
    if unfilled:
        print(f"\n⚠  {len(unfilled)} field(s) still marked FILL_ME:")
        for f in unfilled:
            print(f"     - {f}")
        resp = input("\nProceed anyway? [y/N] ").strip().lower()
        if resp != "y":
            sys.exit("Aborted.")

    manual     = data.get("manual", {})
    edition_n  = manual.get("Edition number", "Edition No. ?")
    ed_date    = manual.get("Edition date", data.get("date_slug", ""))
    theme      = manual.get("Edition theme / through-line", "")

    # Accumulate historical data (used by render_charts.py for trend charts)
    print(f"\n  Accumulating historical data...")
    accumulate_history(data)

    # Split template
    shell_head, template_a, template_b, shell_foot = split_template(template_html)
    shell_head = update_shell_head(shell_head, edition_n, ed_date, theme or edition_n)
    shell_foot = update_shell_foot(shell_foot, edition_n, ed_date)

    print(f"\n  Shell head: {len(shell_head):,} chars")
    print(f"  Template A (ticker+take+TOC+heatmap+s01-05): {len(template_a):,} chars")
    print(f"  Template B (s06-10): {len(template_b):,} chars")
    print(f"  Shell foot: {len(shell_foot):,} chars")

    client = anthropic.Anthropic(api_key=api_key)

    print(f"\n  Generating content (2 API calls)...")

    part_a = strip_code_fence(call_claude(
        client, args.model, style_text,
        prompt_call_a(data, template_a, edition_n, ed_date, theme),
        "Call A (ticker+take+TOC+heatmap+s01-05):"
    ))

    part_b = strip_code_fence(call_claude(
        client, args.model, style_text,
        prompt_call_b(data, template_b, edition_n, ed_date, theme),
        "Call B (s06-10 + action items): "
    ))

    # Standardized methodology block (replaces AI-generated version)
    std_methodology = (
        '<div class="methodology">\n'
        '  <strong>Methodology</strong>\n'
        '  The Pulse synthesises official releases, market data, commodity benchmarks, '
        'regulatory updates, trade reporting, and independent editorial analysis. '
        'Material numerical claims are cross-checked against primary sources before '
        'publication. Forward-looking statements represent scenarios for planning '
        'purposes, not predictions. Indicators marked (est.) carry forward the prior '
        "edition's value pending fresh data.\n"
        '</div>'
    )

    # Stitch
    combined_content = part_a + "\n" + part_b

    # Replace any AI-generated methodology with standardized version
    combined_content = re.sub(
        r'<div class="methodology">.*?</div>',
        std_methodology,
        combined_content,
        flags=re.DOTALL,
    )

    draft_html = shell_head + combined_content + "\n" + shell_foot

    date_slug   = data.get("date_slug", datetime.now(PKT).strftime("%Y-%m-%d"))
    output_path = DRAFTS_DIR / f"draft-{date_slug}.html"
    output_path.write_text(draft_html, encoding="utf-8")

    total = len(shell_head) + len(part_a) + len(part_b) + len(shell_foot)
    print(f"\n  Total: {total:,} chars")
    print(f"  ✓  {output_path}")
    print(f"\nNext steps:")
    print(f"  1. Open the draft in your browser and review")
    print(f"  2. Iterate on any section here until satisfied")
    print(f"  3. To publish:")
    print(f"       cp '{output_path}' '{EDITIONS_DIR / f'{date_slug}.html'}'")
    print(f"     Then update src/data/editions.js and commit.")


if __name__ == "__main__":
    main()
