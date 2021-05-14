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

const SizesTemplate = args => html`
	<style>
		dd {
			margin:0;
		}
	</style>

	<dl>
		<dt>Small</dt>
		<dd>
			<vwc-icon size="small" ...=${spread(args)}></vwc-icon>
		</dd>
		<dt>Medium</dt>
		<dd>
			<vwc-icon size="medium" ...=${spread(args)}></vwc-icon>
		</dd>
		<dt>Large</dt>
		<dd>
			<vwc-icon size="large" ...=${spread(args)}></vwc-icon>
		</dd>
	</dl>
`;

const InlineTemplate = args => html`
	<p>I <vwc-icon ...=${spread(args)}></vwc-icon> VIVID!</p>
`;

export const Sizes = SizesTemplate.bind({});
Sizes.args = { type: 'profile-line' };

export const Inline = InlineTemplate.bind({});
Inline.args = { size: 'medium', inline: '', type: 'heart', style: 'color: red' };
