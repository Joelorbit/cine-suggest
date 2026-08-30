---
name: backend
description: >-
  Backend engineering for APIs, workers, external integrations, caching, webhooks, and payment flows.
  Activate when building or changing server-side behavior or public service contracts.
---

# Backend: Contracts and Reliability

## Default workflow

1. Identify the caller, resource or command, authorization rule, compatibility promise, and observable outcome.
2. Define request and response schemas, status/error semantics, pagination, idempotency, and limits before implementation.
3. Validate at the transport boundary, authorize at the resource boundary, and map internal errors to safe public responses.
4. Isolate vendor calls behind an adapter with explicit timeouts, retry policy, telemetry, and a degraded-mode or recovery path.
5. Test happy, invalid, unauthorized, duplicate, timeout, and dependency-failure cases.

## API defaults

Use resource-oriented paths and plural nouns unless the domain is command-oriented. Treat HTTP semantics accurately: `GET` is safe, `POST` creates or starts an action, `PUT` replaces, `PATCH` partially updates, and `DELETE` removes or deactivates. Document exceptions rather than forcing a misleading REST shape.

Return a stable error envelope such as:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "The request could not be accepted.",
    "details": {"email": "Must be a valid email address"},
    "request_id": "req_123"
  }
}
```

Use opaque public identifiers when exposing resources. Do not promise a response wrapper, field, status code, or ordering without a compatibility and pagination plan. Treat limits, sorting, filtering, and cursor semantics as part of the contract.

## Integration defaults

Set explicit connect, read, and total deadlines; a starting default is **5 seconds connect and 10 seconds read**, adjusted to the dependency's SLO. Retry only transient failures for idempotent operations or requests carrying a provider-supported idempotency key. Use exponential backoff with jitter, a bounded attempt count, and a circuit breaker or queue for critical dependencies. Never retry validation errors, authorization failures, or non-idempotent writes without protection.

Map third-party payloads at the adapter boundary. Record provider request IDs, redact secrets and payment data, and make duplicate delivery safe. Do not hold a database transaction open across a slow network call.

## Caching

Define a namespaced key, owner, TTL, freshness rule, invalidation event, and failure behavior for every cache. Prevent stampedes with single-flight locking or background revalidation on hot reads. Treat stale or missing cache data as an expected path, not an exceptional crash.

## Payments and webhooks

Never fulfill an order from client-reported payment state. Verify the provider signature, event freshness, event type, and resource identity; persist a deduplication key; process asynchronously where practical; and make the handler idempotent. Model payment state transitions explicitly, for example `created → pending → succeeded|failed → refunded`, and reject impossible transitions.

## Done when

The contract is documented, inputs and permissions are enforced, retries and timeouts are bounded, duplicate and failure paths are tested, sensitive logs are redacted, and the release has a compatibility and rollback story.
