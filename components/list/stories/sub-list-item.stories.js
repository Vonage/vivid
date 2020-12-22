import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
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

const Template = () => html`
	<vwc-list style=${styleMap(listStyles)}>
		<vwc-list-item>
			Parent 1
		</vwc-list-item>
		<vwc-list-expansion-panel>
			<vwc-list-item slot="header">
				Parent 2
			</vwc-list-item>
			<vwc-list-item>
				Child 1
			</vwc-list-item>
			<vwc-list-item>
				Child 2
			</vwc-list-item>
		</vwc-list-expansion-panel>
		<vwc-list-expansion-panel>
			<vwc-list-item slot="header">
				Parent 3
			</vwc-list-item>
			<vwc-list-item>
				Child 1
			</vwc-list-item>
			<vwc-list-expansion-panel>
				<vwc-list-item slot="header">
					Child 2
				</vwc-list-item>
				<vwc-list-item>
					Grand child 1
				</vwc-list-item>
				<vwc-list-item>
					Grand child 2
				</vwc-list-item>
			</vwc-list-expansion-panel>
		</vwc-list-expansion-panel>
	</vwc-list>
`;

export const Expandable = Template.bind({});
