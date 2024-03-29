# vwc-checkbox

This component is an extension of [<mwc-checkbox>](https://github.com/material-components/material-components-web-components/tree/master/packages/checkbox)

## Properties

| Property                  | Modifiers | Type                                      | Description                                      |
|---------------------------|-----------|-------------------------------------------|--------------------------------------------------|
| `checked`                 |           | `boolean`                                 |                                                  |
| `disabled`                |           | `boolean`                                 |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined` |                                                  |
| `indeterminate`           |           | `boolean`                                 |                                                  |
| `isRippleActive`          | readonly  | `boolean`                                 |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`    |                                                  |
| `reducedTouchTarget`      |           | `boolean`                                 |                                                  |
| `ripple`                  |           | `Promise<Ripple \| null>`                 | Implement ripple getter for Ripple integration with mwc-formfield |
| `value`                   |           | `string`                                  |                                                  |

## Methods

| Method         | Type                    |
|----------------|-------------------------|
| `click`        | `(): void`              |
| `setAriaLabel` | `(label: string): void` |
