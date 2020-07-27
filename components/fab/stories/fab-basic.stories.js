import '@vonage/vwc-fab/vwc-fab.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms|Fab',
	component: 'vwc-fab',
	decorators: [withA11y]
}

export const basic = () => html`
	<h3>Mini</h3>
	<vwc-fab mini icon="add" @click="${onClick}"></vwc-fab>

	<h3>Extended</h3>
	<vwc-fab extended icon="shopping_cart" label="Add to cart" @click="${onClick}"></vwc-fab>

	<h3>Mini call-to-action</h3>
	<vwc-fab mini icon="add" connotation="cta" @click="${onClick}"></vwc-fab>

	<h3>Extended call-to-action</h3>
	<vwc-fab extended icon="info" label="Info" connotation="cta" @click="${onClick}"></vwc-fab>
`;

function onClick(event) {
	console.log(`'${event.target.getAttribute('icon')}' fab clicked`);
}