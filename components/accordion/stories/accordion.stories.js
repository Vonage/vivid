import '@vonage/vwc-accordion/vwc-accordion.js';
import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Alpha/Components/Accordion',
  component: 'vwc-accordion',
  argTypes
};

const Template = args => html`
	<div style="width: 500px">
  <vwc-accordion ...=${spread(args)}>
    <vwc-expansion-panel header="Item 1">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 2">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 3">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 4">Content</vwc-expansion-panel>
  </vwc-accordion>
	</div>
`;

const TemplateOutlined = args => html`
	<div style="width: 500px">
		<vwc-expansion-panel header="Item 1" appearance="outlined">
			<div>This is an outlined expansion-panel</div>
		</vwc-expansion-panel>
	</div>
`

export const OutlinedExpansionPanel = TemplateOutlined.bind({});
OutlinedExpansionPanel.args = {};

const TemplateOutlinedBase = args => html`
	<div style="width: 500px">
		<vwc-elevation style="--vvd-elevation-border-radius: 6px">
		<vwc-expansion-panel header="Expansion Panel inside elevation">
			<div>This is a POC. We will fix the elevation tokens and then there will be a border expansion alternative</div>
		</vwc-expansion-panel>
		</vwc-elevation>
	</div>
`

export const ElevatedExpansionPanel = TemplateOutlinedBase.bind({});
ElevatedExpansionPanel.args = {};

export const Basic = Template.bind({});

export const Multi = Template.bind({});
Multi.args = { multi: '' };
