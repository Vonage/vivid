### Introduction

`vwc-helper-message` component is a common helper/error message presenter.
It is mostly to be used as an additional, mid length, informative hint located below a functional blocks or elements.

This component featured with constant font style, 1 level lesser than the regular body content one,
single-liner appearance and optional error icon when `is-error` attribute set.

> `vwc-helper-message` is internally used in: `vwc-file-picker`, `vwc-select`, `vwc-textarea`, `vwc-textfield` and more to come.

### Usage

Install the component as part of the Vivid installation bundle or on it's own.

Instantiate it as following:
```js
import '@vonage/vwc-helper-message';
```

Then use in HTML as following:
```html
<div aria-describedby="content-description">
	some content requiring description
</div>
<vwc-helper-message id="content-description" is-error="false">Message text</vwc-helper-message>
```

A11Y: please, add a relevant `id` attribute to the `vwc-helper-message` and use that `id` with the `aria-describedby` attribute in the base content as in the example above.
Read more on `aria-describedby` usage [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-describedby_attribute).

### API

#### Slots

Any light DOM content within the component is slotted to be a message content.

#### Attirbutes / Properties

| Property  | Attribute  | Type      | Description |
|-----------|------------|-----------|-------------|
| `isError` | `is-error` | `boolean` | adds error icon before the text message