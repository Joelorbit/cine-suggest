---
name: frontend
description: >-
  Frontend engineering for interaction states, component composition, accessibility, responsive layout, and client performance.
  Activate when building or reviewing UI, forms, client data flows, or browser-facing behavior.
---

# Frontend: Usable and Resilient Interfaces

## Default workflow

1. Inspect the existing framework, design tokens, component library, routing, data-fetching conventions, and browser support targets.
2. Define the user task, semantic structure, interaction states, validation behavior, and keyboard path before styling.
3. Compose existing primitives before creating new ones; keep data fetching and state orchestration separate from presentational components.
4. Implement mobile-first responsive behavior and accessible semantics, then verify loading, empty, error, success, partial, offline, and permission states.
5. Check performance, reduced motion, focus management, and real viewport behavior with the project's available tooling.

## State coverage

Every network- or input-driven feature must intentionally handle:

| State | Required behavior |
| --- | --- |
| Loading | Preserve layout, show progress, and prevent duplicate mutation. |
| Empty | Explain why there is no content and offer the next useful action. |
| Error | Use a non-technical message, preserve recoverability, and provide retry or support context. |
| Success | Show the result and confirm important mutations. |
| Partial | Render available content without implying missing data is complete. |
| Offline or unauthorized | Explain the condition and disable or redirect actions safely. |

## Composition and responsive rules

Prefer semantic HTML and explicit, typed props. Keep components focused; split a component when its state, markup, or responsibility becomes difficult to test, not only when it crosses an arbitrary line count. Use the project's tokens and layout primitives rather than scattering raw colors, spacing, radii, or breakpoints. Design from small viewports upward, prevent horizontal overflow at widths above **320px**, and make interactive targets at least **44×44 CSS pixels** where the platform allows.

## Accessibility baseline

Use native buttons, links, labels, headings, landmarks, and form controls before ARIA. Ensure every control has an accessible name, keyboard operation, visible high-contrast focus indicator, and useful error association. Meet WCAG AA contrast targets of **4.5:1** for normal text and **3:1** for large text. Manage focus after dialogs, route changes, and validation failures. Respect `prefers-reduced-motion`; never communicate essential meaning only through color or animation.

## Performance baseline

Reserve image dimensions to avoid layout shift, use responsive sources and modern formats where supported, lazy-load below-the-fold work, and avoid shipping a large dependency for a small capability. Measure before optimizing. Treat bundle size, interaction latency, and cumulative layout shift as project-specific budgets rather than universal magic numbers.

## Design-system rule

Follow the target repository's existing design system. If the project explicitly uses EyuTheme, read `references/eyutheme.md` before changing visual tokens or shared components. If it uses another system, use that system instead; do not import EyuTheme or invent a second theme.

## Done when

The feature works across its defined viewports and input methods, all relevant states are covered, semantics and keyboard access are correct, visual tokens are reused, performance regressions are checked, and automated or manual verification is recorded.
