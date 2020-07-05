# vwc-textarea

This component is an extension of [<mwc-textarea>](https://github.com/material-components/material-components-web-components/tree/master/packages/textarea)

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `autoValidate`            |           | `boolean`                                        |                                                  |
| `autocapitalize`          |           | `string`                                         |                                                  |
| `charCounter`             |           | `boolean \| "external" \| "internal"`            |                                                  |
| `cols`                    |           | `number`                                         |                                                  |
| `disabled`                |           | `boolean`                                        |                                                  |
| `endAligned`              |           | `boolean`                                        |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `helper`                  |           | `string`                                         |                                                  |
| `helperPersistent`        |           | `boolean`                                        |                                                  |
| `icon`                    |           | `string`                                         |                                                  |
| `iconTrailing`            |           | `string`                                         |                                                  |
| `inputMode`               |           | `TextFieldInputMode`                             |                                                  |
| `label`                   |           | `string`                                         |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`           |                                                  |
| `max`                     |           | `string \| number`                               |                                                  |
| `maxLength`               |           | `number`                                         |                                                  |
| `min`                     |           | `string \| number`                               |                                                  |
| `minLength`               |           | `number`                                         |                                                  |
| `name`                    |           | `string`                                         |                                                  |
| `outlined`                |           | `boolean`                                        |                                                  |
| `pattern`                 |           | `string`                                         |                                                  |
| `placeholder`             |           | `string`                                         |                                                  |
| `prefix`                  |           | `string`                                         |                                                  |
| `readOnly`                |           | `boolean`                                        |                                                  |
| `required`                |           | `boolean`                                        |                                                  |
| `ripple`                  | readonly  | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` | Implement ripple getter for Ripple integration with mwc-formfield |
| `rows`                    |           | `number`                                         |                                                  |
| `selectionEnd`            | readonly  | `number \| null`                                 |                                                  |
| `selectionStart`          | readonly  | `number \| null`                                 |                                                  |
| `size`                    |           | `number \| null`                                 |                                                  |
| `step`                    |           | `number \| null`                                 |                                                  |
| `suffix`                  |           | `string`                                         |                                                  |
| `type`                    |           | `TextFieldType`                                  |                                                  |
| `validateOnInitialRender` |           | `boolean`                                        |                                                  |
| `validationMessage`       |           | `string`                                         |                                                  |
| `validity`                | readonly  | `ValidityState`                                  |                                                  |
| `validityTransform`       |           | `((value: string, nativeValidity: ValidityState) => Partial<ValidityState>) \| null` |                                                  |
| `value`                   |           | `string`                                         |                                                  |
| `willValidate`            | readonly  | `boolean`                                        |                                                  |

## Methods

| Method              | Type                                             |
|---------------------|--------------------------------------------------|
| `blur`              | `(): void`                                       |
| `checkValidity`     | `(): boolean`                                    |
| `click`             | `(): void`                                       |
| `focus`             | `(): void`                                       |
| `layout`            | `(): Promise<void>`                              |
| `reportValidity`    | `(): boolean`                                    |
| `select`            | `(): void`                                       |
| `setAriaLabel`      | `(label: string): void`                          |
| `setCustomValidity` | `(message: string): void`                        |
| `setSelectionRange` | `(selectionStart: number, selectionEnd: number, selectionDirection?: "forward" \| "backward" \| "none" \| undefined): void` |
