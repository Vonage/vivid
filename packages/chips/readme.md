# vwc-chip-set

## Properties

| Property                  | Modifiers | Type                                             |
|---------------------------|-----------|--------------------------------------------------|
| `chips`                   | readonly  | `readonly ChipBase[]`                            |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`           |
| `type`                    |           | `"action" \| "input" \| "choice" \| "filter" \| undefined` |


# vwc-chip

## Properties

| Property                  | Type                                             |
|---------------------------|--------------------------------------------------|
| `floatingLabelFoundation` | `MDCFloatingLabelFoundation \| undefined`        |
| `icon`                    | `string`                                         |
| `iconClass`               | `string`                                         |
| `label`                   | `string`                                         |
| `lineRippleFoundation`    | `MDCLineRippleFoundation \| undefined`           |
| `removable`               | `boolean`                                        |
| `removeIcon`              | `string`                                         |
| `removeIconClass`         | `string`                                         |
| `removeIconFocusable`     | `boolean`                                        |
| `selected`                | `boolean`                                        |
| `type`                    | `"action" \| "input" \| "choice" \| "filter" \| undefined` |

## Methods

| Method                   | Type                                             |
|--------------------------|--------------------------------------------------|
| `focusPrimaryAction`     | `(): void`                                       |
| `focusTrailingAction`    | `(): void`                                       |
| `removeFocus`            | `(): void`                                       |
| `removeWithAnimation`    | `(): void`                                       |
| `renderCheckmark`        | `(): TemplateResult`                             |
| `renderLabel`            | `(): TemplateResult`                             |
| `renderPrimaryAction`    | `(): TemplateResult`                             |
| `renderRemoveIcon`       | `(): TemplateResult`                             |
| `renderThumbnail`        | `(): TemplateResult`                             |
| `setSelectedFromChipSet` | `(selected: boolean, shouldNotifyClients: boolean): void` |
