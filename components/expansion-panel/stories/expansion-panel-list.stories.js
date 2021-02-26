import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import '@vonage/vwc-expansion-panel/vwc-expansion-panel-list.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-expansion-panel-list.js';

export default {
  title: 'Components/Atoms/Expansion Panel List',
  component: 'vwc-expansion-panel-list',
  argTypes
};

const Template = args => html`
  <vwc-expansion-panel-list ...=${spread(args)}>
    <vwc-expansion-panel header="Item 1">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 2">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 3">Content</vwc-expansion-panel>
    <vwc-expansion-panel header="Item 4">Content</vwc-expansion-panel>
  </vwc-expansion-panel-list>
`;

export const Basic = Template.bind({});

export const Multi = Template.bind({});
Multi.args = { multi: '' };
