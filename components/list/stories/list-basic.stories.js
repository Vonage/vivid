import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';
import '@vonage/vwc-icon';

export default {
	title: 'Atoms/List',
	component: 'vwc-list',
	decorators: [withA11y]
}

export const basic = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<h3>Simple list</h3>
	<vwc-list>
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-list>
`;

export const metaIcon = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<h3>List with meta data (icon)</h3>
	<vwc-list>
		<vwc-list-item hasMeta>
			<span>Item A</span>
			<vwc-icon slot="meta" type="info"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item B</span>
			<vwc-icon slot="meta" type="info"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item C</span>
			<vwc-icon slot="meta" type="info"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item D</span>
			<vwc-icon slot="meta" type="info"></vwc-icon>
		</vwc-list-item>
	</vwc-list>
`;