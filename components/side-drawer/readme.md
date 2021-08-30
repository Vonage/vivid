# vwc-side-drawer

Represents a side drawer custom element.

## Properties

| Property    | Attribute   | Type                   | Default |
|-------------|-------------|------------------------|---------|
| `alternate` | `alternate` | `boolean`              | false   |
| `hasTopBar` | `hasTopBar` | `boolean \| undefined` |         |
| `open`      | `open`      | `boolean`              | false   |
| `type`      | `type`      | `string`               | ""      |

## Methods

| Method                 | Type                        | Description                                  |
|------------------------|-----------------------------|----------------------------------------------|
| `hide`                 | `(): void`                  | Closes the side drawer from the open state.  |
| `show`                 | `(): void`                  | Opens the side drawer from the closed state. |

## CSS Custom Properties

| Property                                     | Description                                      |
|----------------------------------------------|--------------------------------------------------|
| `--vvd-side-drawer--background-color`        | Controls the background of the side drawer       |
| `--vvd-side-drawer--min-inline-size`         | Controls the size of the side drawer             |
| `--vvd-side-drawer--min-inline-size-default` | Controls the default min-inline-size of the side drawer |
| `--vvd-side-drawer--padding`                 | Controls the padding of the side drawer          |
| `--vvd-side-drawer--padding-default`         | Controls the default padding of the side drawer  |
| `--vvd-side-drawer--z-index`                 | Controls the z-index of the side drawer          |
| `--vvd-side-drawer--z-index-default`         | Controls the default z-index of the side drawer  |
