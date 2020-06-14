import '@vonage/vwc-button/vwc-button.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Button',
	component: 'vwc-button',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Unelevated</h3>
	<vwc-button unelevated>Unelevated</vwc-button>
	<vwc-button unelevated icon="code">Unelevated</vwc-button>

	<h3>Outlined</h3>
	<vwc-button outlined>Outlined</vwc-button>
	<vwc-button outlined icon="code">Outlined</vwc-button>

	<h3>Disabled</h3>
	<vwc-button disabled unelevated icon="code">Disabled</vwc-button>
	<vwc-button disabled outlined icon="code">Disabled</vwc-button>
`;