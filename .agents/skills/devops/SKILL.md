---
name: devops
description: >-
  DevOps engineering for CI/CD, containers, deployments, observability, Git workflows, and operational recovery.
  Activate when shipping code, changing runtime infrastructure, or operating a service.
---

# DevOps: Safe Delivery and Operations

## Default workflow

1. Read the existing pipeline, deployment target, runtime configuration, secrets path, health checks, and rollback procedure.
2. Make the smallest repeatable change and validate it locally or in an isolated environment before release.
3. Gate delivery on install, lint, typecheck, tests, security checks, and build steps that actually apply to the project.
4. Deploy with a staged or reversible mechanism, observe health and key signals, and document rollback or recovery.

## CI/CD baseline

Prefer a pipeline whose order matches dependency and feedback cost: install with a lockfile, lint/static analysis, typecheck, focused tests, broader tests, security/dependency checks, then build/package. Do not claim every repository needs every tool; make the gate explicit and fail closed for the checks the project has adopted. Never deploy an artifact that failed its required gates.

Every release needs an identified artifact, environment configuration, migration behavior, health/readiness check, owner, observation window, and rollback or forward-recovery path. Treat database migrations and feature flags as part of the release, not an afterthought.

## Container baseline

Use multi-stage builds when they reduce the runtime image, pin base images appropriately, keep `.dockerignore` free of source secrets and caches, run as a non-root user, and set a bounded process or resource policy where the platform supports it. Do not put credentials in images or build logs. Scan images and dependencies according to the project's risk and compliance requirements.

## Production readiness

Before release, verify configuration validation, HTTPS and intentional CORS, security headers, migration compatibility, backup status, health and readiness endpoints, alert ownership, and log redaction. Keep `/health` or `/live` cheap and process-oriented; keep `/ready` dependency-aware without turning a transient optional service into an unexplained total outage.

## Observability

Use structured logs with timestamp, level, service/version, request or trace ID, outcome, and duration. Include authenticated subject or tenant only when necessary and safe. Never log passwords, tokens, authorization headers, payment data, or raw sensitive payloads. Add metrics or traces for latency, error rate, saturation, queue age, dependency failures, and deployment version where the platform supports them.

## Git and recovery

Keep commits atomic and explain intent. Use the repository's branch and commit conventions; do not rewrite shared history or commit broken states to long-lived branches. Practice rollback or restore procedures before a high-risk release, and distinguish a reversible application rollback from a destructive schema rollback.

## Done when

The change is reproducible, required gates pass, secrets are protected, deployment and migration behavior are compatible, health and observability are usable, and a tested rollback or recovery path exists.
