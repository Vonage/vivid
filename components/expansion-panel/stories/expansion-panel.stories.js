import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import '@vonage/vwc-textfield/vwc-textfield.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Components/Atoms/Expansion Panel',
  component: 'vwc-expansion-panel',
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

export const ChevronToggle = Template.bind({});
ChevronToggle.args = { header: 'Campaign Details', chevronToggle: '' };

export const TrailingToggle = Template.bind({});
TrailingToggle.args = { header: 'Campaign Details', trailingToggle: '', chevronToggle: '' };

export const IconWithTrailingToggle = Template.bind({});
IconWithTrailingToggle.args = { header: 'Campaign Details', icon: 'chat-solid', trailingToggle: '', chevronToggle: '' };
