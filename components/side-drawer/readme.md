# vwc-side-drawer

Represents a side drawer custom element.

## Properties

| Property    | Attribute   | Type                                    | Default | Description |
| ----------- | ----------- | --------------------------------------- | ------- | ----------- |
| `alternate` | `alternate` | `boolean`                               | false   |             |
| `hasTopBar` | `hasTopBar` | `boolean \| undefined`                  |         |             |
| `open`      | `open`      | `boolean`                               | false   |             |
| `position`  | `position`  | `"start" \| "end" \| undefined`         | "start" |             |
| `type`      | `type`      | `"modal" \| "dismissible" \| undefined` |         |             |

## Methods

| Method | Type       | Description                                  |
| ------ | ---------- | -------------------------------------------- |
| `hide` | `(): void` | Closes the side drawer from the open state.  |
| `show` | `(): void` | Opens the side drawer from the closed state. |


## CSS Custom Properties

| Property                       | Default                                     | Description                                       |
| ------------------------------ | ------------------------------------------- | ------------------------------------------------- |
| `side-drawer-background-color` | "Current theme's canvas (background) color" | Controls the background of the side drawer        |
| `side-drawer-color`            | "Current theme's on-canvas (text) color"    | Controls the color of the side drawer             |
| `side-drawer-inline-size`      | "280px"                                     | Controls the inline size of the side drawer       |
| `side-drawer-padding-body`     | "16px"                                      | Controls the padding of the side drawer's body    |
| `side-drawer-padding-top-bar`  | "16px"                                      | Controls the padding of the side drawer's top bar |
| `side-drawer-z-index`          | 6                                           | Controls the z-index of the side drawer           |
