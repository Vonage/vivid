### vwc-slider

This component is an extension of [\<mwc-slider\>](https://github.com/material-components/material-components-web-components/tree/master/packages/slider)

### API

#### Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `disabled`                |           | `boolean`                                        |                                                  |
| `markers`                 |           | `boolean`                                        |                                                  |
| `max`                     |           | `number`                                         |                                                  |
| `min`                     |           | `number`                                         |                                                  |
| `pin`                     |           | `boolean`                                        |                                                  |
| `step`                    |           | `number`                                         |                                                  |
| `value`                   |           | `number`                                         |                                                  |

#### Methods

| Method         | Type                    | Description                                      |
|----------------|-------------------------|--------------------------------------------------|
| `click`        | `(): void`              |                                                  |
| `layout`       | `(): void`              | Layout is called on mousedown / touchstart as the dragging animations of<br />slider are calculated based off of the bounding rect which can change<br />between interactions with this component, and this is the only location<br />in the foundation that udpates the rects. e.g. scrolling horizontally<br />causes adverse effects on the bounding rect vs mouse drag / touchmove<br />location. |
| `setAriaLabel` | `(label: string): void` |                                                  |
