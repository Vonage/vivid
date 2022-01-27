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
			height: 400px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vvd-color-neutral-10);
		}
		.content {
			width: 200px;
			text-align: left;
			padding: 1rem;
		}
		.line {
			border-bottom: 1px solid var(--vvd-color-neutral-40);
			padding-bottom: 0.5rem;
			margin-bottom: 0.5rem;
		}
	</style>
	<div class="popup-wrapper">
		<vwc-button id="buttonAnchor" layout="outlined" outlined aria-haspopup="true" aria-describedby="popup" @click=${onClick}>Click to open popup</vwc-button>
		<vwc-popup id="popup" open anchor="buttonAnchor" ...=${spread(args)}>
			<div class="content">
				<vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
				<vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
			</div>
		</vwc-popup>
	</div>
	`;

export const Basic = Template.bind({});

export const WithArrow = Template.bind({});
WithArrow.args = { arrow: true, corner: "right" };

export const Alternate = Template.bind({});
Alternate.args = { arrow: true, corner: "bottom", alternate: true };

export const Dismissible = Template.bind({});
Dismissible.args = { dismissible: true, corner: "top" };

function onClick() {
	popup.open = !popup.open;
}
