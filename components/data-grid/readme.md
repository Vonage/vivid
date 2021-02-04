# vwc-note

`vwc-note` component is designated to layout connotated notification content.

## Structure

`vwc-note` is a block component, purposed to be used as part of the running article.
It may also be used as appering on demand, as part of running layout, thus moving the contents after it down below the page.

`vwc-note` is features by **connotation-strip** as the block start, optional **icon** and optional **header**.
Most of th `vwc-note` is occupied by the **message body**.


## API

To begin with, any light DOM within the `vwc-note` is slotted to become a message body.
Additionally, `vwc-note` exposes APIs so set its connotation, icon and header.

### Properties

| Property      | Attribute     | Type          | Default   |
|---------------|---------------|---------------|-----------|
| `connotation` | `connotation` | `Connotation` | "announcement" |
| `header`      | `header`      | `string`      | ""        |
| `icon`        | `icon`        | `string`      | ""        |
