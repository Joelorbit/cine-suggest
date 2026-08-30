---
name: eyutheme
description: >-
  Design and implement interfaces using Joel's EyuTheme design system.
  Activate when applying EyuTheme tokens, the 24 luxury dark/light colorways, surface elevation hierarchy, tactile background textures, or composable UI components.
---

# EyuTheme: Tactile, Luxury, Token-Driven Design System

EyuTheme (Joelorbit/Mytheme) is a rich, tokenized design system built on dark-first luxury mineral/earth palettes, 5-tier surface elevation hierarchies, tactile background textures, and accessible UI primitives.

## The Core Contract

1. **Semantic roles before raw hex values.** Components reference semantic CSS variables (`--primary`, `--surface-high`, `--content-muted`) rather than raw hex values.
2. **Surface elevation hierarchy.** Use the 5-step surface ramp (`--surface-lowest` to `--surface-highest`) to create physical depth without harsh solid borders.
3. **Paired dark/light canvases.** Every one of the 24 theme presets has an explicit companion light mode canvas that preserves contrast and identity.
4. **Tactile textures with restraint.** Apply technical patterns (circuit, dots, blueprint, hatch, grain) as subtle atmospheric overlays (`opacity: 0.15–0.4`).
5. **Compounding motion polish.** Marry EyuTheme tokens with Emil Kowalski's animation rules (`scale(0.97)` active states, 160ms ease-out transitions, origin-aware popovers).

## The 24 Handcrafted Themes

Default dark theme: `indigo-velvet` (Midnight obsidian, cyber violet, neon teal).
Default light theme: `eyu-light` (Golden ochre warm sand canvas).

Key theme colorways include:
- `indigo-velvet`: Midnight obsidian with cyber violet & neon teal
- `moss-stone`: Highland moss green with stone lichen & alpine fern
- `cyber-olive`: Tactical dark moss with cyber lime energy
- `solar-ochre`: Warm umber with glowing ochre & desert amber
- `emerald-sage`: Obsidian emerald with frost mint & pine gold
- `terracotta-rust`: Fired terracotta clay with burnt sienna
- `crimson-obsidian`: Volcanic shadow with blood ruby red & warm brass
- `monochrome-slate`: Industrial graphite with cold chalk & steel

For the full catalog of all 24 themes with hex specifications: see `references/themes-catalog.md`.

## Surface Elevation & Token Architecture

| Level | CSS Token | Use Case |
| --- | --- | --- |
| Canvas | `--surface-lowest` | App backdrop, shell background |
| Inset | `--surface-low` | Grouped list backgrounds, inset cards |
| Base | `--surface-default` | Default card surfaces, containers |
| Raised | `--surface-high` | Elevated panels, dropdown menus, interactive cards |
| Floating | `--surface-highest` | Dialogs, modals, floating toast surfaces |

For complete token specifications (typography, 8pt spacing grid, radii, shadows): see `references/tokens-guide.md`.

## Theme Controller Integration

```ts
import { applyTheme, toggleMode, readStoredTheme, readStoredMode } from './lib/theme';

// Apply theme safely
applyTheme('indigo-velvet', true, 'dark');

// Toggle dark/light mode
const currentTheme = readStoredTheme('indigo-velvet');
const nextTheme = toggleMode(currentTheme);
applyTheme(nextTheme);
```

## Component Architecture

EyuTheme components are composable, typed, and accessible:
- Use semantic HTML buttons, inputs, landmarks.
- Pair foreground tokens with background tokens (`--on-primary` on `--primary`).
- For component library inventory and snippets: see `references/components.md`.

## Done When

- The UI consumes semantic tokens from `tokens.css` with zero hardcoded hex colors in feature components.
- The 5-tier surface hierarchy is preserved.
- Both dark and light mode expressions are verified for contrast (WCAG AA).
- Responsive behavior is verified from 320px upward.
