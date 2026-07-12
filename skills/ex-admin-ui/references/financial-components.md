# Financial components

## Status tags

Use compact pill tags with an icon/dot plus text:

- Completed/available: green.
- Processing: purple or neutral, depending on product semantics.
- Awaiting payment/pending review: amber.
- Expired/inactive: gray.
- Failed/rejected/destructive: red.

Define canonical status text and map backend codes centrally. Never infer financial state only from color.

## Amounts and balances

- Display `1,500.00 USD`, not a bare `1,500`.
- Keep asset code adjacent to the amount.
- For a token balance, optionally show fiat valuation as secondary muted text.
- Separate available, frozen, in-transit, and pending-settlement values.
- Never combine balances across SP, custodian, legal entity, or chain into one spendable figure. A total valuation may be shown only when labeled as valuation.
- Show overpaid/underpaid as a secondary state next to the received amount, not as the primary order status.

## Currency selectors

- Square flag tags: 4px radius, 1px border, 12px horizontal and 6px vertical padding, 10px gap.
- Selected: purple border plus purple tint.
- Show flag, localized currency name, and ISO code.
- Dropdown rows may use circular flag holders; selected rows need a checkmark and tinted background.
- Treat flags as supporting cues; ISO codes remain authoritative.

## Token identity

- Approved token colors from the references: USDC `#2775CA`, USDT `#26A17B`.
- Token logo sizes: 48px prominent wallet, 36px medium, 28px list, 20px inline.
- Token cards: selected state uses a 2px purple border and purple tint; default uses neutral border and white surface.
- Always show token code. Do not use a generic dollar icon without the asset label.

## Network identity

- Display token and network as separate decisions, e.g. `USDT` and `Tron (TRC20)`.
- Network cards include icon, network name, and protocol label.
- Selected network uses purple border/tint plus a semantic selected indicator.
- Before deposit or withdrawal confirmation, repeat both asset and network prominently.

## Orders and fees

- Keep ordered amount, paid/received amount, fee, rate, and estimated receive in distinct fields.
- State whether a rate is indicative, reserved, or executed.
- In drawers, group order summary, exchange information, bank-transfer information, fees, and timeline into separate sections.
- Keep expiry timestamps and irreversible warnings visually prominent but not decorative.

## SP and account identity

- In merchant-facing navigation, products may be named Default Account and Other Capabilities.
- In account details, operations views, contracts, and every balance-bearing surface, disclose the actual SP/legal entity.
- Present Home SP and Other SP accounts separately. Do not silently route a Home SP balance through another SP.

## Source images

- `02-order-list.png`: order and payment statuses.
- `04-drawer.png`: financial KV groups.
- `12-currency.png`: currency tags and rows.
- `13-token-network.png`: token and network components.

