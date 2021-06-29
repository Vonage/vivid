# vwc-calendar

Represents a calendar custom element.

## Properties

| Property   | Attribute  | Type                              | Description                                      |
|------------|------------|-----------------------------------|--------------------------------------------------|
| `datetime` | `datetime` | `Date \| undefined`               | The date within a week of choice.<br />Accepts any valid date string representation e.g. _2021-01-01_ |
| `locales`  | `locales`  | `string \| string[] \| undefined` | A locale string or array of locale strings that contain one or more language or locale tags.<br />If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale.<br />If you omit this parameter, the default locale of the JavaScript runtime is used.<br />This parameter must conform to BCP 47 standards; see the Intl.Collator object for details. |
