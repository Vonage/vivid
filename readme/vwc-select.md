# vwc-select

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `disabled`                |           | `boolean`                                        |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `fullwidth`               |           | `boolean`                                        |                                                  |
| `helper`                  |           | `string`                                         |                                                  |
| `icon`                    |           | `string`                                         |                                                  |
| `index`                   | readonly  | `number`                                         |                                                  |
| `items`                   | readonly  | `ListItemBase[]`                                 |                                                  |
| `label`                   |           | `string`                                         |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`           |                                                  |
| `naturalMenuWidth`        |           | `boolean`                                        |                                                  |
| `outlined`                |           | `boolean`                                        |                                                  |
| `required`                |           | `boolean`                                        |                                                  |
| `ripple`                  |           | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` | Implement ripple getter for Ripple integration with mwc-formfield |
| `selected`                | readonly  | `ListItemBase \| null`                           |                                                  |
| `validateOnInitialRender` |           | `boolean`                                        |                                                  |
| `validationMessage`       |           | `string`                                         |                                                  |
| `validity`                | readonly  | `ValidityState`                                  |                                                  |
| `validityTransform`       |           | `((value: string, nativeValidity: ValidityState) => Partial<ValidityState>) \| null` |                                                  |
| `value`                   |           | `string`                                         |                                                  |

## Methods

| Method              | Type                                             |
|---------------------|--------------------------------------------------|
| `blur`              | `(): void`                                       |
| `checkValidity`     | `(): boolean`                                    |
| `click`             | `(): void`                                       |
| `focus`             | `(): void`                                       |
| `layout`            | `(updateItems?: boolean \| undefined): Promise<void>` |
| `reportValidity`    | `(): boolean`                                    |
| `select`            | `(index: number): void`                          |
| `setAriaLabel`      | `(label: string): void`                          |
| `setCustomValidity` | `(message: string): void`                        |

## Events

| Event      | Description      |
|------------|------------------|
| `action`   | {ActionDetail}   |
| `change`   |                  |
| `closed`   |                  |
| `invalid`  |                  |
| `opened`   |                  |
| `selected` | {SelectedDetail} |


# vwc-select

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `disabled`                |           | `boolean`                                        |                                                  |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `fullwidth`               |           | `boolean`                                        |                                                  |
| `helper`                  |           | `string`                                         |                                                  |
| `icon`                    |           | `string`                                         |                                                  |
| `index`                   | readonly  | `number`                                         |                                                  |
| `items`                   | readonly  | `ListItemBase[]`                                 |                                                  |
| `label`                   |           | `string`                                         |                                                  |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`           |                                                  |
| `naturalMenuWidth`        |           | `boolean`                                        |                                                  |
| `outlined`                |           | `boolean`                                        |                                                  |
| `required`                |           | `boolean`                                        |                                                  |
| `ripple`                  |           | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` | Implement ripple getter for Ripple integration with mwc-formfield |
| `selected`                | readonly  | `ListItemBase \| null`                           |                                                  |
| `validateOnInitialRender` |           | `boolean`                                        |                                                  |
| `validationMessage`       |           | `string`                                         |                                                  |
| `validity`                | readonly  | `ValidityState`                                  |                                                  |
| `validityTransform`       |           | `((value: string, nativeValidity: ValidityState) => Partial<ValidityState>) \| null` |                                                  |
| `value`                   |           | `string`                                         |                                                  |

## Methods

| Method              | Type                                             |
|---------------------|--------------------------------------------------|
| `blur`              | `(): void`                                       |
| `checkValidity`     | `(): boolean`                                    |
| `click`             | `(): void`                                       |
| `focus`             | `(): void`                                       |
| `layout`            | `(updateItems?: boolean \| undefined): Promise<void>` |
| `reportValidity`    | `(): boolean`                                    |
| `select`            | `(index: number): void`                          |
| `setAriaLabel`      | `(label: string): void`                          |
| `setCustomValidity` | `(message: string): void`                        |

## Events

| Event      | Description      |
|------------|------------------|
| `action`   | {ActionDetail}   |
| `change`   |                  |
| `closed`   |                  |
| `invalid`  |                  |
| `opened`   |                  |
| `selected` | {SelectedDetail} |
