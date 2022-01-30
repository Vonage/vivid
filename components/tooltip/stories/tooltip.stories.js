import '@vonage/vwc-tooltip';
import '@vonage/vwc-icon-button';

import { html } from 'lit-element';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Tooltip',
	component: 'vwc-tooltip',
	argTypes
}

const Template = args => html`
	<style>
	</style>
	<div class="tooltip-wrapper">
		<vwc-icon-button icon="info-line"  shape="circled" aria-describedby="tooltip" aria-haspopup="true" id="button" @click=${onClick}></vwc-icon-button>
		<vwc-tooltip icon="info-line" dismissible style="--tooltip-min-inline-size:150px; --tooltip-max-inline-size:200px" id="tooltip" corner="top" anchor="button" text="I'm the tooltip content"></vwc-tooltip>
	</div>
	`;

export const Basic = Template.bind({text: "I'm the tooltip content", });

function onClick() {
	tooltip.open = !tooltip.open;
}
