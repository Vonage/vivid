import '@vonage/vwc-calendar/vwc-calendar.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Atoms/Calendar',
  component: 'vwc-calendar',
  argTypes
};

const Template = args => html`<vwc-calendar ...=${spread(args)}></vwc-calendar>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
