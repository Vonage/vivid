import '@vonage/vwc-popup';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Popup',
	component: 'vwc-popup',
	argTypes
}

const Template = args => html`    
	<style>
		.popup-wrapper {
			width: 100%;
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vvd-color-neutral-10);
		}
	</style>
	<div class="popup-wrapper">
		<vwc-button id="button" layout="outlined" outlined aria-describedby="popup" @click="${onClick}">Click to open popup</vwc-button>
		<vwc-popup id="popup" ...=${spread(args)}></vwc-popup>
	</div>`;

export const Basic = Template.bind({});
Basic.args = { content: 'This is a popup', dismissible: true };

function onClick() {
	const popup = document.querySelector("vwc-popup");
	const button = document.querySelector("#button");
	if(popup.open){
		popup.hide();
	}else{
		popup.anchor = button;
		popup.show();
	}
}