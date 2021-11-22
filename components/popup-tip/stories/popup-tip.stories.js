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
		div#wrapper {
			width:600px;
			height:200px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		vwc-popup-tip {
			position:relative;
		}
	</style>
	<div id="wrapper">
		<vwc-popup-tip ...=${spread(args)}></vwc-popup-tip>
	</div>`;

export const Basic = Template.bind({});
Basic.args = { content: 'This is a tooltip', dismissible: true };