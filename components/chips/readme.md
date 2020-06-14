# vwc-chip-set

This component is an extension of [<mwc-chip-set>](https://github.com/material-components/material-components-web-components/tree/master/packages/chips)

## Properties

| Property                  | Modifiers | Type                                             |
|---------------------------|-----------|--------------------------------------------------|
| `chips`                   | readonly  | `readonly ChipBase[]`                            |
| `floatingLabelFoundation` |           | `MDCFloatingLabelFoundation \| undefined`        |
| `lineRippleFoundation`    |           | `MDCLineRippleFoundation \| undefined`           |
| `type`                    |           | `"action" \| "input" \| "choice" \| "filter" \| undefined` |


# vwc-chip

This component is an extension of [<mwc-chip>](https://github.com/material-components/material-components-web-components/tree/master/packages/chips)

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
