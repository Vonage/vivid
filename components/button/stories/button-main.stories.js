import '@vonage/vwc-button/vwc-button.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Button',
	component: 'vwc-button',
	decorators: [withA11y]
}

export const unelevated = () => html`
	<vwc-button unelevated>Unelevated</vwc-button>
	<vwc-button unelevated icon="code">Unelevated</vwc-button>
`;

export const outlined = () => html`
	<vwc-button outlined>Outlined</vwc-button>
	<vwc-button outlined icon="code">Outlined</vwc-button>
`;

export const disabled = () => html`
	<vwc-button disabled unelevated icon="code">Disabled</vwc-button>
	<vwc-button disabled outlined icon="code">Disabled</vwc-button>
`;