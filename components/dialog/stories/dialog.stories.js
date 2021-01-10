import '@vonage/vwc-dialog/vwc-dialog.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Atoms/Dialog',
  component: 'vwc-dialog',
  argTypes
};

const Template = args => html`<vwc-dialog ...=${spread(args)}></vwc-dialog>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
