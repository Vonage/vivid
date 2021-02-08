import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { argTypes } from './arg-types-list-item.js';

export default {
	title: 'Components/Atoms/List expansion panel',
	component: 'vwc-list-expansion-panel',
	argTypes
};

const listStyles = {
	'inline-size': '240px',
};

const Template = () => html`
  <div style=${styleMap(listStyles)}>
    <vwc-list-item shape="rounded" graphic="icon">
      <vwc-icon slot="graphic" type="home"></vwc-icon>
      Parent 1
    </vwc-list-item>
		<vwc-list-expansion-panel open>
			<vwc-list-item slot="header" shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="profile"></vwc-icon>
				Parent 1
			</vwc-list-item>
			<vwc-list-item shape="rounded">
				Child 1
			</vwc-list-item>
			<vwc-list-item shape="rounded">
				Child 2
			</vwc-list-item>
		</vwc-list-expansion-panel>
		<vwc-list-expansion-panel>
			<vwc-list-item slot="header" shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="gear"></vwc-icon>
				Parent 2
			</vwc-list-item>
			<vwc-list-item shape="rounded">
				Child 1
			</vwc-list-item>
			<vwc-list-expansion-panel>
				<vwc-list-item slot="header" shape="rounded">
					Child 2
				</vwc-list-item>
				<vwc-list-item shape="rounded">
					Grand child 1
				</vwc-list-item>
				<vwc-list-item shape="rounded">
					Grand child 2
				</vwc-list-item>
			</vwc-list-expansion-panel>
		</vwc-list-expansion-panel>
	</div>
`;

export const ExpansionPanel = Template.bind({});
