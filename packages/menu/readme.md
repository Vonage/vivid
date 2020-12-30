# vwc-menu

This component is an extension of [<mwc-menu>](https://github.com/material-components/material-components-web-components/tree/master/packages/menu)

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `absolute`                |           | `boolean`                                        |                                                  |
| `activatable`             |           | `boolean`                                        |                                                  |
| `anchor`                  |           | `HTMLElement \| null`                            |                                                  |
| `corner`                  |           | `"TOP_LEFT" \| "TOP_RIGHT" \| "BOTTOM_LEFT" \| "BOTTOM_RIGHT" \| "TOP_START" \| "TOP_END" \| "BOTTOM_START" \| "BOTTOM_END"` |                                                  |
| `defaultFocus`            |           | `"NONE" \| "LIST_ROOT" \| "FIRST_ITEM" \| "LAST_ITEM"` |                                                  |
| `fixed`                   |           | `boolean`                                        |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `forceGroupSelection`     |           | `boolean`                                        |                                                  |
| `fullwidth`               |           | `boolean`                                        |                                                  |
| `index`                   | readonly  | `MWCListIndex`                                   |                                                  |
| `innerRole`               |           | `"menu" \| "listbox"`                            |                                                  |
| `items`                   | readonly  | `ListItemBase[]`                                 |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`           |                                                  |
| `mdcRoot`                 |           | `MenuSurface`                                    | Root element for MDC Foundation usage.<br /><br />Define in your component with the `@query` decorator |
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
