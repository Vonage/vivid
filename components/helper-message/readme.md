# Introduction

`vwc-helper-message` component is a common helper/error message presenter.
This component is internally used in components `vwc-textarea`, `vwc-textfield`, `vwc-select`, `vwc-file-picker` and alike.

# Usage

Install the component as part of the Vivid installation bundle or on it's own.

Instantiate it as following:
```js
import '@vonage/vwc-helper-message';
```

Then use in HTML as following:
```html
<vwc-helper-message is-error="false">Message text</vwc-helper-message>
```

# API

## Slots

Any slotted content within the component is slotted to be a message content.

## Attirbutes / Properties

TODO