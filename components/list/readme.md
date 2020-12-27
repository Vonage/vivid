This component is an extension of [<mwc-check-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)

## Properties

| Property           | Modifiers | Type                      |
| ------------------ | --------- | ------------------------- |
| `activated`        |           | `boolean`                 |
| `disabled`         |           | `boolean`                 |
| `graphic`          |           | `GraphicType`             |
| `group`            |           | `string \| null`          |
| `hasMeta`          |           | `boolean`                 |
| `left`             |           | `boolean`                 |
| `multipleGraphics` |           | `boolean`                 |
| `noninteractive`   |           | `boolean`                 |
| `ripple`           |           | `Promise<Ripple \| null>` |
| `selected`         |           | `boolean`                 |
| `tabindex`         |           | `number`                  |
| `text`             | readonly  | `string`                  |
| `twoline`          |           | `boolean`                 |
| `value`            |           | `string`                  |

## Events

| Event                | Type                    |
| -------------------- | ----------------------- |
| `list-item-rendered` |                         |
| `request-selected`   | `RequestSelectedDetail` |

# vwc-list-expansion-panel

This component support expand-collapse list

## Properties

| Property             | Type                                 |
| -------------------- | ------------------------------------ |
| `headerListItemIcon` | `VWCIcon \| undefined`               |
| `headerNodes`        | `HTMLElement[] \| null \| undefined` |
| `open`               | `boolean`                            |

## Methods

| Method        | Type                      | Description                                                                                                                                                                  |
| ------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `close`       | `(): void`                |                                                                                                                                                                              |
| `notifyClose` | `(): void`                |                                                                                                                                                                              |
| `notifyOpen`  | `(): void`                |                                                                                                                                                                              |
| `openChanged` | `(isOpen: boolean): void` | Invoked when the element open state is updated.<br /><br />Expressions inside this method will trigger upon open state change<br /><br />**\_isOpen**: Boolean of open state |
| `show`        | `(): void`                |                                                                                                                                                                              |

# vwc-list-item

This component is an extension of [<mwc-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)

## Properties

| Property           | Modifiers | Type                      |
| ------------------ | --------- | ------------------------- |
| `activated`        |           | `boolean`                 |
| `disabled`         |           | `boolean`                 |
| `graphic`          |           | `GraphicType`             |
| `group`            |           | `string \| null`          |
| `hasMeta`          |           | `boolean`                 |
| `multipleGraphics` |           | `boolean`                 |
| `noninteractive`   |           | `boolean`                 |
| `ripple`           |           | `Promise<Ripple \| null>` |
| `selected`         |           | `boolean`                 |
| `tabindex`         |           | `number`                  |
| `text`             | readonly  | `string`                  |
| `twoline`          |           | `boolean`                 |
| `value`            |           | `string`                  |

## Events

| Event                | Type                    |
| -------------------- | ----------------------- |
| `list-item-rendered` |                         |
| `request-selected`   | `RequestSelectedDetail` |

# vwc-list

This component is an extension of [<mwc-list>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)

## Properties

| Property          | Modifiers | Type                                                        |
| ----------------- | --------- | ----------------------------------------------------------- |
| `activatable`     |           | `boolean`                                                   |
| `debouncedLayout` |           | `(updateItems?: boolean \| undefined) => void \| undefined` |
| `emptyMessage`    |           | `string \| undefined`                                       |
| `index`           | readonly  | `MWCListIndex`                                              |
| `innerAriaLabel`  |           | `string \| null`                                            |
| `innerRole`       |           | `string \| null`                                            |
| `itemRoles`       |           | `string \| null`                                            |
| `items`           | readonly  | `ListItemBase[]`                                            |
| `itemsReady`      |           | `Promise<never[]>`                                          |
| `layout`          |           | `object`                                                    |
| `multi`           |           | `boolean`                                                   |
| `noninteractive`  |           | `boolean`                                                   |
| `rootTabbable`    |           | `boolean`                                                   |
| `selected`        | readonly  | `ListItemBase \| ListItemBase[] \| null`                    |
| `wrapFocus`       |           | `boolean`                                                   |

## Methods

| Method                | Type                                                  |
| --------------------- | ----------------------------------------------------- |
| `blur`                | `(): void`                                            |
| `click`               | `(): void`                                            |
| `focus`               | `(): void`                                            |
| `focusItemAtIndex`    | `(index: number): void`                               |
| `getFocusedItemIndex` | `(): number`                                          |
| `layout`              | `(updateItems?: boolean \| undefined): void`          |
| `renderPlaceholder`   | `(): TemplateResult \| null`                          |
| `select`              | `(index: MWCListIndex): void`                         |
| `toggle`              | `(index: number, force?: boolean \| undefined): void` |

## Events

| Event           | Type             |
| --------------- | ---------------- |
| `action`        | `ActionDetail`   |
| `items-updated` |                  |
| `selected`      | `SelectedDetail` |

# vwc-radio-list-item

This component is an extension of [<mwc-radio-list-item>](https://github.com/material-components/material-components-web-components/tree/master/packages/list)

## Properties

| Property           | Modifiers | Type                      |
| ------------------ | --------- | ------------------------- |
| `activated`        |           | `boolean`                 |
| `disabled`         |           | `boolean`                 |
| `graphic`          |           | `GraphicType`             |
| `group`            |           | `string \| null`          |
| `hasMeta`          |           | `boolean`                 |
| `left`             |           | `boolean`                 |
| `multipleGraphics` |           | `boolean`                 |
| `noninteractive`   |           | `boolean`                 |
| `ripple`           |           | `Promise<Ripple \| null>` |
| `selected`         |           | `boolean`                 |
| `tabindex`         |           | `number`                  |
| `text`             | readonly  | `string`                  |
| `twoline`          |           | `boolean`                 |
| `value`            |           | `string`                  |

## Events

| Event                | Type                    |
| -------------------- | ----------------------- |
| `list-item-rendered` |                         |
| `request-selected`   | `RequestSelectedDetail` |
