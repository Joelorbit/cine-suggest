# Swift Testing Framework Guide

## 11. Swift Testing by Default

Use the modern `Testing` module (`import Testing`) rather than XCTest for new tests.

```swift
import Testing

struct PaymentFlowTests {
    @Test("Validates currency conversion rate", arguments: [
        (Currency.usd, 1.0),
        (Currency.eur, 0.92),
        (Currency.gbp, 0.78)
    ])
    func currencyConversion(currency: Currency, rate: Double) async throws {
        let converted = try await Converter.rate(for: currency)
        #expect(converted == rate)
    }

    @Test func paymentCancellationRollsBackLedger() async throws {
        let account = BankAccount(initialBalance: 100)
        await #expect(throws: PaymentError.insufficientFunds) {
            try await account.charge(150)
        }
        #expect(account.balance == 100)
    }
}
```

Key features:
- `#expect(...)` replaces verbose `XCTAssertEqual`, `XCTAssertTrue`, etc.
- `@Test` with tags, display names, and parameterized arguments.
- Async and throwing tests are native without expectation helpers.
