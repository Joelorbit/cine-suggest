# EyuTheme Tokens and Surface Hierarchy

## Surface Hierarchy Roles

EyuTheme avoids generic flat backgrounds by providing a 5-tier elevation stack:

| Token | Purpose | Typical Dark Value |
| --- | --- | --- |
| `--surface-lowest` | Canvas backdrop, deep page container | `color-mix(in srgb, var(--canvas-bg) 92%, #000 8%)` |
| `--surface-low` | Inset panels, subtle grouping areas | `color-mix(in srgb, var(--canvas-bg) 96%, var(--primary) 4%)` |
| `--surface-default` | Standard cards, containers, base layers | `var(--canvas-bg)` |
| `--surface-high` | Elevated cards, interactive panels, dropdowns | `color-mix(in srgb, var(--canvas-bg) 88%, #fff 12%)` |
| `--surface-highest` | Modals, active popovers, floating sheets | `color-mix(in srgb, var(--canvas-bg) 80%, #fff 20%)` |

## Semantic Color Roles

Always pair foreground roles with their parent fill:

- `--primary` / `--on-primary`
- `--primary-container` / `--on-primary-container`
- `--secondary` / `--on-secondary`
- `--tertiary` / `--on-tertiary`
- `--status-success` / `--status-warning` / `--status-danger` / `--status-info`

## Typography Ramps

- Display: `'Outfit', sans-serif` (`--font-display`)
- Body: `'Lexend', sans-serif` (`--font-body`)
- Code: `'JetBrains Mono', monospace` (`--font-mono`)

## 8pt Spacing Rhythm

`--space-1` (0.25rem), `--space-2` (0.5rem), `--space-3` (0.75rem), `--space-4` (1rem), `--space-6` (1.5rem), `--space-8` (2rem), `--space-12` (3rem), `--space-16` (4rem).

## Tactile Patterns

- `var(--circuit-pattern)` — Digital circuit node traces
- `var(--dot-pattern)` — 24px micro circle grid
- `var(--blueprint-pattern)` — 32px architectural grid lines
- `var(--hatch-pattern)` — 45-degree diagonal crosshatch
- `var(--topo-pattern)` — Topographic elevation contour lines
- `var(--grain-svg)` — High-frequency digital noise
