---
name: testing
description: >-
  Software testing and review for unit, integration, end-to-end, regression, failure-path, and code-quality verification.
  Activate when writing tests, debugging behavior, reviewing a change, or assessing release confidence.
---

# Testing: Evidence of Behavior

## Default workflow

1. Identify the behavior, risk, boundary, and cheapest reliable test level for the change.
2. Inspect existing fixtures, test commands, environment assumptions, and neighboring tests before adding a new pattern.
3. Write tests against observable behavior and public contracts, not private implementation details.
4. Run focused tests first, then typecheck/lint/build and the broader suite as appropriate. Preserve the first useful failure output.
5. Review untested branches, flaky assumptions, compatibility, security, performance, and operational recovery before declaring done.

## Test-level selection

| Level | Use for | Baseline |
| --- | --- | --- |
| Unit | Pure logic, parsing, validation, mapping, state transitions | Fast, isolated, deterministic |
| Integration | Database, filesystem, queues, adapters, and layer contracts | Real ephemeral dependency where practical |
| End-to-end | A small number of critical user journeys | Stable environment and explicit cleanup |
| Property or fuzz | Parsers, invariants, and broad input spaces | Bounded generation and reproducible seeds |

Do not mock the behavior under test. Stub slow or nondeterministic boundaries deliberately, and use contract tests when a mock could drift from a provider. Freeze time and randomness where assertions depend on them; never depend on public internet availability for ordinary tests.

## Case design

For each non-trivial behavior, cover a normal case, a boundary or empty case, an invalid-input case, and the most consequential failure or authorization case. Use Arrange–Act–Assert, name the business behavior, and assert the smallest stable outcome. Include duplicate delivery or retry cases for idempotent workflows.

## Failure handling

Classify errors deliberately: validation, authentication, authorization, not found, conflict, rate limit, dependency failure, timeout, and unexpected internal failure. Tests must verify safe public responses, preserved request or correlation IDs, cleanup, retry bounds, and that sensitive details are not leaked.

## Review checklist

| Area | Ask |
| --- | --- |
| Correctness | Does the change satisfy each acceptance criterion? |
| Edge cases | What happens with empty, malformed, duplicate, stale, concurrent, or oversized input? |
| Security | Can a caller bypass authorization or inject data into another context? |
| Compatibility | Do existing clients, migrations, sessions, and serialized formats still work? |
| Performance | Is work bounded, and did query, bundle, memory, or latency cost change? |
| Operability | Can the failure be observed, retried, rolled back, or recovered? |

## Done when

The relevant tests pass in a clean-enough environment, failure paths are covered, flaky or skipped tests have a reason, the review found no unowned high-risk gap, and the final report includes exact commands rather than a generic “tested.”
