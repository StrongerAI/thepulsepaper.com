#!/usr/bin/env python3
"""
scripts/draft_edition.py
========================
Generates a draft weekly edition HTML using the Claude API.

Prerequisites:
  1. Run gather_weekly.py
  2. Open scripts/weekly_drafts/weekly_brief_YYYY-MM-DD.md
     and fill in every FILL_ME field in weekly_data_YYYY-MM-DD.json
  3. Set ANTHROPIC_API_KEY in your environment

Usage:
  python3 scripts/draft_edition.py                         # most recent data file
  python3 scripts/draft_edition.py 2026-06-21              # specific date
  python3 scripts/draft_edition.py --model claude-opus-4-8 # use Opus (slower, costlier)

Output:
  scripts/weekly_drafts/draft-YYYY-MM-DD.html
  Open this file in a browser to review, then iterate here until ready to publish.
"""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import anthropic

REPO_ROOT    = Path(__file__).resolve().parent.parent
SCRIPTS_DIR  = Path(__file__).resolve().parent
DRAFTS_DIR   = SCRIPTS_DIR / "weekly_drafts"
EDITIONS_DIR = REPO_ROOT / "public" / "editions"
STYLE_PROMPT = SCRIPTS_DIR / "style_prompt.md"

DEFAULT_MODEL = "claude-sonnet-4-6"
PKT = ZoneInfo("Asia/Karachi")


# ---------------------------------------------------------------------------
# HELPERS
# ---------------------------------------------------------------------------

def find_data_file(date_slug: str | None) -> Path:
    if date_slug:
        p = DRAFTS_DIR / f"weekly_data_{date_slug}.json"
        if not p.exists():
            sys.exit(f"Error: {p} not found. Run gather_weekly.py first.")
        return p
    # Find most recent
    files = sorted(DRAFTS_DIR.glob("weekly_data_*.json"))
    if not files:
        sys.exit("Error: no weekly_data_*.json found in scripts/weekly_drafts/. Run gather_weekly.py first.")
    return files[-1]


def find_template_html() -> Path:
    editions = sorted(EDITIONS_DIR.glob("*.html"))
    if not editions:
        sys.exit(f"Error: no edition HTML files found in {EDITIONS_DIR}")
    return editions[-1]


def check_fill_me(data: dict) -> list[str]:
    """Return a list of fields still marked FILL_ME."""
    unfilled = []
    for k, v in data.get("manual", {}).items():
        if isinstance(v, str) and v.startswith("FILL_ME"):
            unfilled.append(k)
    return unfilled


def fmt_markets(data: dict) -> str:
    lines = ["MARKET DATA (auto-fetched via yfinance — verify before publishing):"]
    for name, d in data.get("markets", {}).items():
        if d:
            close = d["close"]
            prev  = d.get("prev_close")
            if prev and prev != 0:
                pct = ((close - prev) / prev) * 100
                sign = "+" if pct > 0 else ""
                change = f"{sign}{pct:.2f}% vs prev session"
            else:
                change = "no prev close"
            lines.append(f"  {name}: {close:.6g}  ({change}, as of {d['date']})")
        else:
            lines.append(f"  {name}: STALE — fetch failed")
    return "\n".join(lines)


def fmt_psx(data: dict) -> str:
    psx = data.get("psx", {})
    if not psx:
        return "PSX INDICES: not available"
    lines = ["PSX INDICES (scraped from dps.psx.com.pk — verify before publishing):"]
    priority = ["KSE100", "KSE30", "KMI30", "ALLSHR", "BKTI", "OGTI", "ACI", "KMIALLSHR"]
    for name in priority:
        if name in psx:
            d = psx[name]
            lines.append(f"  {name}: {d['current']}  {d['change']} ({d['change_pct']})  H:{d['high']} L:{d['low']}")
    return "\n".join(lines)


def fmt_news(data: dict, max_per_theme: int = 6) -> str:
    lines = ["NEWS BY THEME (curated from RSS + Google News — pick the stories that matter):"]
    for theme, items in data.get("news_by_theme", {}).items():
        if not items or theme == "Unsorted":
            continue
        lines.append(f"\n{theme}:")
        seen = set()
        count = 0
        for it in items:
            title = it.get("title", "").strip()
            if title in seen or not title:
                continue
            seen.add(title)
            src = it.get("source", "")
            lines.append(f"  - {title}  [{src}]")
            count += 1
            if count >= max_per_theme:
                break
    return "\n".join(lines)


def fmt_manual(data: dict) -> str:
    lines = ["EDITOR-FILLED DATA:"]
    for k, v in data.get("manual", {}).items():
        lines.append(f"  {k}: {v}")
    return "\n".join(lines)


def build_user_prompt(data: dict, template_html: str, template_name: str) -> str:
    run_date  = data.get("run_date", "unknown")
    manual    = data.get("manual", {})
    edition_n = manual.get("Edition number", "FILL_ME")
    ed_date   = manual.get("Edition date", data.get("date_slug", ""))
    theme     = manual.get("Edition theme / through-line", "")

    return f"""You are generating a new weekly edition of The Pulse Paper.

EDITION: {edition_n}
DATE: {ed_date}
THROUGH-LINE: {theme}
DATA GATHERED: {run_date}

---

{fmt_manual(data)}

---

{fmt_markets(data)}

---

{fmt_psx(data)}

---

{fmt_news(data)}

---

STRUCTURAL TEMPLATE:
The following is the previous edition HTML ({template_name}). Use it as your exact structural and visual template — same HTML skeleton, same CSS classes, same section order (01 PKR & Macro, 02 Oil & Energy, 03 Economic Watchout, 04 Commodity Watch, 05 Logistics & Ports, 06 Regulatory & Policy, 07 Weather & Agriculture, 08 Political & Disruption Risk, 09 Global Supply Chain Signals, 10 Action Items), same callout box structure, same data card layout. Replace ALL content with new data and analysis for this edition. Do not reuse any prose, figures, or analysis from the template — it is there only to show you the HTML structure.

Where the editor has left a field as FILL_ME, insert a clearly visible HTML comment placeholder: <!-- EDITOR: fill in [field name] here --> so it is easy to find and complete.

{template_html}

---

Now generate the complete HTML for {edition_n} ({ed_date}). Follow the template structure exactly. Write all prose in The Pulse Paper style as defined in your system prompt. Produce a complete, self-contained HTML file ready to open in a browser.
"""


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Generate a draft Pulse Paper edition")
    parser.add_argument("date", nargs="?", help="Date slug e.g. 2026-06-21 (default: most recent)")
    parser.add_argument("--model", default=DEFAULT_MODEL, help=f"Claude model (default: {DEFAULT_MODEL})")
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit(
            "Error: ANTHROPIC_API_KEY not set.\n"
            "Export it first:  export ANTHROPIC_API_KEY=sk-ant-..."
        )

    # Load files
    data_path    = find_data_file(args.date)
    template_path = find_template_html()
    style_path   = STYLE_PROMPT

    print(f"=== Pulse Draft Generator ===")
    print(f"  Data file:  {data_path.name}")
    print(f"  Template:   {template_path.name}")
    print(f"  Model:      {args.model}")

    data         = json.loads(data_path.read_text(encoding="utf-8"))
    template_html = template_path.read_text(encoding="utf-8")
    style_prompt = style_path.read_text(encoding="utf-8") if style_path.exists() else ""

    # Warn on unfilled fields
    unfilled = check_fill_me(data)
    if unfilled:
        print(f"\n⚠  {len(unfilled)} field(s) still marked FILL_ME:")
        for f in unfilled:
            print(f"     - {f}")
        resp = input("\nProceed anyway? Placeholders will appear in the draft. [y/N] ").strip().lower()
        if resp != "y":
            sys.exit("Aborted. Fill in the fields and re-run.")

    user_prompt = build_user_prompt(data, template_html, template_path.stem)

    # Estimate token count roughly (4 chars ≈ 1 token)
    approx_input_tokens = (len(style_prompt) + len(user_prompt)) // 4
    print(f"\n  Approx input tokens: ~{approx_input_tokens:,}")
    print(f"  Calling {args.model}...\n")

    # Call Claude API with streaming
    client = anthropic.Anthropic(api_key=api_key)
    output_chunks = []

    with client.messages.stream(
        model=args.model,
        max_tokens=16000,
        system=style_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    ) as stream:
        for i, chunk in enumerate(stream.text_stream):
            output_chunks.append(chunk)
            if i % 100 == 0:
                print(".", end="", flush=True)

    print(f"\n  Done. {sum(len(c) for c in output_chunks):,} chars generated.")

    draft_html = "".join(output_chunks)

    # Extract just the HTML if the model wrapped it in markdown code blocks
    if "```html" in draft_html:
        start = draft_html.find("```html") + 7
        end   = draft_html.rfind("```")
        if end > start:
            draft_html = draft_html[start:end].strip()

    date_slug  = data.get("date_slug", datetime.now(PKT).strftime("%Y-%m-%d"))
    output_path = DRAFTS_DIR / f"draft-{date_slug}.html"
    output_path.write_text(draft_html, encoding="utf-8")

    print(f"\n  ✓  Draft written to: {output_path}")
    print(f"\nNext steps:")
    print(f"  1. Open {output_path} in your browser to review")
    print(f"  2. Paste any sections you want to revise into Claude Code for iteration")
    print(f"  3. When satisfied: cp {output_path} {EDITIONS_DIR / f'{date_slug}.html'}")
    print(f"     Then add the edition to src/data/editions.js and commit.")


if __name__ == "__main__":
    main()
