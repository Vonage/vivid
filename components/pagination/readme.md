### `vwc-pagination`

`vwc-pagination` component dedicated to provide paged view state representation and management.

This component would be used with another, relevant, layouts, like `vwc-data-grid`, while both components would establish interoperability based on the APIs described here.

### Structure

`vwc-pagination` is an inline block component.

`vwc-pagination` component is featured with navigational controls (move to previous page, move to next page) and a listed, ellipsed representation of pages (numeric, 1-based).

### API

`vwc-pagination` is rolling around the __total__ number of pages and the currently __selected__ page.

#### Attributes / Properties

| Property        | Attribute        | Type     | Default | Description |
|-----------------|------------------|----------|---------|-------------|
| `total`         | `total`          | `number` | `0`     | total number of pages, as provided by the consuming application
| `selectedIndex` | `selected-index` | `number` | `-1`    | currently selected page; always has some numeric value except when the `total` is `0`; number reflects a 0-based index (when the first page selected, `selected` equals to `0`) |
|                 | `prev-disabled`  | presence | managed | an auto managed attribute for a custom styling/logic; will be placed when 'go to previous page' control should be disabled, otherwise removed |
|                 | `next-disabled`  | presence | managed | an auto managed attribute for a custom styling/logic; will be placed when 'go to next page' control should be disabled, otherwise removed |

> Note: if the `total` is adjusted to smaller number and `selected` appears to be out of range, the `selected` is set to the closest new available page (`change` event is fired as appropriate)

#### Events

| Event    | Description |
|----------|-------------|
| `change` | fired each time selected page changed (also when the initial selection happens, or when total is changed and as an outcome the selected page changed; `event.detail: { selectedIndex: number; total: number })` |

#### Customization

`vwc-pagination` component allows customly slotted prev/next controls (see slots description below).
In order to allow custom styling/behaviour of those parts, there are 2 managed component level attributes: `prev-disabled` / `next-disabled` (see above).

##### Slots

`vwc-pagination` allows the customization via the slots.

| Slot name      | Description |
|----------------|-------------|
| `prev-control` | allows to override the default layout of the 'go to previous page' control button |
| `next-control` | allows to override the default layout of the 'go to next page' control button |
