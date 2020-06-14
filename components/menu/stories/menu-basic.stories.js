import '@vonage/vwc-menu/vwc-menu.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-button/vwc-button.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Menu',
	component: 'vwc-menu',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-button id="button" label="Open Menu" @click="${anchorClickHandler}"></vwc-button>
	<vwc-menu id="menu">
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-menu>
`;

function anchorClickHandler(event) {
	const menu = event.target.parentNode.querySelector('#menu');
	menu.anchor = event.target;
	menu.corner = 'BOTTOM_START';
	menu.open = true;
}