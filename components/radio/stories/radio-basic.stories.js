import '@vonage/vwc-radio/vwc-radio.js';
import '@vonage/vwc-formfield/vwc-formfield.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Radio',
	component: 'vwc-radio',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Pre-selected</h3>
	<vwc-formfield label="BMW">
		<vwc-radio name="group-a" value="value1"></vwc-radio>
	</vwc-formfield>
	<vwc-formfield label="Opel">
		<vwc-radio name="group-a" value="value2" checked></vwc-radio>
	</vwc-formfield>

	<h3>Non-selected</h3>
	<vwc-formfield label="Asia">
		<vwc-radio name="group-b" value="value1"></vwc-radio>
	</vwc-formfield>
		<vwc-formfield label="Europe">
		<vwc-radio name="group-b" value="value2"></vwc-radio>
	</vwc-formfield>
`;
