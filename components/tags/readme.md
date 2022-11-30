# vwc-tag

## Properties

| Property         | Type                                                  |
| --------------   | ----------------------------------------------------- |
| `connotation`    | `Connotation.Primary \| Connotation.CTA \| undefined` |
| `dense`          | `boolean \| undefined`                                |
| `enlarged`       | `boolean \| undefined`                                |
| `icon`           | `string \| undefined`                                 |
| `layout`         | `string \| undefined`                                 |
| `selected`       | `boolean \| undefined`                                |
| `shape`          | `Shape.Rounded \| Shape.Pill \| undefined`            |
| `text`           | `string \| undefined`                                 |
| `removable`      | `boolean \| undefined`                                |
| `removeEventOnly`| `boolean \| undefined`                                |

## Events

| Event        | Description      |
|------------  |------------------|
| `remove-tag` |    {VwcTag}      |

## Accessibility

Authors MUST ensure tags default to role _option_ are contained in, or owned by, a tags set which default to the *listbox* role. Options not associated with a listbox might not be correctly mapped to an accessibility API
