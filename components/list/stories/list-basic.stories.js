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
	<vwc-list ...=${spread(args)}>
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-list>`;

export const Basic = args => html`
	<style>
		.box {
			width: 240px;
		}
	</style>

	<h4>Main</h4>
	<div class="box">
		${renderList(args)}
	</div>
	<h4>Alternate</h4>
	<div class="box vvd-scheme-alternate">
		${renderList(args)}
	</div>
`;
