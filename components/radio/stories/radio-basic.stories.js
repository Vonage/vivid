import '@vonage/vwc-radio/vwc-radio.js';
import '@vonage/vwc-formfield/vwc-formfield.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Radio',
	component: 'vwc-radio'
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

	<h3>Disabled</h3>
	<vwc-formfield label="London">
		<vwc-radio name="group-c" value="value1" disabled></vwc-radio>
	</vwc-formfield>
		<vwc-formfield label="New York">
		<vwc-radio name="group-c" value="value2" checked disabled></vwc-radio>
	</vwc-formfield>
`;
