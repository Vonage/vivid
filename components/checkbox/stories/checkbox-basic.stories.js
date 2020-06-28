import '@vonage/vwc-checkbox/vwc-checkbox.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Checkbox',
	component: 'vwc-checkbox',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Regular</h3>
	<vwc-checkbox></vwc-checkbox>

	<h3>Checked</h3>
	<vwc-checkbox checked></vwc-checkbox>

	<h3>Indeterminate</h3>
	<vwc-checkbox indeterminate></vwc-checkbox>

	<h3>Disabled</h3>
	<vwc-checkbox disabled></vwc-checkbox>
	<vwc-checkbox disabled checked></vwc-checkbox>
	<vwc-checkbox disabled indeterminate></vwc-checkbox>
`;