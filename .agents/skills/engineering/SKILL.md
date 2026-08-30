---
name: engineering
description: >-
  Product discovery, requirements engineering, scope control, and project documentation.
  Activate at the start of a project, feature, bug with unclear scope, or planning phase.
---

# Engineering: Discovery and Delivery

## Default workflow

1. Inspect the repository and read applicable local instructions before proposing work.
2. Write a short problem statement that names the user, current pain, desired outcome, and non-goals.
3. Convert the outcome into observable acceptance criteria. Separate functional, non-functional, and operational requirements.
4. Record assumptions, dependencies, risks, and the smallest viable scope. Resolve high-risk unknowns before polishing low-risk work.
5. Break the scope into independently verifiable tasks ordered by dependency. Prefer tasks that fit within one focused work session.
6. Implement, verify, and update the authoritative documentation. Report what changed, what was tested, and what remains uncertain.

## Discovery contract

| Area | Required question | Useful artifact |
| --- | --- | --- |
| Problem | What fails today, for whom, and why does it matter? | Problem statement |
| Users | Which roles, permissions, and technical contexts are involved? | User stories or use cases |
| Behavior | What must happen on success, empty input, invalid input, timeout, and retry? | Acceptance criteria |
| Quality | What latency, reliability, accessibility, privacy, or scale target matters? | Non-functional requirements |
| Constraints | Which deadline, platform, budget, compliance, or compatibility rules apply? | Constraint list |
| Scope | What is explicitly out of scope for this change? | MVP boundary |
| Risk | Which assumptions could invalidate the plan? | Risk log with mitigations |
| Operations | How will this be deployed, observed, backed up, and rolled back? | Runbook or release notes |

Do not invent requirements to make a plan look complete. Mark unknowns as assumptions, ask focused questions when they block safe progress, and choose the least risky reversible default when they do not.

## Scope control

Use MoSCoW prioritization: **Must** items block a useful release, **Should** items add important value but have a workaround, **Could** items are optional, and **Won't** items are intentionally deferred. Do not add “nice-to-have” work silently; record it as a follow-up.

When a task expands, pause and restate the changed scope. Preserve compatibility unless a breaking change is explicitly accepted. Record shortcuts and the condition that should trigger their repayment instead of hiding technical debt.

## Documentation standard

Update the smallest authoritative document. For a production change, keep the README quickstart executable, maintain `.env.example` without secrets, document non-trivial decisions as ADRs, keep API contracts synchronized, and add operational notes for migrations, backup, deployment, or rollback when relevant. Do not add documentation that merely restates obvious framework behavior.

## Dependency gate

Before adding a dependency, confirm that it solves a real problem, is maintained, licensed acceptably for the project, compatible with the runtime, and worth its size and operational cost. Prefer an existing project dependency or a small local implementation for trivial helpers. Update the lockfile and run the relevant audit or test command.

## Done when

The change has a bounded scope, observable acceptance criteria, an explicit risk treatment, verification commands with results, and a concise handoff. If a requirement remains unverified, say so plainly.
