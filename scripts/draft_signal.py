#!/usr/bin/env python3
"""
scripts/draft_signal.py
=======================
Generates a draft Signal article (.md) using the Claude API.

Single API call — output is ready-to-edit Astro Markdown in ~15 seconds.

Usage:
  python3 scripts/draft_signal.py                           # interactive
  python3 scripts/draft_signal.py --data-file input.txt     # from file
  python3 scripts/draft_signal.py --model claude-opus-4-8   # use Opus

Output:
  scripts/signal_drafts/draft-signal-YYYY-MM-DD.md

After review:
  cp scripts/signal_drafts/draft-signal-YYYY-MM-DD.md src/content/articles/{slug}.md
  # then commit and push
"""

import argparse
import os
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import anthropic

REPO_ROOT     = Path(__file__).resolve().parent.parent
SCRIPTS_DIR   = Path(__file__).resolve().parent
DRAFTS_DIR    = SCRIPTS_DIR / "signal_drafts"
STYLE_PROMPT  = SCRIPTS_DIR / "style_prompt.md"
DEFAULT_MODEL = "claude-sonnet-4-6"
PKT           = ZoneInfo("Asia/Karachi")


def load_dotenv():
    env_path = REPO_ROOT / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def read_interactive() -> tuple[str, str]:
    print("\nTopic / angle (one line):")
    print("  e.g. 'FBR missed May revenue target by Rs42bn'")
    topic = input("> ").strip()
    if not topic:
        sys.exit("Aborted.")

    print("\nRaw data / facts (paste everything, then Ctrl+D when done):")
    print("─" * 60)
    lines = []
    try:
        while True:
            lines.append(input())
    except EOFError:
        pass
    raw_data = "\n".join(lines).strip()
    if not raw_data:
        sys.exit("Aborted — no data provided.")

    return topic, raw_data


def build_prompt(topic: str, raw_data: str, today: str) -> str:
    return f"""Write a Signal article for The Pulse Paper.

TOPIC / ANGLE:
{topic}

RAW DATA / FACTS (use these numbers exactly — do not round or paraphrase figures):
{raw_data}

TODAY'S DATE: {today}

---

Produce a complete Astro Markdown file. Use exactly this structure and nothing else:

---
title: "..."
summary: "..."
date: {today}
tags: [...]
draft: false
---

[article body]

RULES:
- title: sharp, opinionated statement — not a question, not neutral
- summary: 2–3 sentences, key numbers and the "so what", max 60 words
- tags: 3–5 specific tags (e.g. "FBR", "Fiscal", "Macro" — not generic like "Pakistan")
- Opening paragraph: the key number immediately, no preamble, no "In a recent development"
- 2–3 body sections with meaningful ## headings that say something, not just label a category
- One blockquote (>) with the sharpest single-sentence thesis in the piece
- Final section headed "## What to watch" or "## What this means for you": 2–3 bold sub-points, one sentence each after the bold
- One closing paragraph — a single crisp anchor sentence, no trailing summary
- 450–700 words total
- Second-person "you" where addressing the reader
- No hedging language, no passive voice, no em-dashes, no filler transitions
- Use exact figures from the raw data — never approximate what is given precisely

Output raw Markdown only. No code fences, no preamble, no explanation."""


def strip_fences(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        text = "\n".join(lines[1:] if lines[0].startswith("```") else lines)
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3]
    return text.strip()


def unique_path(base: Path) -> Path:
    if not base.exists():
        return base
    stem, suffix = base.stem, base.suffix
    idx = 1
    while True:
        candidate = base.parent / f"{stem}-{idx}{suffix}"
        if not candidate.exists():
            return candidate
        idx += 1


def main():
    parser = argparse.ArgumentParser(description="Generate a draft Signal article")
    parser.add_argument("--data-file", help="Path to .txt file with raw data/facts")
    parser.add_argument("--topic",     help="Topic / angle (overrides interactive prompt)")
    parser.add_argument("--model",     default=DEFAULT_MODEL)
    args = parser.parse_args()

    load_dotenv()
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit("Error: ANTHROPIC_API_KEY not set. Add it to .env in the repo root.")

    DRAFTS_DIR.mkdir(exist_ok=True)
    now   = datetime.now(PKT)
    today = now.strftime("%Y-%m-%d")
    style = STYLE_PROMPT.read_text(encoding="utf-8") if STYLE_PROMPT.exists() else ""

    # Gather topic + data
    if args.data_file:
        data_path = Path(args.data_file)
        if not data_path.exists():
            sys.exit(f"Error: {args.data_file} not found.")
        raw_data = data_path.read_text(encoding="utf-8").strip()
        topic    = args.topic or data_path.stem.replace("-", " ").replace("_", " ")
    else:
        topic, raw_data = read_interactive()
        if args.topic:
            topic = args.topic

    print(f"\n=== Pulse Signal Generator ===")
    print(f"  Topic:  {topic[:72]}")
    print(f"  Data:   {len(raw_data):,} chars")
    print(f"  Model:  {args.model}")
    print(f"\n  Generating ", end="", flush=True)

    client = anthropic.Anthropic(api_key=api_key)
    chunks = []

    with client.messages.stream(
        model=args.model,
        max_tokens=4000,
        system=style,
        messages=[{"role": "user", "content": build_prompt(topic, raw_data, today)}],
    ) as stream:
        for i, chunk in enumerate(stream.text_stream):
            chunks.append(chunk)
            if i % 50 == 0:
                print(".", end="", flush=True)

    text = strip_fences("".join(chunks))

    out_path = unique_path(DRAFTS_DIR / f"draft-signal-{today}.md")
    out_path.write_text(text, encoding="utf-8")

    print(f" {len(text):,} chars\n")
    print(f"  ✓  {out_path}")
    print(f"\nNext:")
    print(f"  1. Review and edit the draft")
    print(f"  2. Copy to src/content/articles/{{slug}}.md")
    print(f"  3. Commit and push")


if __name__ == "__main__":
    main()
