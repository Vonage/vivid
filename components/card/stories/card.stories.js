import '@vonage/vwc-card/vwc-card.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Alpha/Components/Card',
  component: 'vwc-card',
  argTypes
};

const Template = args => html`<vwc-card ...=${spread(args)}></vwc-card>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
