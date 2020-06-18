# vwc-radio

This component is an extension of [<mwc-radio>](https://github.com/material-components/material-components-web-components/tree/master/packages/radio)

## Properties/Attributes

| Name            | Type      | Default | Description
| --------------- | --------- |-------- | -----------
| `checked`       | `boolean` | `false` | Whether this radio button is the currently-selected one in its group. Maps to the native [`checked`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#checked) attribute.
| `disabled`      | `boolean` | `false` | If `true`, this radio button cannot be selected or de-selected. Maps to the native [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled) attribute.
| `name`          | `string`  | `''`    | Name of the input for form submission, and identifier for the selection group. Only one radio button can be checked for a given selection group. Maps to the native [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name) attribute.
| `value`         | `string`  | `''`    | Value of the input for form submission. Maps to the native [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#value) attribute.
| `global`        | `boolean` | `false` | If `true`, this radio button will use a global, document-level scope for its selection group rather than its local shadow root.

## Methods
*None*

## Events
| Name     | Detail | Description
| ---------| ------ | -----------
| `change` | `{}`   | Fired when the user modifies the radio `checked` state from an input device interaction on this radio. Note that, like [native `<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event), the `change` event is *not* fired when the `checked` property is set from JavaScript, nor is it fired when another radio in the same group becomes `checked`.
