import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/List',
	component: 'vwc-list',
	decorators: [withA11y]
}

export const basic = () => html`
	<vwc-list>
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-list>
`;