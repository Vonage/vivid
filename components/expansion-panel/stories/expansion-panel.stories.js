import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import '@vonage/vwc-textfield/vwc-textfield.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Accordion/Accordion Item',
	component: 'vwc-accordion-item',
	argTypes
};

const Template = args => html`
  <style>
    form {
      display: grid;
      gap: 20px;
    }
  </style>
  <vwc-expansion-panel ...=${spread(args)}>
  <form>
      A campaign describes a specific use case and details of the messages you will be sending through it.
      Such as: sample messages, subscriber opt-in/out, and the associated numbers you will be sending with these messages.

      <vwc-textfield label="Selected Brand" value="Vonage Inc." dense readonly></vwc-textfield>
      <vwc-textfield label="Description" dense></vwc-textfield>
    </form>
  </vwc-expansion-panel>
`;

export const Basic = Template.bind({});
Basic.args = { header: 'Campaign Details' };

export const IndicatorIconSet = Template.bind({});
IndicatorIconSet.args = { header: 'Campaign Details', indicatorIconSet: 'binary' };

export const Dense = Template.bind({});
Dense.args = { header: 'Campaign Details', dense: '' };

export const LeadingToggle = Template.bind({});
LeadingToggle.args = { header: 'Campaign Details', leadingToggle: '' };

export const Icon = Template.bind({});
Icon.args = { header: 'Campaign Details', icon: 'chat-solid' };
