import '@vonage/vwc-radio/vwc-radio.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Radio',
	component: 'vwc-radio',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-radio name="myGroup" value="value1"></vwc-radio>
	<vwc-radio name="myGroup" value="value2" checked></vwc-radio>
`;
