import '@vonage/vwc-drawer';
import '@vonage/vwc-button';
import '@vonage/vwc-menu';
import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/Drawer',
	component: 'vwc-drawer',
	decorators: [withA11y]
}

export const basic = () => html`
	<div style="position: relative;">
		<vwc-button id="button" unelevated label="Open Menu" @click="${handleClick}"></vwc-button>
		<vwc-menu id="menu">
			<vwc-drawer hasHeader>
				<span slot="title">Drawer Title</span>
				<span slot="subtitle">subtitle</span>
				<vwc-list>
					<vwc-list-item>Item 0</vwc-list-item>
					<vwc-list-item>Item 1</vwc-list-item>
					<vwc-list-item>Item 2</vwc-list-item>
					<vwc-list-item>Item 3</vwc-list-item>
				</vwc-list>
			</vwc-drawer>
		</vwc-menu>
	</div>
`;

function handleClick() {
	menu.open = true;
}