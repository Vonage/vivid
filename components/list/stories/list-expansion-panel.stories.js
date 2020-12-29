import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { argTypes } from './arg-types-list-item.js';
import { styleMap } from 'lit-html/directives/style-map';

export default {
	title: 'Components/Atoms/List expansion panel',
	component: 'vwc-list-expansion-panel',
	argTypes
}

const listStyles = {
	'inline-size': '240px',
};

const Template = () => html`
	<div style=${styleMap(listStyles)}>
		<vwc-list-item graphic="icon">
			<vwc-icon slot="graphic" type="home"></vwc-icon>
			Parent 1
		</vwc-list-item>
		<vwc-list-expansion-panel open>
			<vwc-list-item slot="header" graphic="icon">
				<vwc-icon slot="graphic" type="profile"></vwc-icon>
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
			<vwc-list-item slot="header" graphic="icon">
				<vwc-icon slot="graphic" type="gear"></vwc-icon>
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
	</div>
`;

export const ExpansionPanel = Template.bind({});
