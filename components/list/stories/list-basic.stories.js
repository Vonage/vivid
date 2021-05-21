import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list.js';

export default {
	title: 'Components/List',
	component: 'vwc-list',
	subcomponents: 'vwc-list-item',
	argTypes
};

const renderList = args => html`
	<style>
		.box,
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list ...=${spread(args)}>
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-list>`;

export const Basic = args => html`
	<h4>Main</h4>
	<div class="box">
		${renderList(args)}
	</div>
	<h4>Alternate</h4>
	<div class="box vvd-scheme-alternate">
		${renderList(args)}
	</div>
`;

export const metaIcon = args => html`
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

export const Shape = renderList.bind({});
Shape.args = { shape: 'rounded' };
