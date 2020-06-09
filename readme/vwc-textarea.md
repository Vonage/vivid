# vwc-textarea

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `autoValidate`            |           | `boolean`                                        |                                                  |
| `charCounter`             |           | `boolean`                                        |                                                  |
| `cols`                    |           | `number`                                         |                                                  |
| `disabled`                |           | `boolean`                                        |                                                  |
| `endAligned`              |           | `boolean`                                        |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `fullWidth`               |           | `boolean`                                        |                                                  |
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
| `outlined`                |           | `boolean`                                        |                                                  |
| `pattern`                 |           | `string`                                         |                                                  |
| `placeholder`             |           | `string`                                         |                                                  |
| `prefix`                  |           | `string`                                         |                                                  |
| `readOnly`                |           | `boolean`                                        |                                                  |
| `required`                |           | `boolean`                                        |                                                  |
| `ripple`                  |           | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` | Implement ripple getter for Ripple integration with mwc-formfield |
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


# vwc-textarea

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `autoValidate`            |           | `boolean`                                        |                                                  |
| `charCounter`             |           | `boolean`                                        |                                                  |
| `cols`                    |           | `number`                                         |                                                  |
| `disabled`                |           | `boolean`                                        |                                                  |
| `endAligned`              |           | `boolean`                                        |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `fullWidth`               |           | `boolean`                                        |                                                  |
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
| `outlined`                |           | `boolean`                                        |                                                  |
| `pattern`                 |           | `string`                                         |                                                  |
| `placeholder`             |           | `string`                                         |                                                  |
| `prefix`                  |           | `string`                                         |                                                  |
| `readOnly`                |           | `boolean`                                        |                                                  |
| `required`                |           | `boolean`                                        |                                                  |
| `ripple`                  |           | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` | Implement ripple getter for Ripple integration with mwc-formfield |
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
