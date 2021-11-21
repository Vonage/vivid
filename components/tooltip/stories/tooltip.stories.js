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
		div#wrapper {
			width:600px;
			height:200px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		button {
			position:relative;
		}
	</style>
	<div id="wrapper">
		<vwc-button id="button" layout="outlined" outlined aria-describedby="tooltip" @click="${onClick}">Click to open tooltip</vwc-button>
		<vwc-tooltip ...=${spread(args)}></vwc-tooltip>
	</div>`;

export const Basic = Template.bind({});
Basic.args = { content: 'This is a tooltip', dismissible: true };

function onClick(e) {
	document.querySelector("vwc-tooltip").show(document.querySelector("#button"));
}