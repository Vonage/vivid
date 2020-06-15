import '@vonage/vwc-menu/vwc-menu.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-button/vwc-button.js';
import '@vonage/vwc-fab/vwc-fab.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atomic/Menu',
	component: 'vwc-menu',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-button id="button" label="Open Menu" @click="${anchorAClickHandler}"></vwc-button>
	<vwc-menu id="menu">
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-menu>
`;

function anchorAClickHandler(event) {
	const menu = event.target.parentNode.querySelector('#menu');
	menu.anchor = event.target;
	menu.corner = 'BOTTOM_START';
	menu.open = true;
}

export const cascading = () => html`
	<vwc-fab mini icon="more_vert" @click="${anchorBClickHandler}"></vwc-fab>
	<vwc-menu id="context-menu-base">
		<vwc-list-item>Root menu item A</vwc-list-item>
		<vwc-list-item>Root menu item B</vwc-list-item>
		<vwc-list-item>Root menu item C</vwc-list-item>
		<li divider role="separator"></li>
		<vwc-list-item @click="${anchorCClickHandler}">Root menu item D</vwc-list-item>
		<vwc-list-item>Root menu item E</vwc-list-item>
	</vwc-menu>
	<vwc-menu id="context-menu-nested">
		<vwc-list-item>Nested menu item A</vwc-list-item>
		<li divider role="separator"></li>
		<vwc-list-item>Nested menu item B</vwc-list-item>
		<vwc-list-item>Nested menu item C</vwc-list-item>
	</vwc-menu>
`;

function anchorBClickHandler(event) {
	const menu = event.target.parentNode.querySelector('#context-menu-base');
	menu.anchor = event.target;
	menu.corner = 'BOTTOM_START';
	menu.open = true;
}

function anchorCClickHandler(event) {
	console.log('something');
	const menu = event.target.parentNode.parentNode.querySelector('#context-menu-nested');
	menu.anchor = event.target;
	menu.corner = 'TOP_END';
	menu.open = true;
}
