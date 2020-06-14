# vwc-list-item

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

## Properties

| Property                  | Modifiers | Type                                      |
|---------------------------|-----------|-------------------------------------------|
| `activatable`             |           | `boolean`                                 |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined` |
| `index`                   | readonly  | `MWCListIndex`                            |
| `innerAriaLabel`          |           | `string \| null`                          |
| `innerRole`               |           | `string \| null`                          |
| `itemRoles`               |           | `string \| null`                          |
| `items`                   | readonly  | `ListItemBase[]`                          |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`    |
| `multi`                   |           | `boolean`                                 |
| `noninteractive`          |           | `boolean`                                 |
| `rootTabbable`            |           | `boolean`                                 |
| `selected`                | readonly  | `ListItemBase \| ListItemBase[] \| null`  |
| `wrapFocus`               |           | `boolean`                                 |

## Methods

| Method   | Type                                             |
|----------|--------------------------------------------------|
| `blur`   | `(): void`                                       |
| `focus`  | `(): void`                                       |
| `layout` | `(updateItems?: boolean \| undefined): void`     |
| `select` | `(index: MWCListIndex): void`                    |
| `toggle` | `(index: number, force?: boolean \| undefined): void` |

## Events

| Event      | Description      |
|------------|------------------|
| `action`   | {ActionDetail}   |
| `selected` | {SelectedDetail} |
