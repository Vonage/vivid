import '@vonage/vwc-icon';
import '@vonage/vwc-button/vwc-button.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Icon',
	component: 'vwc-icon',
	argTypes
};

const Template = args => html`
	<vwc-icon ...=${spread(args)}></vwc-icon>
`;

const InlineTemplate = args => html`
	<p>I <vwc-icon ...=${spread(args)}></vwc-icon> VIVID!</p>
`;

export const Basic = Template.bind({});
Basic.args = { type: 'profile-line' };

export const Inline = InlineTemplate.bind({});
Inline.args = {
	size: 'medium', inline: '', type: 'heart', style: 'color: red'
};
