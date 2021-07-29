import '@vonage/vwc-chip/vwc-chip.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Chip',
	component: 'vwc-chip',
	argTypes
};

const Template = args => html`<vwc-chip ...=${spread(args)}></vwc-chip>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', disabled: 'false' };
