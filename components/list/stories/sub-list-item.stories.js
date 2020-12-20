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
	const { open } = panel;
	panel[open ? 'close' : 'show']();
	this.activated = open ? true : false;
}



const Template = args => html`
	<vwc-list multi activatable style=${styleMap(listStyles)}>
		<vwc-list-item ...=${spread(args)} @click="${toggleExpansion}">
			Parent 1
			<vwc-icon type="down-full" slot="meta"></vwc-icon>
		</vwc-list-item>
		<vwc-list-expansion-panel>
			<vwc-list-item>
				Child 1
			</vwc-list-item>
			<vwc-list-item>
				Child 2
			</vwc-list-item>
		</vwc-list-expansion-panel>
		<vwc-list-item ...=${spread(args)} @click="${toggleExpansion}">
			Parent 2
			<vwc-icon type="down-full" slot="meta"></vwc-icon>
		</vwc-list-item>
		<vwc-list-expansion-panel>
			<vwc-list-item>
				Child 1
			</vwc-list-item>
			<vwc-list-item ...=${spread(args)} @click="${toggleExpansion}">
				Child 2
				<vwc-icon type="down-full" slot="meta"></vwc-icon>
			</vwc-list-item>
			<vwc-list-expansion-panel>
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
