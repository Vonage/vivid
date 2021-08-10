# vwc-side-drawer

Represents a side drawer custom element.

## Properties

| Property         | Attribute   | Modifiers | Type                   |
|------------------|-------------|-----------|------------------------|
| `alternate`      | `alternate` |           | `boolean \| undefined` |
| `alternateValue` |             | readonly  | `string \| undefined`  |
| `hasHeader`      | `hasHeader` |           | `boolean \| undefined` |

## Slots

| Name         | Description                                      |
|--------------|--------------------------------------------------|
| `header`     | The content of the header.                       |
| `navigation` | For vwc-list-item, vwc-list-expansion-panel, paragraph etc. |