import '@vonage/vwc-radio/vwc-radio.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Radio',
	component: 'vwc-radio',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Pre-selected</h3>
	<vwc-radio name="group-a" value="value1"></vwc-radio>
	<vwc-radio name="group-a" value="value2" checked></vwc-radio>

	<h3>Non-selected</h3>
	<vwc-radio name="group-b" value="value1"></vwc-radio>
	<vwc-radio name="group-b" value="value2"></vwc-radio>
`;
