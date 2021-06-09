### `vwc-dropdown`

`vwc-dropdown` is a surfacing content component, dropdown, showing up on demand, eg upon user action.
`vwc-dropdown`, in contrast to `vwc-menu`, allows a free content provided by consumer, while structuring the internal body with slots: `header`, `footer` and the default content.

### Usage

Usage example:
```html
<vwc-menu>
	<vwc-textfield slot="header">Item 1</vwc-textfield>
	<div>
		any HTML content can go here as main body
	</div>
	<vwc-button slot="footer">Done</vwc-button>
</vwc-menu>
```

Initiate `vwc-dropdown` to be available in your component/application:
```javascript
import '@vonage/vwc-dropdown';

//	or, to be able to use casting in TypeScript, do

import { VWCDropdown } from '@vonage/vwc-dropdown';
```

### API

`vwc-dropdown` exposes several APIs to provide its fuctionality, namely properties, methods and events.

#### Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `absolute`                |           | `boolean`                                        |                                                  |
| `activatable`             |           | `boolean`                                        |                                                  |
| `anchor`                  |           | `HTMLElement \| null`                            |                                                  |
| `corner`                  |           | `"TOP_LEFT" \| "TOP_RIGHT" \| "BOTTOM_LEFT" \| "BOTTOM_RIGHT" \| "TOP_START" \| "TOP_END" \| "BOTTOM_START" \| "BOTTOM_END"` |                                                  |
| `defaultFocus`            |           | `"NONE" \| "LIST_ROOT" \| "FIRST_ITEM" \| "LAST_ITEM"` |                                                  |
| `fixed`                   |           | `boolean`                                        |                                                  |
| `forceGroupSelection`     |           | `boolean`                                        |                                                  |
| `fullwidth`               |           | `boolean`                                        |                                                  |
| `index`                   | readonly  | `MWCListIndex`                                   |                                                  |
| `innerRole`               |           | `"menu" \| "listbox"`                            |                                                  |
| `items`                   | readonly  | `ListItemBase[]`                                 |                                                  |
| `menuCorner`              |           | `MenuCorner`                                     |                                                  |
| `multi`                   |           | `boolean`                                        |                                                  |
| `open`                    |           | `boolean`                                        |                                                  |
| `quick`                   |           | `boolean`                                        |                                                  |
| `selected`                | readonly  | `ListItemBase \| ListItemBase[] \| null`         |                                                  |
| `slotElement`             |           | `HTMLSlotElement \| null`                        |                                                  |
| `wrapFocus`               |           | `boolean`                                        |                                                  |
| `x`                       |           | `number \| null`                                 |                                                  |
| `y`                       |           | `number \| null`                                 |                                                  |

#### Methods

| Method                | Type                                         |
|-----------------------|----------------------------------------------|
| `close`               | `(): void`                                   |
| `focusItemAtIndex`    | `(index: number): void`                      |
| `getFocusedItemIndex` | `(): number`                                 |
| `layout`              | `(updateItems?: boolean \| undefined): void` |
| `select`              | `(index: MWCListIndex): void`                |
| `show`                | `(): void`                                   |

#### Events

| Event           | Description      |
|-----------------|------------------|
| `action`        | {ActionDetail}   |
| `closed`        |                  |
| `opened`        |                  |
| `selected`      | {SelectedDetail} |
