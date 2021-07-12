import '@vonage/vwc-button-group/vwc-button-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Button-group',
	component: 'vwc-button-group',
	argTypes
};

const Template = args => html`<vwc-button-group ...=${spread(args)}>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic' };

export const Raised = Template.bind({});
Raised.args = { label: 'Raised', raised: 'true' };

export const Dense = Template.bind({});
Dense.args = { label: 'Dense', raised: 'true', dense: 'true' };

export const Pill = Template.bind({});
Pill.args = { label: 'Pill', shape: 'pill', raised: 'true' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled', disabled: 'true' };
