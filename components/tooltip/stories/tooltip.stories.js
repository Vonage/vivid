import '@vonage/vwc-tooltip';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Tooltip',
	component: 'vwc-tooltip',
	argTypes
}

const Template = args => html`    
	<style>
		.tooltip-wrapper {
			width: 100%;
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vvd-color-neutral-10);
		}
		vwc-button {
			position:relative;
		}
	</style>
	<div class="tooltip-wrapper">
		<vwc-button id="button" layout="outlined" outlined aria-describedby="tooltip" @click="${onClick}">Click to open tooltip</vwc-button>
		<vwc-tooltip id="tooltip" ...=${spread(args)}></vwc-tooltip>
	</div>`;

export const WithCustomButton = Template.bind({});
WithCustomButton.args = { content: 'This is a tooltip', dismissible: true };

function onClick(e) {
	const tooltip = document.querySelector("vwc-tooltip");
	const button = document.querySelector("#button");
	if(tooltip.open){
		tooltip.hide();
	}else{
		tooltip.anchor = button;
		tooltip.show();
	}
}