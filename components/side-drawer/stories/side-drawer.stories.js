import '@vonage/vwc-side-drawer/vwc-side-drawer.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Alpha/Components/Side Drawer',
  component: 'vwc-side-drawer',
  argTypes
};

const Template = args => html`<vwc-side-drawer ...=${spread(args)}></vwc-side-drawer>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
