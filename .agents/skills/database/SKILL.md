---
name: database
description: >-
  Database engineering for schemas, constraints, query performance, transactions, migrations, backups, and recovery.
  Activate when changing persistence, SQL, indexes, data access, or database operations.
---

# Database: Integrity and Recovery

## Default workflow

1. Read the current schema, migration history, data volume, access patterns, retention rules, and backup/recovery posture.
2. Define invariants and ownership first; enforce correctness in database constraints as well as application validation.
3. Design queries and indexes from actual filters, joins, ordering, cardinality, and write cost. Inspect plans for important or large-table queries.
4. Keep transactions short and atomic; never hold one open across a slow network call or unbounded computation.
5. Write a forward migration, compatibility plan, verification query, and rollback or recovery procedure. Test against representative data.

## Schema rules

Start normalized and denormalize only for a measured reason. Use `NOT NULL` where absence is invalid, bounded types where limits exist, `CHECK` constraints for ranges and enumerations, foreign keys with explicit delete behavior, and unique constraints for business uniqueness. Treat a constraint violation as a concurrency-safe signal to handle, not as a reason to duplicate the same check in application code.

Name ownership and lifecycle explicitly. Decide whether records are deleted, archived, or soft-deleted; apply the policy consistently to queries, uniqueness, indexes, and retention jobs. Store times with an explicit timezone convention and use integer minor units or a precise decimal strategy for money.

## Query and index rules

Parameterize all values. Avoid N+1 access with joins, batching, or dataloaders. Add indexes for proven selective filters, joins, and orderings, but account for write amplification and left-prefix behavior in composite indexes. Use `EXPLAIN` or `EXPLAIN ANALYZE` for performance-sensitive queries and verify the plan after data growth. Prefer stable cursor pagination for large or changing result sets; use offset only when its semantics and cost are acceptable.

## Transactions and concurrency

Define the invariant that requires atomicity, then keep the transaction to the smallest set of reads and writes that protect it. Lock rows or use optimistic concurrency deliberately. Access shared resources in a consistent order where multiple locks are possible. Make retries safe by using idempotency keys, unique constraints, or version checks.

## Migrations and recovery

Never make an unrecorded production schema change. Prefer expand-and-contract changes: add compatible structures, deploy code that can read both when needed, backfill in bounded batches, switch reads, then remove obsolete structures only after an observation window. Avoid large table rewrites during peak traffic. Test migration runtime, locks, verification queries, rollback limits, backup restore, and application compatibility; remember that some data migrations are safer to restore forward than to reverse destructively.

## Done when

Invariants are enforced, queries are parameterized and plan-checked, transactions are bounded, migration and compatibility behavior are explicit, backups and restore assumptions are tested, and the change includes representative data or failure tests.
