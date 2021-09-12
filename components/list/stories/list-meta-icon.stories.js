import '@vonage/vwc-menu';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list.js';

export default {
	title: 'Components/List/Meta Icon',
	component: 'vwc-list',
	subcomponents: 'vwc-list-item',
	argTypes
};

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

export const InteractiveMetaIcon = args => html`
	<vwc-list ...=${spread(args)}>
		<div style="position: relative">
			<vwc-list-item hasmeta twoline style="--mdc-list-item-meta-size: 40px;">
				<span>Item 0</span>
				<span slot="secondary">Secondary line</span>
				<vwc-icon-button shape="circled" slot="meta" id="button" icon="more">
				</vwc-icon-button>
			</vwc-list-item>
			<vwc-menu id="menu" corner="BOTTOM_START">
				<vwc-list-item>item 1</vwc-list-item>
				<vwc-list-item>item 2</vwc-list-item>
				<vwc-list-item>item 3</vwc-list-item>
			</vwc-menu>
		</div>
	</vwc-list>

	<script>
		menu.anchor = button;

		button.addEventListener("click", function (e) {
			menu.open = true;
			// alternatively you can use menu.show();
		});
	</script>
`;

