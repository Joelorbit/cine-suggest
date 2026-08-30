# Swift 6 Concurrency Guide

## 3. Concurrency: Stay Single-Threaded Until Profiling Says Otherwise

The default state for Swift code is synchronous, single-threaded execution on the MainActor or within an isolated subsystem. Do not introduce concurrency for concurrency's sake.

### The rule that changed in Swift 6
Swift 6 enables complete concurrency checking by default. Data races are now compile-time errors, not runtime bugs.

- `@MainActor` isolates classes and functions to the main thread (UI state, ViewModels).
- `actor` protects mutable state across concurrent tasks.
- `Sendable` marks types safe to transfer across concurrency boundaries.

### Actor Reentrancy
Actors do not lock during `await`. Mutable state can change between the start and resumption of an `await` call. Always re-validate state assumptions after an `await`.

## 4. Sendable and Sharing Data
Value types (structs, enums) with Sendable members are automatically Sendable. Classes require `final` and immutable properties, or explicit synchronization with `@unchecked Sendable`.

## 5. Structured Concurrency
Prefer `async let` and `TaskGroup` over unstructured `Task { }`. Structured concurrency propagates cancellation and errors cleanly up the parent tree.

## 6. Concurrency in SwiftUI
- Use `.task` modifier for view-lifecycle-bound asynchronous work.
- Use `@Observable` (Observation framework) over `ObservableObject`.
