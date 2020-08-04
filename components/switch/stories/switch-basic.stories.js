import '@vonage/vwc-switch/vwc-switch.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Switch',
	component: 'vwc-switch',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Default</h3>
  <vwc-switch></vwc-switch>
  <vwc-switch checked></vwc-switch>

  <h3>Disabled</h3>
  <vwc-switch disabled></vwc-switch>
  <vwc-switch checked disabled></vwc-switch>
`;
