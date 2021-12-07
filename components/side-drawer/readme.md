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


| Property                       | Default                                         | Description                                 |
| ------------------------------ | ----------------------------------------------- | ------------------------------------------- |
| `side-drawer-background-color` | "The current theme's canvas (background) color" | Controls the background of the side drawer  |
| `side-drawer-inline-size`      | "280px"                                         | Controls the inline size of the side drawer |
| `side-drawer-padding`          | "16px"                                          | Controls the padding of the side drawer     |
| `side-drawer-z-index`          | 6                                               | Controls the z-index of the side drawer     |
