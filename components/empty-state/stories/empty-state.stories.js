import '@vonage/vwc-empty-state/vwc-empty-state.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';
import { svg } from './svg.js';

export default {
	title: 'Alpha/Components/⭐️ Empty State',
	component: 'vwc-empty-state',
	argTypes
};

const Template = args => html`<vwc-empty-state ...=${spread(args)}></vwc-empty-state>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'chat-line', heading: 'Empty State Title', body: 'Empty state body for more information' };

const SlottedTemplate = args => html`<vwc-empty-state ...=${spread(args)}>
	<span slot="graphic">
		${svg}
	</span>
</vwc-empty-state>`;

export const Slotted = SlottedTemplate.bind({});
Slotted.args = { heading: 'Empty State Title', body: 'Empty state body for more information' };
