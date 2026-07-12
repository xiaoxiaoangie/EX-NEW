# EX page patterns

## Application shell

- Expanded sidebar: 260px. Collapsed sidebar: 64px.
- Use white sidebar with a right border; content touches the divider without an artificial gap.
- Active navigation: purple fill/emphasis with white or purple content depending on the existing component treatment.
- Collapsed items show icons only and expose names through accessible tooltips.
- Lists and dashboards consume the full remaining content width.
- Transaction/configuration pages may add the right summary column.

## List and dashboard pages

Order modules as follows:

1. Breadcrumb.
2. Page header with title and right-aligned actions.
3. Optional statistics cards.
4. Filter/search bar.
5. Data table.
6. Footer count and pagination.

Use 8px from breadcrumb to title and 16px between subsequent modules. Use a white table container over the page background. Prefer 10–12px vertical cell padding. Keep statuses compact and timestamps muted.

For filter-heavy operational lists, a filter card may sit directly above the table. Search/reset/export actions remain grouped and predictable.

## Transaction form with summary

- Desktop: form 65%, summary 30%, gap 24px.
- Use 24px container padding.
- Place fields in the left column and calculated values, fees, rate, warnings, and receive amount in the right column.
- Keep the summary sticky only when it remains within its container and does not obscure footer actions.
- Stack summary below the form on narrow screens.
- Clearly label estimated rates and time-sensitive quotes.

## Detail drawer

- Desktop reference width: 720px or about 50% on viewports at least 1440px wide.
- Slide from the right over the list. Do not dim or obscure the entire left list when preserved context is important.
- Add a left shadow such as `-4px 0 16px rgba(0,0,0,.08)`.
- Structure: title/close, information sections, key-value rows, fee table, timeline, footer actions.
- Use uppercase 12px section labels. Purple denotes ordinary sections; amber may denote bank-transfer or warning-related sections.
- KV rows use muted left labels, strong right values, and a 1px bottom divider.
- Make reference codes copyable and provide feedback.
- On mobile, use full width.

## Responsive behavior

- Collapse or overlay the sidebar at tablet/mobile widths.
- Stack multi-column filters and form summaries.
- Preserve table meaning: allow a contained table scroller or switch to row summaries; never shrink text until unreadable.
- Keep primary actions reachable without fixed elements covering content.

## Source images

- `02-order-list.png`: operational filters and table.
- `04-drawer.png`, `05-drawer-spec.png`: detail drawer.
- `06-split-layout.png`: form/summary split.
- `08-shell-layout.png`, `10-list-layout.png`: shell and list structure.

