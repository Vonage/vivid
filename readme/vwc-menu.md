# vwc-menu

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
| `multi`                   |           | `boolean`                                        |                                                  |
| `open`                    |           | `boolean`                                        |                                                  |
| `quick`                   |           | `boolean`                                        |                                                  |
| `ripple`                  |           | `unknown`                                        |                                                  |
| `selected`                | readonly  | `ListItemBase \| ListItemBase[] \| null`         |                                                  |
| `slotElement`             |           | `HTMLSlotElement \| null`                        |                                                  |
| `wrapFocus`               |           | `boolean`                                        |                                                  |
| `x`                       |           | `number \| null`                                 |                                                  |
| `y`                       |           | `number \| null`                                 |                                                  |

## Methods

| Method   | Type                                         |
|----------|----------------------------------------------|
| `close`  | `(): void`                                   |
| `layout` | `(updateItems?: boolean \| undefined): void` |
| `select` | `(index: MWCListIndex): void`                |
| `show`   | `(): void`                                   |

## Events

| Event      | Description      |
|------------|------------------|
| `action`   | {ActionDetail}   |
| `closed`   |                  |
| `opened`   |                  |
| `selected` | {SelectedDetail} |


# vwc-menu

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
| `multi`                   |           | `boolean`                                        |                                                  |
| `open`                    |           | `boolean`                                        |                                                  |
| `quick`                   |           | `boolean`                                        |                                                  |
| `ripple`                  |           | `unknown`                                        |                                                  |
| `selected`                | readonly  | `ListItemBase \| ListItemBase[] \| null`         |                                                  |
| `slotElement`             |           | `HTMLSlotElement \| null`                        |                                                  |
| `wrapFocus`               |           | `boolean`                                        |                                                  |
| `x`                       |           | `number \| null`                                 |                                                  |
| `y`                       |           | `number \| null`                                 |                                                  |

## Methods

| Method   | Type                                         |
|----------|----------------------------------------------|
| `close`  | `(): void`                                   |
| `layout` | `(updateItems?: boolean \| undefined): void` |
| `select` | `(index: MWCListIndex): void`                |
| `show`   | `(): void`                                   |

## Events

| Event      | Description      |
|------------|------------------|
| `action`   | {ActionDetail}   |
| `closed`   |                  |
| `opened`   |                  |
| `selected` | {SelectedDetail} |
