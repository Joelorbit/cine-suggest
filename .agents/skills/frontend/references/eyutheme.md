# EyuTheme project reference

Read this file only when the target repository explicitly uses EyuTheme or imports its token contract. It is not a default for unrelated projects.

Use `src/lib/tokens.css` as the single source of truth. Reference CSS variables instead of scattering raw color, spacing, radius, shadow, motion, or typography values through components. Preserve the project's dark-by-default behavior and light-mode override conventions when they already exist.

Reuse the repository's existing UI primitives before adding a new component. Typical primitives include buttons, cards, badges, dialogs, inputs, tables, skeletons, empty states, selects, separators, labels, booking cards, and theme controls; verify the actual project exports before relying on a name.

Follow the project's existing font, type-scale, spacing-grid, neutral-ramp, accent, status-color, grain, and pattern tokens. If a needed token is genuinely missing, extend the token source using the existing ramp or mix pattern and document the addition. Never bypass the token layer with a one-off visual value.

Keep component state in and callbacks out, favor composition over inheritance, and use the framework version and styling conventions already present in the repository. Verify both themes, keyboard focus, reduced motion, and contrast after any token or shared-component change.
