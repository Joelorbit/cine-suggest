---
name: handoff
description: >-
  Agent and session handoff protocol for transferring context, decisions, changed files, verification, risks, and next actions.
  Activate when work may continue in another session, agent, branch, or environment.
---

# Handoff: Preserve Continuity

## Create a handoff when

Work is incomplete, another agent must review or continue it, the environment is changing, a decision needs approval, or verification cannot finish in the current session. Do not wait until context is nearly exhausted.

## Required handoff format

```markdown
# Handoff: <short task title>

## Objective
<What outcome is being pursued and how success is measured.>

## Current state
<What is complete, in progress, blocked, or intentionally deferred.>

## Decisions and assumptions
<Decisions made, alternatives rejected, and assumptions that still need validation.>

## Changed files
- `path/to/file:line` — <what changed and why>

## Verification
- `<exact command>` — PASS / FAIL / NOT RUN
- <Relevant output, fixture, or environment note.>

## Risks and blockers
<Security, data, compatibility, operational, or user decisions that remain.>

## Next actions
1. <The next smallest safe action.>
2. <The following verification or decision.>
```

## Precision rules

Use repository-relative paths and `path:line` anchors when available. Quote exact commands, include the working directory and required environment assumptions, and distinguish facts from guesses. Link to ADRs, issues, artifacts, or logs instead of pasting large files. State what was deliberately not changed.

## Receiver protocol

The receiving agent should read local instructions first, inspect the listed files, verify the stated repository state, and run the listed checks before continuing. If the handoff conflicts with the repository or user request, stop and surface the conflict. Update the handoff after each meaningful milestone rather than allowing it to become stale.

## Done when

A new agent can continue without repeating discovery, and can tell exactly what is trustworthy, what is unverified, and what action comes next.
