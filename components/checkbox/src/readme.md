# vwc-checkbox

## Properties

| Property                  | Modifiers | Type                                      | Description                                      |
|---------------------------|-----------|-------------------------------------------|--------------------------------------------------|
| `checked`                 |           | `boolean`                                 |                                                  |
| `disabled`                |           | `boolean`                                 |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined` |                                                  |
| `indeterminate`           |           | `boolean`                                 |                                                  |
| `isRippleActive`          | readonly  | `boolean`                                 |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`    |                                                  |
| `ripple`                  |           | `Promise<Ripple \| null>`                 | Implement ripple getter for Ripple integration with mwc-formfield |
| `value`                   |           | `string`                                  |                                                  |

## Methods

| Method         | Type                    |
|----------------|-------------------------|
| `click`        | `(): void`              |
| `setAriaLabel` | `(label: string): void` |
