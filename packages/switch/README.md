# vwc-switch

This component is an extension of [<mwc-switch>](https://github.com/material-components/material-components-web-components/tree/master/packages/switch)

## Properties

| Property                  | Modifiers | Type                                      | Description                                      |
|---------------------------|-----------|-------------------------------------------|--------------------------------------------------|
| `checked`                 |           | `boolean`                                 |                                                  |
| `disabled`                |           | `boolean`                                 |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined` |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`    |                                                  |
| `ripple`                  | readonly  | `RippleInterface \| undefined`            | Implement ripple getter for Ripple integration with mwc-formfield |

## Methods

| Method         | Type                    |
|----------------|-------------------------|
| `click`        | `(): void`              |
| `setAriaLabel` | `(label: string): void` |
