import '@vonage/vwc-keypad/vwc-keypad.js';
import { html } from 'lit-element';

export default {
	title: 'Composite/Keypad',
	component: 'vwc-keypad'
}

export const basic = () => html`
	<h3>Default</h3>
  <vwc-keypad></vwc-keypad>

  <h3>Without Display</h3>
  <vwc-keypad no-display></vwc-keypad>

  <h3>Only Numeric Buttons</h3>
  <vwc-keypad no-asterisk no-hash></vwc-keypad>

  <h3>Custom Action Text</h3>
  <vwc-keypad actionText="Start"></vwc-keypad>

  <h3>Custom Cancel Text</h3>
  <vwc-keypad cancelText="Stop"></vwc-keypad>
`;
