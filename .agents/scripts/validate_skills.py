#!/usr/bin/env python3
"""Validate the local Agent Skills pack without third-party dependencies."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SKILLS_DIR = ROOT / ".agents" / "skills"
REGISTRY = ROOT / ".agents" / "AGENTS.md"
MAX_LINES = 500
MAX_WORDS = 5000
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def frontmatter(text: str) -> tuple[dict[str, str], list[str]]:
    lines = text.splitlines()
    errors: list[str] = []
    if not lines or lines[0].strip() != "---":
        return {}, ["missing YAML frontmatter opener"]
    try:
        end = next(i for i, line in enumerate(lines[1:], 1) if line.strip() == "---")
    except StopIteration:
        return {}, ["missing YAML frontmatter closer"]

    values: dict[str, str] = {}
    for line in lines[1:end]:
        if not line.strip() or line.lstrip().startswith("#") or line.startswith("  "):
            continue
        if ":" not in line:
            errors.append(f"invalid frontmatter line: {line!r}")
            continue
        key, value = line.split(":", 1)
        key, value = key.strip(), value.strip()
        if key not in {"name", "description"}:
            errors.append(f"unsupported frontmatter key: {key}")
        elif value not in {">-", "|", ""}:
            values[key] = value.strip("'\"")
    if "name" not in values:
        errors.append("frontmatter is missing name")
    if "description" not in values:
        # Folded descriptions are collected below, so defer this check.
        if not any(line.startswith("description:") for line in lines[1:end]):
            errors.append("frontmatter is missing description")
    if any(line.startswith("description:") for line in lines[1:end]):
        start = next(i for i, line in enumerate(lines[1:end], 1) if line.startswith("description:"))
        description_lines = [lines[start].split(":", 1)[1].strip(" >-|\"'")]
        for line in lines[start + 1 : end]:
            if line.startswith("  "):
                description_lines.append(line.strip())
            else:
                break
        values["description"] = " ".join(part for part in description_lines if part)
    return values, errors


def main() -> int:
    failures: list[str] = []
    warnings: list[str] = []
    skill_files = sorted(SKILLS_DIR.glob("*/SKILL.md"))
    if not skill_files:
        failures.append("no skills found under .agents/skills")

    names: set[str] = set()
    for path in skill_files:
        folder = path.parent.name
        text = path.read_text(encoding="utf-8")
        meta, errors = frontmatter(text)
        prefix = str(path.relative_to(ROOT))
        for error in errors:
            failures.append(f"{prefix}: {error}")
        if not NAME_RE.fullmatch(folder):
            failures.append(f"{prefix}: folder name must be lowercase kebab-case")
        name = meta.get("name", "")
        if name in names:
            failures.append(f"{prefix}: duplicate skill name {name!r}")
        names.add(name)
        if name and name != folder:
            failures.append(f"{prefix}: frontmatter name {name!r} does not match folder {folder!r}")
        description = meta.get("description", "")
        if description and not re.search(r"activate when|use when|activate at|use for", description, re.I):
            failures.append(f"{prefix}: description must include an activation trigger")
        line_count = len(text.splitlines())
        word_count = len(text.split())
        if line_count > MAX_LINES:
            failures.append(f"{prefix}: {line_count} lines exceeds {MAX_LINES}")
        if word_count > MAX_WORDS:
            failures.append(f"{prefix}: approximately {word_count} words exceeds {MAX_WORDS}")
        for local_ref in re.findall(r"`((?:references|scripts|templates)/[^`]+)`", text):
            if not (path.parent / local_ref).exists():
                failures.append(f"{prefix}: broken local reference {local_ref!r}")
        for line_no, line in enumerate(text.splitlines(), 1):
            if "file:///" in line or "/home/" in line:
                failures.append(f"{prefix}:{line_no}: non-portable local filesystem reference")
            if re.search(r"(?:(?<![a-zA-Z])sk-[a-zA-Z0-9]{15,}|AKIA|BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY|password\s*[:=])", line, re.I):
                warnings.append(f"{prefix}:{line_no}: review possible credential-like text")

    registry_text = REGISTRY.read_text(encoding="utf-8") if REGISTRY.exists() else ""
    for name in sorted(names):
        if f"`{name}`" not in registry_text:
            failures.append(f"{name}: missing from .agents/AGENTS.md skill registry")

    print(f"Validated {len(skill_files)} skills")
    for warning in warnings:
        print(f"WARNING: {warning}")
    if failures:
        for failure in failures:
            print(f"ERROR: {failure}")
        return 1
    print("All structural checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
