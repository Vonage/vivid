# vwc-tags

## Properties

| Property       | Attribute      | Type                                                  |
| -------------- | -------------- | ----------------------------------------------------- |
| `connotation`  | `connotation`  | `Connotation.Primary \| Connotation.CTA \| undefined` |
| `dense`        | `dense`        | `boolean \| undefined`                                |
| `enlarged`     | `enlarged`     | `boolean \| undefined`                                |
| `icon`         | `icon`         | `string \| undefined`                                 |
| `layout`       | `layout`       | `string \| undefined`                                 |
| `selected`     | `selected`     | `boolean \| undefined`                                |
| `shape`        | `shape`        | `Shape.Rounded \| Shape.Pill \| undefined`            |
| `text`         | `text`         | `string \| undefined`                                 |
| `trailingIcon` | `trailingIcon` | `string \| undefined`                                 |

# vwc-tag

## Properties

| Property       | Type                                                  |
| -------------- | ----------------------------------------------------- |
| `connotation`  | `Connotation.Primary \| Connotation.CTA \| undefined` |
| `dense`        | `boolean \| undefined`                                |
| `enlarged`     | `boolean \| undefined`                                |
| `icon`         | `string \| undefined`                                 |
| `layout`       | `string \| undefined`                                 |
| `selected`     | `boolean \| undefined`                                |
| `shape`        | `Shape.Rounded \| Shape.Pill \| undefined`            |
| `text`         | `string \| undefined`                                 |
| `trailingIcon` | `string \| undefined`                                 |

## Accessibility

Authors MUST ensure tags default to role _option_ are contained in, or owned by, a tags set which default to the *listbox* role. Options not associated with a listbox might not be correctly mapped to an accessibility API
