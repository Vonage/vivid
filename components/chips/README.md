# `<vwc-chip>`

Chips are compact elements that allow users to enter information, select a choice, filter content, or trigger an action.

<!-- [Demo](https://material-components.github.io/material-components-web-components/demos/button/) -->

## Installation

```sh
npm install @vonage/vwc-chips
```

## Example Usage

### Standard

<!-- ![](images/image.png) -->

```html
<vwc-chip label="Chip"></vwc-chip>
```

### Chip Sets

<!-- ![](images/image.png) -->

```html
<vwc-chip-set>
  <vwc-chip label="Chip One"></vwc-chip>
  <vwc-chip label="Chip Two"></vwc-chip>
</vwc-chip-set>
```

<!-- ### Size -->

<!-- ![](images/image.png) -->

<!-- ```html
<vwc-chip-set>
  <vwc-chip small label="small"></vwc-chip>
  <vwc-chip label="default"></vwc-chip>
  <vwc-chip large label="large"></vwc-chip>
</vwc-chip-set>
``` -->

<!-- ### Theme -->

<!-- ![](images/image.png) -->

<!-- ```html
<vwc-chip-set>
  <vwc-chip theme="black" label="black"></vwc-chip>
  <vwc-chip theme="red" label="red"></vwc-chip>
</vwc-chip-set>
``` -->

<!-- ### Pill -->

<!-- ![](images/image.png) -->

<!-- ```html
<vwc-chip pill label="pill"></vwc-chip>
``` -->

<!-- ### Outlined -->

<!-- ![](images/image.png) -->

<!-- ```html
<vwc-chip outlined label="outlined"></vwc-chip>
``` -->

<!-- ### Transparent -->

<!-- ![](images/image.png) -->

<!-- ```html
<vwc-chip transparent label="transparent"></vwc-chip>
``` -->

### Removable

<!-- ![](images/image.png) -->

```html
<vwc-chip removable label="Removable"></vwc-chip>
```

## API

<!-- ### Slots
| Name           | Description
| -------------- | -----------
| _default_      | Default content to display between both icons and after label. __NOTE:__ It is highly recommended to set the `label` property instead of projecting text as it will also set the `aria-label` -->

### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `label` | `string` | `''` | Label to display for the chip.
| `removable` | `boolean` | `false` | When `true`, a close icon will display after `label` and the chip will be removable by the delete or backspace key.

<!-- | `size` | `string` | `''` | Changes size of chip text and container.
| `theme` | `string` | `''` | Changes theme of chip.
| `pill` | `boolean` | `false` | creates a chip with 50% rounded corners. -->
<!-- | `outlined` | `boolean` | `false` | Creates an outlined chip.
| `transparent` | `boolean` | `false` | Creates a transparent chip. -->

### Methods
*None*

### Events

| Event Name | Target | Detail | Description
| ---------- | ------ | ------ | -----------
| `MDCChip:removal` | `vwc-chip` | chipId | Fired chip remove.

<!-- | `MDCChip:selection` | `vwc-chip` | chipId | Fired chip selected. -->

<!-- #### Size values

| Size
| ----
| `small`
| `large` -->

<!-- #### Theme values

| Theme
| -----
| `black`
| `blue`
| `green`
| `indigo`
| `orange`
| `purple`
| `red`
| `white`
| `yellow` -->

## Additional references

- [Material Design Guidelines: Chips](https://material.io/design/components/chips.html)
