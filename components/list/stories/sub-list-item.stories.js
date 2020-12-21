import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list-item.js';
import { styleMap } from 'lit-html/directives/style-map';

export default {
	title: 'Atoms/List expansion panel',
	component: 'vwc-list-expansion-panel',
	argTypes
}

const listStyles = {
	'inline-size': '240px',
};

function toggleExpansion() {
	const { nextElementSibling: panel } = this;
	panel.open = !panel.open;
	this.activated = panel.open ? true : false;
}

function onChange(e) {
	console.log(e);
	const { detail: { open } } = e;
	const { target: { previousElementSibling: listItem } } = e;
	const icon = listItem.querySelector('vwc-icon');
	const iconType = open ? 'up-full' : 'down-full';
	icon.setAttribute('type', iconType);
}

const Template = args => html`
	<vwc-list style=${styleMap(listStyles)}>
		<vwc-list-item ...=${spread(args)} @click="${toggleExpansion}">
			Parent 1
			<vwc-icon slot="meta"></vwc-icon>
		</vwc-list-item>
		<vwc-list-expansion-panel @changed="${onChange}">
			<vwc-list-item>
				Child 1
			</vwc-list-item>
			<vwc-list-item>
				Child 2
			</vwc-list-item>
		</vwc-list-expansion-panel>
		<vwc-list-item ...=${spread(args)} @click="${toggleExpansion}">
			Parent 2
			<vwc-icon slot="meta"></vwc-icon>
		</vwc-list-item>
		<vwc-list-expansion-panel @changed="${onChange}">
			<vwc-list-item>
				Child 1
			</vwc-list-item>
			<vwc-list-item ...=${spread(args)} @click="${toggleExpansion}">
				Child 2
				<vwc-icon slot="meta"></vwc-icon>
			</vwc-list-item>
			<vwc-list-expansion-panel @changed="${onChange}">
				<vwc-list-item>
					Grand Child 1
				</vwc-list-item>
				<vwc-list-item>
					Grand Child 2
				</vwc-list-item>
			</vwc-list-expansion-panel>
		</vwc-list-expansion-panel>
	</vwc-list>
`;

export const Expandable = Template.bind({});
Expandable.args = { hasMeta: '' }
