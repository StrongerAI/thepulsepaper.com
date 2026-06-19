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
DEFAULT_MODEL = "claude-sonnet-4-6"
PKT           = ZoneInfo("Asia/Karachi")

# Markers used to split the template HTML into shell / content / footer
TOC_MARKER    = '<nav class="toc">'
FOOTER_MARKER = "<footer"
S06_MARKER    = '<section class="section" id="s06">'


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


# ---------------------------------------------------------------------------
# TEMPLATE SPLITTER
# ---------------------------------------------------------------------------

def split_template(html: str) -> tuple[str, str, str, str]:
    """Split edition HTML into four pieces:
      shell_head  — everything before <nav class="toc">
      toc_to_s05  — from TOC through end of section 05
      s06_to_end_of_sections — section 06 through section 10
      shell_foot  — <footer> onwards
    Returns (shell_head, toc_to_s05, s06_to_end_of_sections, shell_foot)
    """
    toc_pos    = html.find(TOC_MARKER)
    footer_pos = html.find(FOOTER_MARKER)
    s06_pos    = html.find(S06_MARKER)

    if toc_pos == -1:
        sys.exit("Error: could not find TOC marker in template. Template may have changed.")
    if footer_pos == -1:
        sys.exit("Error: could not find footer marker in template.")
    if s06_pos == -1:
        sys.exit("Error: could not find section 06 marker in template.")

    shell_head        = html[:toc_pos]
    toc_to_s05        = html[toc_pos:s06_pos]
    s06_to_sections   = html[s06_pos:footer_pos]
    shell_foot        = html[footer_pos:]

    return shell_head, toc_to_s05, s06_to_sections, shell_foot


def update_shell_head(shell_head: str, edition_n: str, ed_date: str, title_phrase: str) -> str:
    """Update edition-specific fields in the <head> block."""
    # Update <title>
    shell_head = re.sub(
        r"<title>[^<]+</title>",
        f"<title>{edition_n} | The Pulse Paper</title>",
        shell_head,
    )
    # Update meta description
    shell_head = re.sub(
        r'<meta name="description" content="[^"]*"',
        f'<meta name="description" content="{title_phrase} | The Pulse Paper weekly economic intelligence for Pakistan."',
        shell_head,
    )
    return shell_head


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

Generate the following HTML fragment for {edition_n} ({ed_date}):
1. <nav class="toc"> ... </nav>  — update the section short-titles to match this edition's section headings
2. The heatmap <div class="container"> block — updated with this week's data
3. The opening <div class="container"> and sections s01 through s05 (complete <section> elements)

Output raw HTML only. No markdown, no explanation, no code fences.
"""


def prompt_call_b(data: dict, template_b: str, edition_n: str, ed_date: str, theme: str) -> str:
    return f"""Generate the second half of {edition_n} of The Pulse Paper, dated {ed_date}.
Through-line this week: {theme}

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

    # Split template
    shell_head, template_a, template_b, shell_foot = split_template(template_html)
    shell_head = update_shell_head(shell_head, edition_n, ed_date, theme or edition_n)

    print(f"\n  Shell head: {len(shell_head):,} chars")
    print(f"  Template A (TOC+heatmap+s01-05): {len(template_a):,} chars")
    print(f"  Template B (s06-10): {len(template_b):,} chars")
    print(f"  Shell foot: {len(shell_foot):,} chars")

    client = anthropic.Anthropic(api_key=api_key)

    print(f"\n  Generating content (2 API calls)...")

    part_a = strip_code_fence(call_claude(
        client, args.model, style_text,
        prompt_call_a(data, template_a, edition_n, ed_date, theme),
        "Call A (TOC + heatmap + s01-05):"
    ))

    part_b = strip_code_fence(call_claude(
        client, args.model, style_text,
        prompt_call_b(data, template_b, edition_n, ed_date, theme),
        "Call B (s06-10 + action items): "
    ))

    # Stitch
    draft_html = shell_head + part_a + "\n" + part_b + "\n" + shell_foot

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
