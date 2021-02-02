# `vwc-menu`

`vwc-menu` is a surfacing menu component, showing up on demand, eg upon user action.
`vwc-menu` fetured with an internal list, while all LightDOM elements of it become children of that list.

> This component is an extension of [\<mwc-menu\>](https://github.com/material-components/material-components-web-components/tree/master/packages/menu).

# Usage

Usage example:
```html
<vwc-menu>
	<vwc-list-item>Item 1</vwc-list-item>
	<vwc-list-item>Item 2</vwc-list-item>
	<vwc-list-item>Item 3</vwc-list-item>
	<vwc-list-item>Item 4</vwc-list-item>
</vwc-menu>
```

`vwc-list-item` should be used for the menu items, putting any of you custom content within, including rich HTML if needed.

> It is still consumer's responsibility to initiate `vwc-list-item`, as any other Vivid component.

Initiate `vwc-menu` to be available in your component/application:
```javascript
import '@vonage/vwc-menu';

//	or, to be able to use casting in TypeScript, do

import { VWCMenu } from '@vonage/vwc-menu';

import '@vonage/vwc-list/vwc-list-item.js';
```

# API

`vwc-menu` exposes several APIs to provide its fuctionality, namely properties, methods and events.

## Properties

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

## Methods

| Method                | Type                                         |
|-----------------------|----------------------------------------------|
| `close`               | `(): void`                                   |
| `focusItemAtIndex`    | `(index: number): void`                      |
| `getFocusedItemIndex` | `(): number`                                 |
| `layout`              | `(updateItems?: boolean \| undefined): void` |
| `select`              | `(index: MWCListIndex): void`                |
| `show`                | `(): void`                                   |

## Events

| Event           | Description      |
|-----------------|------------------|
| `action`        | {ActionDetail}   |
| `closed`        |                  |
| `items-updated` |                  |
| `opened`        |                  |
| `selected`      | {SelectedDetail} |
