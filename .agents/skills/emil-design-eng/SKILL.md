---
name: emil-design-eng
description: >-
  Emil Kowalski's design engineering philosophy on UI polish, component feel, animation decisions, and compounding craft details.
  Activate when building or reviewing UI components, refining interaction feel, fixing motion mistakes, or elevating visual craft.
---

# Design Engineering: Invisible Craft and Interaction Polish

## Core Philosophy

### Taste is trained, not innate

Good taste is not personal preference. It is a trained instinct: the ability to recognize what elevates an interface. When building UI, don't just make it work. Study why the best interfaces feel the way they do, reverse engineer animations, and inspect interactions.

### Unseen details compound

Most details users never consciously notice. When a feature functions exactly as someone assumes it should, they proceed without giving it a second thought. Every decision below exists because the aggregate of invisible correctness creates interfaces people love.

### Beauty is leverage

People select tools based on the overall experience, not just functionality. Good defaults and good animations are real differentiators. Use beauty as leverage to stand out in a sea of slop.

## Review Format (Required)

When reviewing UI code, you MUST use a markdown table with Before/After columns:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Specify exact properties; avoid `all` |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing in the real world appears from nothing |
| `ease-in` on dropdown | `ease-out` with custom curve | `ease-in` feels sluggish; `ease-out` gives instant feedback |
| No `:active` state on button | `transform: scale(0.97)` on `:active` | Buttons must feel responsive to press |
| `transform-origin: center` on popover | `transform-origin: var(--transform-origin)` | Popovers scale from trigger (modals remain centered) |

## The Animation Decision Framework

### 1. Should this animate at all?

| Frequency | Decision |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette toggle) | No animation. Ever. |
| Tens of times/day (hover effects, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare/first-time (onboarding, feedback forms, celebrations) | Can add delight |

**Never animate keyboard-initiated actions.** Raycast has no open/close animation; that is optimal for high-frequency actions.

### 2. What is the purpose?

Every animation must have a clear answer to "why does this animate?":
- **Spatial consistency**: Toast enters/exits in consistent direction.
- **State indication**: Morphing button indicates state change.
- **Feedback**: Button scales down on press.
- **Preventing jarring changes**: Smooth transitions prevent sudden teleports.

### 3. What easing should it use?

- **Entering or exiting**: `ease-out` (starts fast, feels responsive)
- **Moving/morphing on screen**: `ease-in-out`
- **Hover/color change**: `ease`
- **Constant motion**: `linear`
- **Default**: `ease-out`

**Never use `ease-in` for UI animations.** Use custom easing curves for punchy feel:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

### 4. Duration and perceived performance

| Element | Duration |
| --- | --- |
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |

**Rule: UI animations should stay under 300ms.** A 180ms dropdown feels significantly more responsive than a 400ms one.

## Spring Animations

Springs simulate physical mass and damping, maintaining velocity through interruptions:

```js
{ type: "spring", duration: 0.5, bounce: 0.2 }        // Apple-style
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }  // Physics-based
```

See `references/spring-mechanics.md` for velocity calculations, drag physics, and damping at boundaries.

## Component Building Principles

### Buttons must feel responsive
Add `transform: scale(0.97)` on `:active` with `transition: transform 160ms ease-out`.

### Never animate from scale(0)
Start from `scale(0.95)` with `opacity: 0`.

### Make popovers origin-aware
Popovers scale from trigger (`var(--transform-origin)`). Modals keep `transform-origin: center`.

### Tooltips: skip delay on subsequent hovers
Delay initial tooltip; subsequent adjacent hovers open with 0ms delay.

### Use CSS transitions over keyframes
Transitions retarget smoothly when interrupted. Keyframes restart from zero.

### Use blur to mask imperfect transitions
Subtle `filter: blur(2px)` blends crossfading states smoothly.

### Animate enter states with @starting-style
```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

## Performance & Accessibility

- **Animate only transform and opacity.** (See `references/transforms-and-clipping.md` for percentage translations and clip-path techniques.)
- **Hardware acceleration in Motion:** Use `animate={{ transform: "translateX(100px)" }}` instead of `x`/`y` shorthand under load.
- **CSS animations beat JS under load.**
- **prefers-reduced-motion:** Retain gentle opacity fades; remove transform shifts.
- **Hover gating:** Use `@media (hover: hover) and (pointer: fine)` to avoid tap stickiness on mobile.

## Stagger Animations

Stagger appearance of lists with short delays (30–80ms). Never block user interaction during stagger.

## References and Checklist

- For transform mastery, 3D effects, and `clip-path` tabs/hold-to-delete: see `references/transforms-and-clipping.md`.
- For momentum dismissal and drag damping: see `references/spring-mechanics.md`.
- For DevTools slow-mo inspection and complete review table: see `references/review-checklist.md`.
