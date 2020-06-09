# vwc-chip

## Properties

| Property                  | Type                                             |
|---------------------------|--------------------------------------------------|
| `floatingLabelFoundation` | `MDCFloatingLabelFoundation \| undefined`        |
| `icon`                    | `string`                                         |
| `iconClass`               | `string`                                         |
| `label`                   | `string`                                         |
| `lineRippleFoundation`    | `MDCLineRippleFoundation \| undefined`           |
| `outlined`                | `boolean`                                        |
| `pill`                    | `boolean`                                        |
| `removable`               | `boolean`                                        |
| `removeIcon`              | `string`                                         |
| `removeIconClass`         | `string`                                         |
| `removeIconFocusable`     | `boolean`                                        |
| `ripple`                  | `unknown`                                        |
| `selected`                | `boolean`                                        |
| `size`                    | `string`                                         |
| `theme`                   | `string`                                         |
| `transparent`             | `boolean`                                        |
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


# vwc-chip

## Properties

| Property                  | Attribute     | Type                                             | Default |
|---------------------------|---------------|--------------------------------------------------|---------|
| `floatingLabelFoundation` |               | `MDCFloatingLabelFoundation \| undefined`        |         |
| `icon`                    |               | `string`                                         |         |
| `iconClass`               |               | `string`                                         |         |
| `label`                   |               | `string`                                         |         |
| `lineRippleFoundation`    |               | `MDCLineRippleFoundation \| undefined`           |         |
| `outlined`                | `outlined`    | `boolean`                                        | false   |
| `pill`                    | `pill`        | `boolean`                                        | false   |
| `removable`               |               | `boolean`                                        |         |
| `removeIcon`              |               | `string`                                         |         |
| `removeIconClass`         |               | `string`                                         |         |
| `removeIconFocusable`     |               | `boolean`                                        |         |
| `ripple`                  |               | `unknown`                                        |         |
| `selected`                |               | `boolean`                                        |         |
| `size`                    | `size`        | `string`                                         | ""      |
| `theme`                   | `theme`       | `string`                                         | ""      |
| `transparent`             | `transparent` | `boolean`                                        | false   |
| `type`                    |               | `"action" \| "input" \| "choice" \| "filter" \| undefined` |         |

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
