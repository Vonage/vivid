import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list.js';

export default {
	title: 'Components/Atoms/List',
	component: 'vwc-list',
	subcomponents: 'vwc-list-item',
	argTypes
}

export const Basic = args => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list ...=${spread(args)}>
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-list>
`;

export const metaIcon = args => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list ...=${spread(args)}>
		<vwc-list-item hasMeta>
			<span>Item A</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item B</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item C</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item D</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
		</vwc-list-item>
	</vwc-list>
`;
