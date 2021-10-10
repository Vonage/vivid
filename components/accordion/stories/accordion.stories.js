import '@vonage/vwc-accordion/vwc-accordion.js';
import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Accordion',
	component: 'vwc-accordion',
	argTypes
};

const Template = args => html`
  <vwc-accordion ...=${spread(args)}>
    <vwc-expansion-panel header="Item 1">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 2">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 3">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 4">Content</vwc-expansion-panel>
  </vwc-accordion>
`;

export const Basic = Template.bind({});

export const Multi = Template.bind({});
Multi.args = { multi: '' };
