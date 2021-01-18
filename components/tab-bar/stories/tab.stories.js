import '@vonage/vwc-tab-bar/vwc-tab-bar.js';
import '@vonage/vwc-tab-bar/vwc-tab.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-tab.js';

export default {
  title: 'Components/Atoms/Tab',
  component: 'vwc-tab',
  argTypes
};

const Template = args => html`
  <vwc-tab-bar>
    <vwc-tab ...=${spread(args)} @MDCTab:interacted="${handleInteraction}"></vwc-tab>
    <vwc-tab ...=${spread(args)} @MDCTab:interacted="${handleInteraction}"></vwc-tab>
    <vwc-tab ...=${spread(args)} @MDCTab:interacted="${handleInteraction}"></vwc-tab>
  </vwc-tab-bar>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Tab' }

export const WithIcon = Template.bind({});
WithIcon.args = { icon: 'chat', label: 'Tab' }

export const IconOnly = Template.bind({});
IconOnly.args = { icon: 'chat' }

function handleInteraction() {
  console.log('MDCTab:interacted event');
}
