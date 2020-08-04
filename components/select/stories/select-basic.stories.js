import '@vonage/vwc-select/vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-button/vwc-button.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Select',
	component: 'vwc-select',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Outlined</h3>
	<vwc-select outlined label="VWC Select" helper="Helper Text">
		<vwc-list-item></vwc-list-item>
		<vwc-list-item value="0">Item 0</vwc-list-item>
		<vwc-list-item value="1">Item 1</vwc-list-item>
		<vwc-list-item value="2">Item 2</vwc-list-item>
		<vwc-list-item value="3">Item 3</vwc-list-item>
		<vwc-list-item noninteractive>
			<vwc-button unelevated style="cursor: inherit; pointer-events: auto;">Click me</vwc-button>
		</vwc-list-item>
	</vwc-select>

	<h3>Disabled</h3>
	<vwc-select disabled outlined label="VWC Select" helper="Helper Text">
		<vwc-list-item></vwc-list-item>
		<vwc-list-item value="0" selected>Item 0</vwc-list-item>
		<vwc-list-item value="1">Item 1</vwc-list-item>
		<vwc-list-item value="2">Item 2</vwc-list-item>
		<vwc-list-item value="3">Item 3</vwc-list-item>
	</vwc-select>

	<h3>Required</h3>
	<vwc-select required outlined label="VWC Select" validationMessage="This Field is Required">
		<vwc-list-item></vwc-list-item>
		<vwc-list-item value="0">Item 0</vwc-list-item>
		<vwc-list-item value="1">Item 1</vwc-list-item>
		<vwc-list-item value="2">Item 2</vwc-list-item>
		<vwc-list-item value="3">Item 3</vwc-list-item>
	</vwc-select>
`;
