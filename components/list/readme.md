# vwc-list-item

This component is an extension of [<mwc-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)

## Properties

| Property                  | Modifiers | Type                                      |
|---------------------------|-----------|-------------------------------------------|
| `activated`               |           | `boolean`                                 |
| `disabled`                |           | `boolean`                                 |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined` |
| `graphic`                 |           | `GraphicType`                             |
| `group`                   |           | `string \| null`                          |
| `hasMeta`                 |           | `boolean`                                 |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`    |
| `multipleGraphics`        |           | `boolean`                                 |
| `noninteractive`          |           | `boolean`                                 |
| `ripple`                  |           | `Promise<Ripple \| null>`                 |
| `selected`                |           | `boolean`                                 |
| `tabindex`                |           | `number`                                  |
| `text`                    | readonly  | `string`                                  |
| `twoline`                 |           | `boolean`                                 |
| `value`                   |           | `string`                                  |

## Events

| Event                | Description             |
|----------------------|-------------------------|
| `list-item-rendered` |                         |
| `request-selected`   | {RequestSelectedDetail} |


# vwc-list

This component is an extension of [<mwc-list>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)

## Properties

| Property                  | Modifiers | Type                                           |
|---------------------------|-----------|------------------------------------------------|
| `activatable`             |           | `boolean`                                      |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`      |
| `index`                   | readonly  | `MWCListIndex`                                 |
| `innerAriaLabel`          |           | `string \| null`                               |
| `innerRole`               |           | `string \| null`                               |
| `itemRoles`               |           | `string \| null`                               |
| `items`                   | readonly  | `ListItemBase[]`                               |
| `layout`                  |           | `(updateItems?: boolean \| undefined) => void` |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`         |
| `multi`                   |           | `boolean`                                      |
| `noninteractive`          |           | `boolean`                                      |
| `rootTabbable`            |           | `boolean`                                      |
| `selected`                | readonly  | `ListItemBase \| ListItemBase[] \| null`       |
| `wrapFocus`               |           | `boolean`                                      |

## Methods

| Method                | Type                                             |
|-----------------------|--------------------------------------------------|
| `blur`                | `(): void`                                       |
| `focus`               | `(): void`                                       |
| `focusItemAtIndex`    | `(index: number): void`                          |
| `getFocusedItemIndex` | `(): number`                                     |
| `layout`              | `(updateItems?: boolean \| undefined): void`     |
| `select`              | `(index: MWCListIndex): void`                    |
| `toggle`              | `(index: number, force?: boolean \| undefined): void` |

## Events

| Event           | Description      |
|-----------------|------------------|
| `action`        | {ActionDetail}   |
| `items-updated` |                  |
| `selected`      | {SelectedDetail} |
