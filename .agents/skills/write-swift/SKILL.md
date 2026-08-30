---
name: write-swift
description: >-
  Modern Swift development covering value types, Swift 6 concurrency, API design, performance, and Swift Testing.
  Activate when writing or reviewing Swift code, designing iOS/macOS APIs, implementing concurrency, or creating Swift test suites.
---

# Modern Swift Engineering

Swift is a multi-paradigm, value-oriented language with compile-time concurrency safety. Write Swift that is clear at the point of use, safe by default, and performant without premature complexity.

## Core Rules

1. **Model with value types by default.** Use `struct` and `enum` until you have an explicit need for identity, reference sharing, or objective-C interop.
2. **Make failure paths visible.** Use typed `throws`, `Result`, or optionals. Never swallow errors or use `try!` in production code.
3. **Embrace Swift 6 compile-time concurrency.** Use `@MainActor` for UI and ViewModels, actors for isolated mutable state, and `Sendable` types. (See `references/swift-concurrency.md`.)
4. **Use Swift Testing (`import Testing`).** Use `@Test` and `#expect()` for modern, parameterized testing. (See `references/swift-testing.md`.)
5. **Follow Swift API design guidelines.** Clarity at the point of call site is the primary metric.

## 1. Value Types & Domain Modeling

```swift
// Preferred: Immutable value type with explicit validation
public struct MonetaryAmount: Hashable, Sendable, Codable {
    public let value: Decimal
    public let currency: Currency

    public init(value: Decimal, currency: Currency) {
        precondition(value >= 0, "Amount must be non-negative")
        self.value = value
        self.currency = currency
    }
}

// Prefer enums with associated values for finite state machines
public enum LoadingState<T: Sendable>: Sendable {
    case idle
    case loading
    case success(T)
    case failure(AppError)
}
```

## 2. Protocols and Generics: `some` vs `any`

- Use `some Protocol` (opaque return type) whenever concrete type is fixed at compile time.
- Use `any Protocol` (existential container) only when you truly need dynamic heterogenous collections.

```swift
// Fast, static dispatch:
func render(item: some Renderable) { ... }

// Dynamic box, heap allocation:
var renderables: [any Renderable] = []
```

## 3. Modern Syntax Guidelines

- Use `@Observable` rather than `@StateObject` / `ObservableObject`.
- Use `if let value` shorthand unwrapping.
- Use `consuming` and `borrowing` parameters where zero-copy ownership transfer is performance-critical.
- Use `nonisolated` on actor methods that access immutable properties.

## References

- For in-depth Swift 6 concurrency, actor reentrancy, and structured tasks: see `references/swift-concurrency.md`.
- For modern Swift Testing parameterization and assertions: see `references/swift-testing.md`.
