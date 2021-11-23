import '@vonage/vwc-popup-tip';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/popup-tip',
	component: 'vwc-popup-tip',
	argTypes
}

const Template = args => html`
	<style>
		:root {
			--tooltip-width: 350px;
		}
		.popup-tip-wrapper {
			width:600px;
			height:200px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	</style>
	<div class="popup-tip-wrapper">
		<vwc-popup-tip ...=${spread(args)}></vwc-popup-tip>
	</div>`;

export const Basic = Template.bind({});
Basic.args = { icon: 'info-line', content: 'This is a tooltip that has Paired element that has either ? or ! as button trigger', dismissible: true };
