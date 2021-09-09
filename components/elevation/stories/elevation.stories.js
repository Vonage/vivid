import '@vonage/vwc-elevation/vwc-elevation.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Alpha/Components/Elevation',
  component: 'vwc-elevation',
  argTypes
};

const Template = args => html`<vwc-elevation ...=${spread(args)}></vwc-elevation>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
