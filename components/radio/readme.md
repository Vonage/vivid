# vwc-radio

This component is an extension of [<mwc-radio>](https://github.com/material-components/material-components-web-components/tree/master/packages/radio)

## Properties

| Property                  | Modifiers | Type                                      | Description                                      |
|---------------------------|-----------|-------------------------------------------|--------------------------------------------------|
| `checked`                 |           | `boolean`                                 | We define our own getter/setter for `checked` because we need to track<br />changes to it synchronously.<br /><br />The order in which the `checked` property is set across radio buttons<br />within the same group is very important. However, we can't rely on<br />UpdatingElement's `updated` callback to observe these changes (which is<br />also what the `@observer` decorator uses), because it batches changes to<br />all properties.<br /><br />Consider:<br /><br />   radio1.disabled = true;<br />   radio2.checked = true;<br />   radio1.checked = true;<br /><br />In this case we'd first see all changes for radio1, and then for radio2,<br />and we couldn't tell that radio1 was the most recently checked. |
| `disabled`                |           | `boolean`                                 |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined` |                                                  |
| `global`                  |           | `boolean`                                 |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`    |                                                  |
| `name`                    |           | `string`                                  |                                                  |
| `ripple`                  | readonly  | `RippleInterface \| undefined`            | Implement ripple getter for Ripple integration with mwc-formfield |
| `value`                   |           | `string`                                  |                                                  |

## Methods

| Method         | Type                    |
|----------------|-------------------------|
| `click`        | `(): void`              |
| `focusNative`  | `(): void`              |
| `setAriaLabel` | `(label: string): void` |

## Events

| Event     |
|-----------|
| `checked` |
