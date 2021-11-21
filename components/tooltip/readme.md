# vwc-tooltip

## Properties

| Property      | Attribute     | Type                                             | Default |
|---------------|---------------|--------------------------------------------------|---------|
| `content`     | `content`     | `string \| undefined`                            |         |
| `dismissible` | `dismissible` | `boolean \| undefined`                           |         |
| `distance`    | `distance`    | `number`                                         | 10      |
| `open`        | `open`        | `boolean \| undefined`                           |         |
| `override`    |               |                                                  |         |
| `placement`   | `placement`   | `"auto" \| "auto-start" \| "auto-end" \| "top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "right" \| "right-start" \| "right-end" \| "left" \| "left-start" \| "left-end"` | "auto"  |
| `styles`      |               | `CSSResult`                                      | "style" |

## Methods

| Method                 | Type                          | Description        |
|------------------------|-------------------------------|--------------------|
| `#renderDismissButton` | `(): unknown`                 |                    |
| `hide`                 | `(): void`                    | Closes the tooltip |
| `show`                 | `(target: HTMLElement): void` | Opens the tooltip  |
