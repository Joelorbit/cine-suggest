---
name: architecture
description: >-
  System architecture, component boundaries, data flow, repository structure, and architectural decisions.
  Activate when designing a subsystem, restructuring a codebase, or choosing between architectural approaches.
---

# Architecture: Boundaries and Design

## Default workflow

1. Read the repository structure, runtime conventions, dependency graph, and existing architecture documents.
2. Define the subsystem's responsibilities, callers, dependencies, data ownership, trust boundaries, and failure behavior.
3. Compare the smallest viable design with the existing structure before introducing a new layer, service, queue, or package.
4. Draw the main data flow, including validation, authorization, persistence, external calls, retries, and observability.
5. Record non-trivial choices in an ADR, implement behind stable interfaces, and verify dependency direction.

## Boundary rules

Prefer a modular monolith until scale, isolation, or organizational ownership makes a distributed boundary worthwhile. Organize by business capability where that improves cohesion; do not impose `controllers/`, `services/`, and `models/` folders mechanically on every project.

| Layer or boundary | May own | Must not own |
| --- | --- | --- |
| Presentation | Transport parsing, response mapping, user-facing status codes | Business policy or direct cross-cutting data access |
| Application | Use-case orchestration, transaction boundaries, authorization decisions | Framework-specific rendering or vendor payload details |
| Domain | Invariants, policies, value objects, pure business rules | Database, HTTP, queue, filesystem, or framework dependencies |
| Infrastructure | Repositories, queues, HTTP clients, storage, vendor adapters | Undeclared business decisions |

A dependency may point inward toward stable policy, or through an explicit interface. Avoid cycles, hidden global state, and imports that bypass the intended boundary. Keep external payloads at the edge and map them into internal types before business logic uses them.

## Design review table

| Question | Evidence to produce |
| --- | --- |
| What changes if the external provider changes? | Adapter or mapping boundary |
| Where is data validated and authorized? | Trust-boundary diagram or code path |
| What is atomic? | Transaction and consistency statement |
| What happens on timeout, duplicate delivery, or partial failure? | Failure and retry policy |
| How is the change observed and reversed? | Logs, metrics, health checks, rollback plan |
| Which existing clients or schemas could break? | Compatibility assessment |

## Repository structure

Adapt to the language and existing conventions. A reasonable default is `apps/` for entry points, domain-oriented internal packages, versioned migrations, tests, docs/ADRs, configuration templates, and a clear local quickstart. Do not reorganize a working repository solely to match this example.

## Architectural decision records

For a decision that affects boundaries, persistence, public contracts, runtime topology, or operational recovery, create `docs/adr/NNNN-short-title.md` with **Context**, **Decision**, **Consequences**, **Alternatives considered**, and **Status**. Link the ADR from relevant documentation and keep it short enough to be maintained.

## Done when

The design has explicit boundaries, dependency direction, data flow, failure behavior, observability, compatibility impact, and a verification plan. The chosen design is simpler than its alternatives unless the additional complexity buys a stated requirement.
