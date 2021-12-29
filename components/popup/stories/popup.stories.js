import '@vonage/vwc-popup';
import '@vonage/vwc-button';
import '@vonage/vwc-text';

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
		.content {
			max-width: 200px;
			text-align: left;
		}
		.line {
			margin: 5px 0 ;
   	 		background-color: var(--vvd-color-neutral-40);
	  		height: 1px;
		}
	</style>
	<div class="popup-wrapper">
		<vwc-button id="button" layout="outlined" outlined aria-haspopup="true" aria-describedby="popup" @click=${onClick}>Click to open popup</vwc-button>
		<vwc-popup id="popup" ...=${spread(args)}>
			<slot>
				<div class="content">
					<vwc-text font-face="body-1-bold" tight>Popup title</vwc-text>
					<div class="line"></div>
					<vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
				</div>
			</slot>
		</vwc-popup>
	</div>`;

export const Basic = Template.bind({});

export const WithArrow = Template.bind({});
WithArrow.args = { arrow: true, corner: "right" };

export const Dismissible = Template.bind({});
Dismissible.args = { dismissible: true, corner: "bottom" };

function onClick() {
	const popup = document.querySelector("vwc-popup");
	const button = document.querySelector("#button");
	if (popup.open) {
		popup.hide();
	} else {
		popup.anchor = button;
		popup.show();
	}
}