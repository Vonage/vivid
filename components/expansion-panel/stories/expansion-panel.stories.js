import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Components/Composite/Expansion Panel',
  component: 'vwc-expansion-panel',
  argTypes
};

const Template = args => html`
  <vwc-expansion-panel ...=${spread(args)}>
    Some content
  </vwc-expansion-panel>
`;

export const Basic = Template.bind({});
Basic.args = { header: 'Click me' };

export const ChevronToggle = Template.bind({});
ChevronToggle.args = { header: 'Click me', chevronToggle: '' };

export const TrailingToggle = Template.bind({});
TrailingToggle.args = { header: 'Click me', trailingToggle: '', chevronToggle: '' };

export const IconWithTrailingToggle = Template.bind({});
IconWithTrailingToggle.args = { header: 'Click me', icon: 'chat-solid', trailingToggle: '', chevronToggle: '' };
