# Agent Skills

A portable engineering skill pack for AI coding agents. Each skill is a focused `SKILL.md` package with actionable workflows, explicit guardrails, concrete defaults, and verification steps. The pack is designed to work with any agent that supports the open Agent Skills layout and can also be installed through compatible registries such as [skills.sh](https://www.skills.sh/).

## Included skills

### Core Engineering & Systems
| Skill | Primary use | Typical companions |
| --- | --- | --- |
| `engineering` | Discovery, requirements, scope, planning, and project documentation. | `architecture`, `testing`, `handoff` |
| `architecture` | Boundaries, data flow, repository structure, and architectural decisions. | `engineering`, `security`, `database` |
| `security` | Threat modeling, trust boundaries, auth, secrets, uploads, and AI safety. | `backend`, `database`, `devops` |
| `backend` | APIs, integrations, retries, caching, webhooks, and payment workflows. | `security`, `database`, `testing` |
| `frontend` | UI states, component composition, accessibility, responsive behavior, and performance. | `eyutheme`, `emil-design-eng`, `animate` |
| `database` | Schemas, constraints, query plans, transactions, migrations, backups, and recovery. | `backend`, `devops`, `testing` |
| `testing` | Test strategy, deterministic fixtures, failure analysis, and code review. | Every implementation skill |
| `devops` | CI/CD, containers, release safety, observability, and operational recovery. | `security`, `database`, `testing` |
| `handoff` | Precise transfer of context, files, verification, risks, and next actions. | Every multi-session task |
| `skill-creator` | Authoring, packaging, evaluating, and maintaining skills. | `testing`, `handoff` |

### Design Engineering & UI Craft
| Skill | Primary use | Typical companions |
| --- | --- | --- |
| `eyutheme` | Joel's EyuTheme design system, 24 luxury themes, 5-tier surface hierarchy, tokens. | `frontend`, `emil-design-eng`, `prototype` |
| `emil-design-eng` | Emil Kowalski's craft philosophy, invisible details, tactile component feel, review tables. | `animate`, `eyutheme`, `review-animations` |
| `apple-design` | Apple interface & fluid motion principles (WWDC, fluid gestures, spring physics). | `animate`, `emil-design-eng` |
| `pick-ui-library` | Choosing trusted, battle-tested UI primitives (Radix, Base UI, Bits UI, Sonner, Vaul). | `frontend`, `emil-design-eng` |
| `prototype` | Rapid interactive UI component prototyping with multi-variant live switchers. | `eyutheme`, `emil-design-eng`, `animate` |
| `write-swift` | Modern Swift 6 engineering, value types, actor isolation, concurrency, Swift Testing. | `apple-design`, `testing` |

### Animation, Motion & Interaction
| Skill | Primary use | Typical companions |
| --- | --- | --- |
| `animate` | Building animations from scratch, custom bezier curves, durations, GPU properties. | `emil-design-eng`, `review-animations` |
| `animate-expo` | React Native & Expo fluid animations using Reanimated, gesture handlers, and haptics. | `animate`, `apple-design` |
| `animation-vocabulary` | Precise motion vocabulary (anticipation, damping, overshoot, inertia, follow-through). | `animate`, `emil-design-eng` |
| `ask-sonner` | Sonner toast notification library setup, styling, recipes, and edge-case handling. | `frontend`, `emil-design-eng` |
| `find-animation-opportunities` | Auditing UI to discover high-value motion opportunities and flag non-animating actions. | `improve-animations`, `animate` |
| `improve-animations` | Auditing codebase animations and generating prioritized, actionable upgrade plans. | `find-animation-opportunities`, `animate` |
| `review-animations` | Strict animation reviews using structured Before/After comparison tables. | `emil-design-eng`, `animate` |

## Installation

For a repository-local installation, clone this repository into `.agents`:

```bash
git clone https://github.com/Joelorbit/Agent-skills.git .agents
```

For a compatible skills registry, use the repository's supported install command, for example:

```bash
npx skills add Joelorbit/Agent-skills
```

If the host agent uses a different directory, preserve the `skills/<name>/SKILL.md` layout and keep `.agents/AGENTS.md` or its equivalent at the instruction root.

## How to use the pack

Start with `engineering` for a new project or ambiguous feature. Add only the skills relevant to the current work. Use `security`, `database`, `testing`, and `devops` when the change crosses those boundaries; use `handoff` whenever work may continue in another session. The repository's own conventions remain authoritative, and project-specific design systems are followed only when the target repository actually adopts them.

Each skill follows the same compact pattern: activation scope, default workflow, decision rules, gotchas, verification, and handoff. Optional detail lives in `references/` so the core file stays easy to load and reuse.

## Validation

Run the pack validator before committing skill changes:

```bash
python3 .agents/scripts/validate_skills.py
```

The validator checks frontmatter, folder/name alignment, descriptions, line and token budgets, broken local references, duplicate skill names, and registry consistency. It intentionally reports warnings for quality concerns without failing on every stylistic preference.

## Layout

```text
.agents/
├── AGENTS.md                    # pack-wide operating contract
├── scripts/validate_skills.py   # deterministic repository validator
└── skills/
    └── <skill>/
        ├── SKILL.md             # required core instructions
        ├── references/           # optional on-demand detail
        ├── scripts/              # optional deterministic helpers
        └── templates/            # optional reusable output assets

docs/
└── skill-research.md            # design research and pack-maintenance notes
```

## Design-system portability

The `frontend` skill is framework-agnostic by default. If the target project explicitly uses EyuTheme, read its bundled reference and apply that contract. Otherwise follow the target project's existing design tokens and component library; do not inject a foreign visual system into an unrelated repository.

## License

MIT — see [LICENSE](LICENSE).
