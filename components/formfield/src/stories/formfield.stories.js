import '@vonage/vwc-formfield';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-switch';
import '@vonage/vwc-radio';
import { html } from 'lit-element';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Formfield',
	component: 'vwc-formfield',
	argTypes
};

const Template = args => html`
	<main style="width: 400px; border: 5px black dotted; padding: 5px;">
		<vwc-formfield label="This is a checkbox.">
			<vwc-checkbox></vwc-checkbox>
		</vwc-formfield>
		<h4>Align End</h4>
		<vwc-formfield alignend="" label="This is a checkbox.">
			<vwc-checkbox></vwc-checkbox>
		</vwc-formfield>
		<h4>Native Element</h4>
		<vwc-formfield alignend="" label="Enter a date."><input type="date" aria-label="Enter a date."></vwc-formfield>
		<h4>Switch</h4>
		<vwc-formfield label="This is a switch.">
			<vwc-switch></vwc-switch>
		</vwc-formfield>
		<h4>Radio Button</h4>
		<vwc-formfield label="This is a radio.">
			<vwc-radio id="one" name="a"></vwc-radio>
		</vwc-formfield>
		<vwc-formfield label="This is a radio.">
			<vwc-radio id="two" name="a" checked="checked"></vwc-radio>
		</vwc-formfield>
		<vwc-formfield label="This is a radio.">
			<vwc-radio id="three" name="a"></vwc-radio>
		</vwc-formfield>
	</main>
`;


export const FormfieldExamples = Template.bind({});
FormfieldExamples.args = {};
