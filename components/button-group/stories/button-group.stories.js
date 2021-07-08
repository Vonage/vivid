import '@vonage/vwc-button-group/vwc-button-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Atoms/Button-group',
  component: 'vwc-button-group',
  argTypes
};

const Template = args => html`<vwc-button-group ...=${spread(args)}></vwc-button-group>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
