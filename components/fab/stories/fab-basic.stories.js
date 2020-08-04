import '@vonage/vwc-fab/vwc-fab.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Fab',
	component: 'vwc-fab',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Mini</h3>
	<vwc-fab mini icon="add"></vwc-fab>

	<h3>Extended</h3>
	<vwc-fab extended icon="shopping_cart" label="Add to cart"></vwc-fab>
`;