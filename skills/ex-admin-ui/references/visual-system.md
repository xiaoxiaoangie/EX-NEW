# EX visual system

## Tokens

| Role | Value | Usage |
| --- | --- | --- |
| Brand purple | `#7A1DED` | Primary CTA, active nav, selected state, links |
| Purple soft | `#A64BFF` | Secondary accent only |
| Purple tint | `#F3F0FF` | Selected backgrounds and soft emphasis |
| Page background | `#F7F8FA` | App content canvas |
| Surface | `#FFFFFF` | Cards, tables, drawers, menus |
| Strong text | `#1F2937` | Titles, amounts, key values |
| Body text | `#374151` | Labels and normal content |
| Muted text | `#6B7280` | Supporting text |
| Placeholder | `#9CA3AF` | Placeholder and disabled metadata |
| Border | `#E5E7EB` | Dividers, inputs, cards |
| Success | green family | Completed, available, positive match |
| Warning | amber family | Awaiting, estimated, review needed |
| Danger | red family | Failed, destructive, expired deadline |

Use semantic project tokens when present. Map these values into the existing token layer rather than scattering literals.

## Typography

- Use the product's existing sans-serif stack.
- Keep page titles and amounts visually strongest; use medium/semi-bold weight instead of oversized type.
- Typical interface text: 13–14px; section labels: 12–13px; page titles: 20–24px.
- Use tabular numerals for financial amounts and timestamps when supported.
- Keep bilingual labels concise; do not duplicate every label unless required.

## Spacing and radius

- Base page padding: 24px.
- Default vertical module gap: 16px.
- Breadcrumb to page header: 8px.
- Form field vertical gap: 16–20px.
- Split-page column gap: 24px.
- Standard radius: 8px; compact tags: 4px; large containers may use 12px.
- Use borders for hierarchy. Reserve soft shadow for floating menus and drawers.

## Controls

- Inputs: white surface, 1px border, 8px radius, clear label, visible focus ring.
- Primary buttons: purple background, white label, 42px preferred form height.
- Secondary/cancel buttons: white background, neutral border/text, 36–40px height.
- In paired form actions, place the larger primary action left and the smaller secondary action right, with 16px gap.
- Tags and segmented selections use border plus tinted selected background; do not rely on text color alone.

## Interaction

- Use 200–300ms ease transitions for drawer and sidebar movement.
- Keep menus 224px wide by default, 8px radius, and a soft elevation shadow.
- Provide visible focus states, Escape dismissal for transient surfaces, and focus return to the trigger.

## Source images

- `01-brand-colors.png`: palette.
- `03-buttons.png`: primary/secondary actions.
- `07-user-dropdown.png`: profile trigger and menu.
- `09-sidebar-spec.png`: navigation states.
- `11-spacing.png`: list-page spacing rhythm.

