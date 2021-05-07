import '@vonage/vwc-helper-message';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Helper Message',
	component: 'vwc-helper-message',
	argTypes
}

const Template = args => html`
	<style>
		.base-content {
			padding: 16px;
			border: 1px solid var(--vvd-color-neutral-50);
			border-radius: 6px;
		}
	</style>
	<div class="base-content" aria-describedby="description-a">
		Some content, requiring a further description in helper message.
	</div>
	<vwc-helper-message ...=${spread(args)} id="description-a">Mid size description of the above</vwc-helper-message>
`;

export const Basic = Template.bind({});
Basic.args = {};

export const AsErrorState = Template.bind({});
AsErrorState.args = {
	'is-error': true
};
