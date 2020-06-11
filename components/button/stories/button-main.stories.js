import { VWCButton } from '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Button',
	component: VWCButton
}

export const unelevated = () => html`
	<vwc-button unelevated>Unelevated</vwc-button>
	<vwc-button unelevated icon="code">Unelevated</vwc-button>
`;

export const outlined = () => html`
	<vwc-button outlined>Outlined</vwc-button>
	<vwc-button outlined icon="code">Outlined</vwc-button>
`;

export const disabled = () => `
	<vwc-button disabled unelevated icon="code">Disabled</vwc-button>
	<vwc-button disabled outlined icon="code">Disabled</vwc-button>
`;