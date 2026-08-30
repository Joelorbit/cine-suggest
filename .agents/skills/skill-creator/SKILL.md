---
name: skill-creator
description: >-
  Skill authoring, packaging, evaluation, and maintenance for portable agent capabilities.
  Activate when creating, revising, validating, or distributing a SKILL.md package.
---

# Skill Creator: Author, Test, Maintain

## Default workflow

1. Start from two or three concrete tasks, observed corrections, project artifacts, or real failure cases; do not write a generic advice dump.
2. Define the skill's single coherent capability, activation triggers, non-goals, default workflow, and expected handoff.
3. Choose the smallest reusable resources: deterministic scripts for repeatable work, references for optional detail, and templates for stable output structures.
4. Write a concise `SKILL.md` with valid YAML frontmatter, imperative instructions, clear defaults, gotchas, validation, and resource navigation.
5. Run structural validation, then exercise the skill against varied realistic prompts, including an edge case and a false-positive prompt.
6. Remove rules that do not improve behavior, update the pack registry, and record what was tested.

## Required package contract

```text
skill-name/
├── SKILL.md          # required; frontmatter + core workflow
├── references/       # optional; load only for named scenarios
├── scripts/          # optional; deterministic, bounded helpers
└── templates/        # optional; reusable output assets
```

The frontmatter must contain `name` matching the directory and a `description` that says **what the skill does and when to activate it**. Keep the core file below **500 lines** and roughly **5,000 tokens**; move legitimate variants and long schemas to referenced files. Do not put README, CHANGELOG, credentials, private URLs, or unused example files inside a skill package.

## Writing rules

Add only knowledge the agent would likely miss without this skill. Prefer procedures, decision rules, concrete defaults, gotchas, checklists, and output templates over generic explanations. Present one recommended path and mention alternatives only when they materially change the decision. Use exact commands or scripts for fragile operations and flexible guidance where safe variation is expected.

Every reference must be discoverable from `SKILL.md` with a sentence explaining **when to read it**. Avoid duplicating the same rule across core and reference files. Keep instructions scoped to the skill's concern, and explicitly name anti-patterns that are likely to recur.

## Evaluation contract

For a meaningful skill, add two or three realistic cases in an `evals/evals.json` file or an equivalent test document. Vary phrasing and include one malformed, boundary, or refusal case. Define observable assertions rather than subjective “good output” claims. Compare the revised skill with the previous version or a no-skill baseline when the host environment permits it; include human review for qualities that are not objectively testable.

## Validation

From the repository root, run:

```bash
python3 .agents/scripts/validate_skills.py
```

For a standalone skill installed under a host platform's skill directory, also run that platform's validator when available. Use the host-provided path rather than embedding a machine-specific path in the skill package.

Fix all errors before delivery. Review warnings for trigger precision, portability, duplication, and unused resources. Never claim a skill was evaluated against a real task unless it actually was.

## Maintenance loop

After real use, capture the prompt, the mistake or wasted step, the correction, and the smallest instruction or resource change that prevents recurrence. Re-run structural validation and the affected eval cases. Keep the core lean; move growing detail into progressive-disclosure references.

## Done when

The package is self-contained, correctly named, discoverable, portable, validated, tested against realistic use, and documented in the pack registry with no secret or private-environment dependency.
