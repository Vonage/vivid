import '@vonage/vwc-breadcrumb-item/vwc-breadcrumb-item.js';
import '@vonage/vwc-breadcrumb/vwc-breadcrumb.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Alpha/Components/Breadcrumb',
  component: 'vwc-breadcrumb',
  argTypes
};

const Template = args => html`<vwc-breadcrumb ...=${spread(args)}>
	<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
