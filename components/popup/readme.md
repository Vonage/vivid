# vwc-popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content.   
To trigger the Popup, it should be paired with an anchor (e.g., a button).

## Properties

| Property      | Attribute     | Type                   | Default    |
| ------------- | ------------- | ---------------------- | ---------- |
| `anchor`      | `anchor`      | `Element \| undefined` |            |
| `arrow`       | `arrow`       | `boolean \| undefined` | true       |
| `corner`      | `corner`      | `Placement`            | "left"     |
| `dismissible` | `dismissible` | `false \| undefined`   |            |
| `distance`    | `distance`    | `number`               | 10         |
| `open`        | `open`        | `boolean`              | false      |
| `strategy`    | `strategy`    | `Strategy`             | "absolute" |

## Methods

| Method           | Type                   | Description                                                         |
| ---------------- | ---------------------- | ------------------------------------------------------------------- |
| `hide`           | `(): void`             | Closes the popup                                                    |
| `show`           | `(): Promise<void>`    | Opens the popup                                                     |
| `updatePosition` | `(): Promise<boolean>` | Updates popup position, if succeeded returns - true, if not - false |