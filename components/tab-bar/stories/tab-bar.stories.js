import '@vonage/vwc-tab-bar/vwc-tab-bar.js';
import '@vonage/vwc-tab-bar/vwc-tab.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
// import { argTypes } from './arg-types.js';

export default {
  title: 'Atoms/Tab Bar',
  component: 'vwc-tab-bar',
	subcomponents: 'vwc-tab',
  // argTypes
};

const TabBarTemplate = args => html`
  <vwc-tab-bar ...=${spread(args)}>
    <vwc-tab label="Tab one" @MDCTab:interacted="${handleInteraction}"></vwc-tab>
    <vwc-tab label="Tab two" @MDCTab:interacted="${handleInteraction}"></vwc-tab>
    <vwc-tab label="Tab three" @MDCTab:interacted="${handleInteraction}"></vwc-tab>
  </vwc-tab-bar>`;

export const Basic = TabBarTemplate.bind({});

// const TabTemplate = args => html`
//   <vwc-tab-bar>
//     <vwc-tab ...=${spread(args)} @MDCTab:interacted="${handleInteraction}"></vwc-tab>
//     <vwc-tab ...=${spread(args)} @MDCTab:interacted="${handleInteraction}"></vwc-tab>
//     <vwc-tab ...=${spread(args)} @MDCTab:interacted="${handleInteraction}"></vwc-tab>
//   </vwc-tab-bar>`;

// export const Icons = TabTemplate.bind({});
// Icons.args = { label: 'Tab', icon: 'bookmark-full' }

function handleInteraction() {
  console.log('MDCTab:interacted event');
}
