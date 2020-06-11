# vwc-slider

## Properties

| Property                  | Type                                             | Description                                      |
|---------------------------|--------------------------------------------------|--------------------------------------------------|
| `disabled`                | `boolean`                                        |                                                  |
| `floatingLabelFoundation` | `MDCFloatingLabelFoundation \| undefined`        |                                                  |
| `lineRippleFoundation`    | `MDCLineRippleFoundation \| undefined`           |                                                  |
| `markers`                 | `boolean`                                        |                                                  |
| `max`                     | `number`                                         |                                                  |
| `min`                     | `number`                                         |                                                  |
| `pin`                     | `boolean`                                        |                                                  |
| `ripple`                  | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` | Implement ripple getter for Ripple integration with mwc-formfield |
| `step`                    | `number`                                         |                                                  |
| `value`                   | `number`                                         |                                                  |

## Methods

| Method         | Type                    | Description                                      |
|----------------|-------------------------|--------------------------------------------------|
| `click`        | `(): void`              |                                                  |
| `layout`       | `(): void`              | Layout is called on mousedown / touchstart as the dragging animations of<br />slider are calculated based off of the bounding rect which can change<br />between interactions with this component, and this is the only location<br />in the foundation that udpates the rects. e.g. scrolling horizontally<br />causes adverse effects on the bounding rect vs mouse drag / touchmove<br />location. |
| `setAriaLabel` | `(label: string): void` |                                                  |
