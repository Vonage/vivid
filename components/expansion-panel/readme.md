# vwc-expansion-panel

## Properties

| Property           | Attribute          | Type              | Default   | Description                                                                                                                                      |
| ------------------ |--------------------| ----------------- |-----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `dense`            | `dense`            | `boolean`         | false     |                                                                                                                                                  |
| `header`           | `header`           | `string`          | ""        | The heading text of the expanded panel. *deprecated* please use _heading_ property instead                                                       |
| `heading`          | `heading`          | `string`          | ""        | The heading text of the expanded panel                                                                                                           |
| `icon`             | `icon`             | `string`          | ""        |                                                                                                                                                  |
| `indicatorIconSet` | `indicatorIconSet` | `string`          | "chevron" |                                                                                                                                                  |
| `leadingToggle`    | `leadingToggle`    | `boolean`         | false     |                                                                                                                                                  |
| `noRipple`         | `noRipple`         | `boolean`         | false     |                                                                                                                                                  |
| `open`             | `open`             | `boolean`         | false     |                                                                                                                                                  |
| `ripple`           |                    | `Promise<Ripple>` |           |                                                                                                                                                  |
| `heading-level`     | `3`                | `string` | "3"       | The expension panel `heading-level` default is `3` (meaning the button is wrapped with `H3` tag) but need to set according to the page hierarchy |

## Methods

| Method        | Type                      | Description                                                                                                                                                                 |
| ------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `close`       | `(): void`                |                                                                                                                                                                             |
| `notifyClose` | `(): void`                |                                                                                                                                                                             |
| `notifyOpen`  | `(): void`                |                                                                                                                                                                             |
| `openChanged` | `(isOpen: boolean): void` | Invoked when the element open state is updated.<br /><br />Expressions inside this method will trigger upon open state change<br /><br />**_isOpen**: Boolean of open state |
| `show`        | `(): void`                |                                                                                                                                                                             |

## Events

| Event    | Type               |
| -------- | ------------------ |
| `closed` | `CustomEvent<any>` |
| `opened` | `CustomEvent<any>` |
