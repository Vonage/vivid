# vwc-tooltip

## Properties

| Property      | Attribute     | Type                                     | Default |
|---------------|---------------|------------------------------------------|---------|
| `dismissible` | `dismissible` | `boolean \| undefined`                   |         |
| `distance`    | `distance`    | `number`                                 | 10      |
| `open`        | `open`        | `boolean`                                | false   |
| `override`    |               |                                          |         |
| `placement`   | `placement`   | `"top" \| "right" \| "bottom" \| "left"` | "top"   |
| `skidding`    | `skidding`    | `number`                                 | 0       |
| `styles`      |               | `CSSResult`                              | "style" |
| `tooltipText` | `tooltipText` | `string \| undefined`                    |         |

## Methods

| Method                | Type                          | Description        |
|-----------------------|-------------------------------|--------------------|
| `hide`                | `(): void`                    | Closes the tooltip |
| `renderDismissButton` | `(): unknown`                 |                    |
| `show`                | `(target: HTMLElement): void` | Opens the tooltip  |
