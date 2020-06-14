# vwc-button

Here is a description of my web component.
This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)

## Properties

| Property                  | Attribute    | Type                                      | Description                             |
|---------------------------|--------------|-------------------------------------------|-----------------------------------------|
| `buttonElement`           |              | `HTMLElement`                             |                                         |
| `dense`                   |              | `boolean`                                 |                                         |
| `disabled`                | `disabled`   | `Boolean`                                 | disabled view                           |
| `floatingLabelFoundation` |              | `MDCFloatingLabelFoundation \| undefined` |                                         |
| `fullwidth`               |              | `boolean`                                 |                                         |
| `icon`                    |              | `string`                                  |                                         |
| `label`                   |              | `string`                                  |                                         |
| `lineRippleFoundation`    |              | `MDCLineRippleFoundation \| undefined`    |                                         |
| `outlined`                | `outlined`   | `Boolean`                                 | outlined flavor (border, no background) |
| `raised`                  |              | `boolean`                                 |                                         |
| `ripple`                  |              | `Promise<Ripple \| null>`                 |                                         |
| `trailingIcon`            |              | `boolean`                                 |                                         |
| `unelevated`              | `unelevated` | `Boolean`                                 | default state (background)              |

## Methods

| Method  | Type       |
|---------|------------|
| `blur`  | `(): void` |
| `focus` | `(): void` |
