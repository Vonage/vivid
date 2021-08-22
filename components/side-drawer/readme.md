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
