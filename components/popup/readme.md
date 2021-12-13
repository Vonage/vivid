# vwc-popup
`vwc-popup` are for elements that are displayed on top of all other web app UI such as action menus, form element suggestions, content pickers ext.

## Accessibility


## Properties

| Property      | Attribute     | Type                   | Default |
| ------------- | ------------- | ---------------------- | ------- |
| `dismissible` | `dismissible` | `boolean \| undefined` |         |
| `distance`    | `distance`    | `number`               | 10      |
| `open`        | `open`        | `boolean`              | false   |
| `override`    |               |                        |         |
| `corner`      | `corner`      | `corner`               | "auto"  |
| `styles`      |               | `CSSResult`            | "style" |

## Methods

| Method | Type       | Description      |
| ------ | ---------- | ---------------- |
| `hide` | `(): void` | Closes the popup |
| `show` | `(): void` | Opens the popup  |


## CSS Custom Properties

| Property                  | Default | Description                              |
| ------------------------- | ------- | ---------------------------------------- |
| `--popup-min-inline-size` | 100px   | Controls the the min-width of the popup  |
| `--popup-max-inline-size` | 350px   | Controls the the max-width of the popup. |

For fixed width set the same value for `--popup-min-inline-size` and `--popup-max-inline-size`
