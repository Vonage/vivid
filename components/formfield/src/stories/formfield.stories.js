import '@vonage/vwc-formfield';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-switch';
import '@vonage/vwc-radio';
import { html } from 'lit-element';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Formfield',
	component: 'vwc-formfield',
	argTypes
};

const CheckboxTemplate = args => html`
	<mwc-formfield label="Tomato">
		<mwc-checkbox checked></mwc-checkbox>
	</mwc-formfield>`;

const SwitchTemplate = args => html`
	<mwc-formfield label="Airplane mode">
		<mwc-switch checked></mwc-switch>
	</mwc-formfield>`;

const RadioTemplate = args => html`
	<mwc-formfield label="Home">
		<mwc-radio name="location" checked></mwc-radio>
	</mwc-formfield>

	<mwc-formfield label="Work">
		<mwc-radio name="location"></mwc-radio>
	</mwc-formfield>`;

const CheckboxNoWrapTemplate = args => html`
	<style>
		mwc-formfield {
			width: 150px;
		}
	</style>
	<mwc-formfield label="really really long label with wrap">
		<mwc-checkbox></mwc-checkbox>
	</mwc-formfield>
	<mwc-formfield label="really really long label without wrap" nowrap>
		<mwc-checkbox></mwc-checkbox>
	</mwc-formfield>`;

const CheckboxSpaceBetweenTemplate = args => html`
	<style>
		mwc-formfield {
			width: 250px;
			outline: 2px solid black;
			margin: 2px;
		}
	</style>
	<mwc-formfield label="No spaceBetween">
		<mwc-checkbox></mwc-checkbox>
	</mwc-formfield>
	<mwc-formfield label="With spaceBetween" spaceBetween>
		<mwc-checkbox></mwc-checkbox>
	</mwc-formfield>`;

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

export const WithCheckbox = CheckboxTemplate.bind({});
WithCheckbox.args = {};

export const WrapVsNowrap = CheckboxNoWrapTemplate.bind({});
WrapVsNowrap.args = {};

export const Spacebetween = CheckboxSpaceBetweenTemplate.bind({});
Spacebetween.args = {};

export const WithRadio = RadioTemplate.bind({});
WithRadio.args = {};

export const WithSwitch = SwitchTemplate.bind({});
WithSwitch.args = {};
