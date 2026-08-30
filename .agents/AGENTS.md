# Agent Skills Pack

This directory contains **portable, composable skills for software-engineering agents**. Treat each skill as a focused capability package rather than a project-wide prompt. Load a skill when its activation description matches the task, then follow the target repository's own instructions and the user's explicit requirements.

## Operating contract

Use the following sequence for non-trivial work:

1. **Understand.** Inspect the repository, existing instructions, runtime, tests, and relevant interfaces before making assumptions.
2. **Plan.** State the smallest useful scope, acceptance criteria, risks, and dependencies. Ask only for decisions that materially block safe progress.
3. **Design.** Choose boundaries, data flow, error behavior, and rollback or recovery paths before implementation.
4. **Threat-model.** Identify trust boundaries, sensitive data, destructive operations, and likely abuse paths.
5. **Implement.** Make the smallest coherent change, preserving existing conventions unless there is a documented reason to change them.
6. **Verify.** Run the narrowest relevant checks first, then the broader suite. Inspect both success and failure paths.
7. **Review and harden.** Check compatibility, security, performance, accessibility, observability, and operational recovery.
8. **Document and hand off.** Summarize changed files, verification performed, remaining risks, and exact next steps.

For a one-line fix, compress the sequence rather than skipping its essential checks. For risky, destructive, or production-facing work, make the sequence explicit and obtain confirmation before irreversible actions.

## Instruction precedence

Apply instructions in this order: system and platform safety requirements; the user's request; repository-local instructions such as `AGENTS.md`, `CLAUDE.md`, or `CONTRIBUTING.md`; the most specific applicable skill; then general pack guidance. When instructions conflict, choose the higher-precedence rule, state the conflict briefly, and do not silently weaken a security or data-integrity control.

## Pack-wide engineering standards

| Area | Default standard |
| --- | --- |
| Scope | Prefer a small, verifiable change. Record out-of-scope ideas instead of silently adding them. |
| Boundaries | Validate untrusted input at the boundary and keep domain rules independent of transport and storage. |
| Errors | Preserve useful context, return safe user-facing errors, and never swallow failures. |
| Security | Use least privilege, deny by default, protect secrets, and authorize every resource access server-side. |
| Data | Make integrity constraints explicit and design migrations for compatibility and recovery. |
| Testing | Test observable behavior; include at least one failure or boundary case for every non-trivial path. |
| Operations | Use repeatable commands, structured logs, health/readiness checks, and a rollback or recovery path. |
| Documentation | Update the smallest authoritative document and include commands another agent can run to verify the result. |

Avoid god modules, speculative abstractions, hidden global state, magic values, unbounded retries, hardcoded credentials, and “TODO” placeholders that conceal unfinished design.

## Skill selection

Use the most specific skill that applies. Skills may compose; when they overlap, keep the concern-specific rule and use the shared pack standards for cross-cutting behavior.

| Skill | Activate when you need to… |
| --- | --- |
| `engineering` | Discover a problem, define requirements, plan scope, or document a project. |
| `architecture` | Design boundaries, data flow, repository structure, or a non-trivial subsystem. |
| `security` | Model threats or implement authentication, authorization, input, secrets, upload, or AI safety controls. |
| `backend` | Build APIs, workers, integrations, caching, webhooks, or payment flows. |
| `frontend` | Build or review UI, interaction states, accessibility, responsive behavior, or client performance. |
| `database` | Design schemas, constraints, queries, transactions, migrations, backups, or recovery. |
| `testing` | Create tests, debug failures, review code, or assess release confidence. |
| `devops` | Change CI/CD, containers, deployments, observability, Git workflows, or runtime operations. |
| `handoff` | Transfer work between agents or sessions without losing context or verification state. |
| `skill-creator` | Create, revise, package, or validate an agent skill. |
| `eyutheme` | Design and implement interfaces using Joel's EyuTheme design system, 24 luxury themes, and semantic tokens. |
| `emil-design-eng` | Apply Emil Kowalski's design engineering philosophy on UI polish, component feel, and compounding craft. |
| `animate` | Build an animation from scratch, choosing the correct curve, duration, properties, and interruption behavior. |
| `animate-expo` | Build fluid animations for React Native and Expo using Reanimated, gesture handlers, and haptics. |
| `animation-vocabulary` | Use precise animation and motion vocabulary for communicating and implementing UI interactions. |
| `apple-design` | Apply Apple interface design and fluid motion principles distilled from WWDC for web and native apps. |
| `ask-sonner` | Work with the Sonner toast notification library, setup, styling, recipes, and common issue fixes. |
| `find-animation-opportunities` | Search UI codebases for high-value animation opportunities while identifying what should NOT animate. |
| `improve-animations` | Audit all animations in a codebase and generate prioritized, actionable improvement plans. |
| `pick-ui-library` | Select trusted, battle-tested UI component libraries and headless primitives instead of hand-rolling widgets. |
| `prototype` | Build multiple interactive variations of a UI component with a live switcher for rapid iteration. |
| `review-animations` | Review UI animations strictly against design engineering standards using a structured Before/After table. |
| `write-swift` | Write modern Swift code covering value types, Swift 6 concurrency, API design, and Swift Testing. |

## Definition of done

Work is complete only when the requested behavior is implemented, relevant automated checks pass, failure paths are considered, security and compatibility risks are reviewed, documentation is current, and the handoff identifies any unverified assumption. Do not claim a check passed unless it was actually run.
