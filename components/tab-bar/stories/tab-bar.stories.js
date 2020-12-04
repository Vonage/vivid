import '@vonage/vwc-tab-bar/vwc-tab-bar.js';
import '@vonage/vwc-tab-bar/vwc-tab.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
  title: 'Atoms/Tab Bar',
  component: 'vwc-tab-bar',
  subcomponents: 'vwc-tab',
  argTypes: { styles: { table: { disable: true } } }
};

const Template = args => html`
  <vwc-tab-bar ...=${spread(args)}>
    <vwc-tab label="Tab one" @MDCTab:interacted="${handleInteraction}"></vwc-tab>
    <vwc-tab label="Tab two" @MDCTab:interacted="${handleInteraction}"></vwc-tab>
    <vwc-tab label="Tab three" @MDCTab:interacted="${handleInteraction}"></vwc-tab>
  </vwc-tab-bar>`;

export const Basic = Template.bind({});

export const ActiveIndex = Template.bind({});
ActiveIndex.args = { activeIndex: '1' };

function handleInteraction() {
  console.log('MDCTab:interacted event');
}
