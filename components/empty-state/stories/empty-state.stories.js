import '@vonage/vwc-empty-state/vwc-empty-state.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/⭐️ Empty State',
	component: 'vwc-empty-state',
	argTypes
};

const Template = args => html`<vwc-empty-state ...=${spread(args)}></vwc-empty-state>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'chat-line', heading: 'Empty State Title', body: 'Empty state body for more information' };
