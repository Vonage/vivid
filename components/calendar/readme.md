# vwc-calendar

Represents a calendar custom element.

## Properties

| Property   | Attribute  | Type                | Description                                                                                      |
| ---------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `datetime` | `datetime` | `Date \| undefined` | The date within a week of choice. Accepts any valid date string representation e.g. _2021-01-01_ |

| `locales`  | `locales`  | `string \| string[] \| undefined` | A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details. e.g. en-US \| en-US, he-IL |

## CSS Custom Properties

| Property               | Default | Description                                               |
| ---------------------- | ------- | --------------------------------------------------------- |
| `--vvd-calendar-shape` | "6px"   | defines the calendar and its events shape (border radius) |

# vwc-calendar-event

Represents a calendar event custom element.

## Properties

| Property       | Attribute       | Type                  | Default |
| -------------- | --------------- | --------------------- | ------- |
| `color`        | `color`         | `string \| undefined` |         |
| `description`  | `description`   | `string \| undefined` |         |
| `duration`     | `duration`      | `number`              | 1       |
| `heading`      | `heading`       | `string \| undefined` |         |
| `overlapCount` | `overlap-count` | `string \| undefined` |         |
| `start`        | `start`         | `number`              | 0       |
