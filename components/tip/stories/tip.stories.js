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
		:root {
			--tooltip-width: 350px;
		}
		.tip-wrapper {
			width:600px;
			height:200px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	</style>
	<div class="tip-wrapper">
		<vwc-tip ...=${spread(args)}></vwc-tip>
	</div>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'info-line', content: 'This is a tooltip that has Paired element that has either ? or ! as button trigger', dismissible: true };
