# EyuTheme UI Primitives and Component Architecture

## Component Inventory

- **Actions**: `Button`, `IconButton`, `ThemeToggle`, `ThemePicker`
- **Surfaces**: `Card`, `Surface`, `EmptyState`, `Skeleton`, `Separator`
- **Forms**: `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Field`
- **Navigation**: `Tabs`, `Breadcrumb`, `DropdownMenu`, `Popover`, `Sheet`, `Pagination`, `Tooltip`
- **Feedback**: `Alert`, `Toast`, `Progress`, `Spinner`, `StatusDot`
- **Display**: `Table`, `Badge`, `Tag`, `Avatar`, `AvatarGroup`, `Kbd`

## Usage Rules

1. **Consume semantic tokens**: Use `var(--surface-high)`, `var(--primary)`, `var(--radius-md)`. Never use raw hex colors in components.
2. **State coverage**: Every data-driven component must support loading, empty, error, and success states.
3. **Touch targets**: Maintain 44x44px minimum interactive targets.
4. **Accessible labels**: Ensure all interactive controls have accessible names and visible focus rings (`--focus-ring`).
