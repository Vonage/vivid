# mwc-chip-set

## Properties

| Property                  | Attribute | Modifiers | Type                                             |
|---------------------------|-----------|-----------|--------------------------------------------------|
| `chips`                   |           | readonly  | `readonly ChipBase[]`                            |
| `floatingLabelFoundation` |           |           | `MDCFloatingLabelFoundation \| undefined`        |
| `lineRippleFoundation`    |           |           | `MDCLineRippleFoundation \| undefined`           |
| `ripple`                  |           |           | `unknown`                                        |
| `type`                    | `type`    |           | `"action" \| "input" \| "choice" \| "filter" \| undefined` |


# mwc-chip

## Properties

| Property                  | Attribute             | Type                                             | Default          |
|---------------------------|-----------------------|--------------------------------------------------|------------------|
| `floatingLabelFoundation` |                       | `MDCFloatingLabelFoundation \| undefined`        |                  |
| `icon`                    | `icon`                | `string`                                         | ""               |
| `iconClass`               | `iconClass`           | `string`                                         | "material-icons" |
| `label`                   | `label`               | `string`                                         | ""               |
| `lineRippleFoundation`    |                       | `MDCLineRippleFoundation \| undefined`           |                  |
| `removable`               | `removable`           | `boolean`                                        | false            |
| `removeIcon`              | `removeIcon`          | `string`                                         | "close"          |
| `removeIconClass`         | `removeIconClass`     | `string`                                         | "material-icons" |
| `removeIconFocusable`     | `removeIconFocusable` | `boolean`                                        | false            |
| `ripple`                  |                       | `unknown`                                        |                  |
| `selected`                | `selected`            | `boolean`                                        |                  |
| `type`                    | `type`                | `"action" \| "input" \| "choice" \| "filter" \| undefined` |                  |

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
