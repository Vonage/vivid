import '@vonage/vwc-toggle-buttons-group/vwc-toggle-buttons-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Atoms/Toggle-buttons-group',
  component: 'vwc-toggle-buttons-group',
  argTypes
};

const Template = args => html`<vwc-toggle-buttons-group ...=${spread(args)}></vwc-toggle-buttons-group>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
