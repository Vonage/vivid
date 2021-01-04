import '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Components/Atoms/Button',
  component: 'vwc-button',
  argTypes
};

const Template = args => html`<vwc-button ...=${spread(args)}></vwc-button>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', layout: 'text' };

export const Filled = Template.bind({});
Filled.args = { label: 'Filled', layout: 'filled' };

export const Outlined = Template.bind({});
Outlined.args = { label: 'Outlined', layout: 'outlined' };

export const PillShape = Template.bind({});
PillShape.args = { label: 'Filled', layout: 'filled', shape: 'pill' };

export const Dense = Template.bind({});
Dense.args = { label: 'Dense', layout: 'filled', dense: '' };

export const Enlarged = Template.bind({});
Enlarged.args = { label: 'Enlarged', layout: 'filled', enlarged: '' };

export const Icon = Template.bind({});
Icon.args = { label: 'Icon', layout: 'filled', icon: 'download' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled', layout: 'filled', disabled: '' };

