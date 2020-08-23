import '@vonage/vwc-checkbox/vwc-checkbox.js';
import '@vonage/vwc-formfield/vwc-formfield.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Checkbox',
	component: 'vwc-checkbox'
}

export const basic = () => html`
	<h3>Regular</h3>
	<vwc-formfield label="Use email">
		<vwc-checkbox></vwc-checkbox>
	</vwc-formfield>

	<h3>Checked</h3>
	<vwc-formfield label="SMS auth enabled">
		<vwc-checkbox checked></vwc-checkbox>
	</vwc-formfield>

	<h3>Indeterminate</h3>
	<vwc-formfield label="Phone number publicly visible">
		<vwc-checkbox indeterminate></vwc-checkbox>
	</vwc-formfield>

	<h3>Disabled</h3>
	<vwc-formfield label="London">
		<vwc-checkbox disabled></vwc-checkbox>
	</vwc-formfield>
	<vwc-formfield label="Moscow">
		<vwc-checkbox disabled checked></vwc-checkbox>
	</vwc-formfield>
	<vwc-formfield label="Tel Aviv">
		<vwc-checkbox disabled indeterminate></vwc-checkbox>
	</vwc-formfield>
`;
