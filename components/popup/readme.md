# vwc-popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content.   
To trigger the Popup, it should be paired with an anchor (e.g., a button).

## Properties

| Property      | Attribute     | Type                                                                                                                                                                 | Default   |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `anchor`      | `anchor`      | `Element \| undefined`                                                                                                                                               |           |
| `arrow`       | `arrow`       | `boolean \| undefined`                                                                                                                                               | `true`    |
| `corner`      | `corner`      | ` "top" \| "top-start" \| "top-end" \| "right" \| "right-start" \| "right-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "left" \| "left-start" | "left-end"` | `"left"`  |
| `dismissible` | `dismissible` | `boolean \| undefined`                                                                                                                                               | `true`    |
| `distance`    | `distance`    | `number`                                                                                                                                                             | `0`      |
| `open`        | `open`        | `boolean`                                                                                                                                                            | `false`   |
| `strategy`    | `strategy`    | `"fixed" \| "absolute"`                                                                                                                                              | `"fixed"` |

## Methods

| Method           | Type                   | Description                                                         |
| ---------------- | ---------------------- | ------------------------------------------------------------------- |
| `hide`           | `(): void`             | Closes the popup                                                    |
| `show`           | `(): Promise<void>`    | Opens the popup                                                     |
| `updatePosition` | `(): Promise<boolean>` | Updates popup position, if succeeded returns - true, if not - false |