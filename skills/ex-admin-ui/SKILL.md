---
name: ex-admin-ui
description: Design, implement, or review EX payment-platform admin interfaces using the approved purple enterprise visual system. Use for EX merchant portals, tenant portals, PSP/MSO/OTC operations consoles, dashboards, list pages, forms, order details, drawers, wallet and balance pages, currency/token/network selectors, or when converting EX product requirements and screenshots into frontend UI code or design specifications.
---

# EX Admin UI

Build restrained, high-density enterprise payment interfaces that match the EX reference screens.

## Workflow

1. Inspect the target repository, framework, existing components, and tokens before editing.
2. Classify the page: list/dashboard, form/transaction, detail drawer, wallet/balance, or settings.
3. Read only the relevant references:
   - Always read [visual-system.md](references/visual-system.md).
   - Read [page-patterns.md](references/page-patterns.md) for shell, list, form, or drawer work.
   - Read [financial-components.md](references/financial-components.md) for status, currencies, tokens, networks, balances, or money formatting.
4. Reuse the repository's component system and icons. Extend existing tokens before introducing parallel CSS.
5. Implement responsive behavior, keyboard access, loading/empty/error states, and realistic financial data states.
6. Render or run the page, compare against the applicable images in `assets/reference-screens/`, and fix visual drift.

## Non-negotiable rules

- Use brand purple `#7A1DED` for primary actions, active navigation, selected controls, links, and focus emphasis. Use it sparingly.
- Keep content backgrounds neutral: page `#F7F8FA`, cards/surfaces white, borders `#E5E7EB`.
- Preserve one financial source of truth. Never visually merge balances held by different SPs, legal entities, wallets, or networks into one spendable balance.
- Make currency, token, network, status, amount, fee, rate, and service-provider identity unambiguous.
- Use semantic components and accessible names; never encode status or selection by color alone.
- Do not invent gradients, glass effects, oversized marketing typography, decorative illustrations, dense shadows, or excessive cards.
- Do not copy screenshot mojibake or accidental encoding errors.
- Treat screenshot dimensions as desktop reference values, then adapt intentionally for narrower screens.

## Page decisions

- Use a full-width content area for lists and dashboards.
- Use a 65/30 split with a 24px gap for transaction forms that need a live summary.
- Use a right drawer for secondary order inspection that must preserve list context.
- Keep one merchant's primary money flow within its Home SP; represent exceptional SP accounts as explicit separate accounts.
- Expose SP identity wherever legal entity, account ownership, balance, routing, fee, or settlement capability differs.

## Delivery checklist

- Match tokens, spacing, radius, hierarchy, and component states.
- Show hover, focus, active, disabled, loading, empty, error, and destructive states where applicable.
- Format money with currency code; distinguish fiat from token amounts.
- Keep table headers visible and row actions predictable.
- Confirm drawer and dropdown layering, clipping, focus, and dismissal.
- Verify desktop and mobile layouts without horizontal page overflow.
- Run available lint, typecheck, tests, and a visual check before handing off.

