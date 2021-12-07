import '@vonage/vwc-tip';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/tooltip',
	component: 'vwc-tip',
	argTypes
}

const Template = args => html`
	<style>
		vwc-tip {
			--tooltip-width: 350px;
		}
		.tip-wrapper {
			width: 100%;
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vvd-color-neutral-10);
		}
	</style>
	<div class="tip-wrapper">
		<vwc-tip ...=${spread(args)}></vwc-tip>
	</div>`;

export const Basic = Template.bind({});
Basic.args = { open: true, icon: 'info-line', content: 'This is a tooltip that has Paired element that has either ? or ! as button trigger', dismissible: true };
