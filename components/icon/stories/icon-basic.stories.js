import '@vonage/vwc-icon/vwc-icon.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Icon',
	component: 'vwc-icon',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-icon>accessible_forward</vwc-icon>
`;