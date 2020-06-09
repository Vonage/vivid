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
| `ripple`                  |           | `unknown`                                 |
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
| `ripple`                  |           | `unknown`                                 |
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
