# `vwc-select`

`vwc-select` is a drop-down kind of input element.

> This component is an extension of [\<mwc-select\>](https://github.com/material-components/material-components-web-components/tree/master/packages/select).

# Usage

Import the component in your context, to get it initialized:
```js
import '@vonage/vwc-select/vwc-select.js';

//	or, to be able to use casting in TypeScript, do

import { VWCSelect } from '@vonage/vwc-select/vwc-select.js';

import '@vonage/vwc-list/vwc-list-item.js';
```

We suggest as a rule of thumb to use `vwc-list-item` component to provide the list of options.
`vwc-list-item` is capable of holding any content, from simple text to rich HTML.

The following should provide you with a working example:
```html
<vwc-select outlined label="VWC Select" helper="Helper text">
	<vwc-list-item></vwc-list-item>
	<vwc-list-item value="0">Item 0</vwc-list-item>
	<vwc-list-item value="1">Item 1</vwc-list-item>
</vwc-select>
```

Few points to pay attention to, in order to get the expected result:
* Select will preselect the first item in the list (much like the native HTML select), so if one would like to start with empty value, stare the list with an empty item
* Items MUST HAVE an attribute value with an actual values that you'd like to use in your applicative logic (except the empty choice);
the text/content within the items is for **labeling** purposes only, should be considered as not logically reliable (think of localization down the road, or some rich HTML)

# API

`vwc-select` exposes the following properties, methods and events:

## Properties

| Property                  | Modifiers | Type                                             | Description                                      |
|---------------------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `disabled`                |           | `boolean`                                        |                                                  |
| `helper`                  |           | `string`                                         |                                                  |
| `icon`                    |           | `string`                                         |                                                  |
| `index`                   | readonly  | `number`                                         |                                                  |
| `items`                   | readonly  | `ListItemBase[]`                                 |                                                  |
| `label`                   |           | `string`                                         |                                                  |
| `naturalMenuWidth`        |           | `boolean`                                        |                                                  |
| `outlined`                |           | `boolean`                                        |                                                  |
| `required`                |           | `boolean`                                        |                                                  |
| `selected`                | readonly  | `ListItemBase \| null`                           |                                                  |
| `validateOnInitialRender` |           | `boolean`                                        |                                                  |
| `validationMessage`       |           | `string`                                         |                                                  |
| `value`                   |           | `string`                                         |                                                  |

## Methods

| Method              | Type                                             |
|---------------------|--------------------------------------------------|
| `blur`              | `(): void`                                       |
| `checkValidity`     | `(): boolean`                                    |
| `click`             | `(): void`                                       |
| `focus`             | `(): void`                                       |
| `layout`            | `(updateItems?: boolean \| undefined): Promise<void>` |
| `reportValidity`    | `(): boolean`                                    |
| `select`            | `(index: number): void`                          |
| `setAriaLabel`      | `(label: string): void`                          |
| `setCustomValidity` | `(message: string): void`                        |

## Events

| Event      | Description      |
|------------|------------------|
| `action`   | {ActionDetail}   |
| `change`   |                  |
| `closed`   |                  |
| `invalid`  |                  |
| `opened`   |                  |
| `selected` | {SelectedDetail} |
