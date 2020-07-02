```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/vwc-keypad.js';

export default {
  title: 'VwcKeypad',
  component: 'vwc-keypad',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# VwcKeypad

A keypad component for Vonage's Vivid Web Components

## Features:

- Replace default digits display for a custom one
- Remove one or both of # and * buttons
- Customize Action and Cancel button text

## How to use

### Installation

```bash
npm install vwc-keypad
```

```js
import 'vwc-keypad/vwc-keypad.js';
```

```js preview-story
export const Simple = () => html`
  <vwc-keypad></vwc-keypad>
`;
```

## Variations

###### Without Display

```js preview-story
export const WithoutDisplay = () => html`
  <vwc-keypad no-display></vwc-keypad>
`;
```

###### Without # and * buttons

```js preview-story
export const OnlyNumericButtons = () => html`
  <vwc-keypad no-asterisk no-hash></vwc-keypad>
`;
```
###### Custom Action Text

```js preview-story
export const CustomActionText = () => html`
  <vwc-keypad actionText="Start"></vwc-keypad>
`;
```
###### Without # and * buttons

```js preview-story
export const CustomCancelText = () => html`
  <vwc-keypad cancelText="Stop"></vwc-keypad>
`;
```
