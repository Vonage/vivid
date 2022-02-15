import '@vonage/vwc-tooltip';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-text';

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
			margin: 5rem;
		}
	</style>
	<div class="tooltip-wrapper" >
		<vwc-icon-button icon="info-line"  shape="circled" aria-describedby="tooltip" id="button" @click=${onClick}></vwc-icon-button>
		<vwc-tooltip ...=${spread(args)} open icon="info-line"  style="--tooltip-inline-size:180px;" id="tooltip" anchor="button" text="I'm the tooltip content", ></vwc-tooltip>
	</div>
	`;

export const Basic = Template.bind({});
Basic.args = { corner: "top" };

const AfterTitleTemplate = args => html`
	<style>
		.tooltip-wrapper {
			margin-top: 4rem;
			margin-left: 3rem;
		}
	</style>
	<div class="tooltip-wrapper" >
   <div style="display: flex; align-items: center;">
			<vwc-text font-face="title-2" tight><p class="line" style="margin-right: 0.25rem">I'm a title - press the question mark</p></vwc-text>
			<vwc-icon-button icon="info-line"  shape="circled" aria-describedby="tooltip" id="button" @click=${onClick}></vwc-icon-button>
		 <div>
		<vwc-tooltip ...=${spread(args)} open icon="info-line"  style="--tooltip-inline-size:180px;" id="tooltip" anchor="button" text="I'm the tooltip content"></vwc-tooltip>
	</div>
`;

export const InTitle = AfterTitleTemplate.bind({});
InTitle.args = { corner: "top" };

const InsideTextTemplate = args => html`
	<style>
		.tooltip-wrapper {
			margin-top: 4rem;
			margin-left: 3rem;
		}
	</style>
	<div class="tooltip-wrapper" >
			<vwc-text style="display: flex; align-items: center;" font-face="body-1" tight>text with tooltip - press the question mark
			<vwc-icon-button style="margin: 0 0.125rem;" icon="info-line"  shape="circled" aria-describedby="tooltip" id="button" dense @click=${onClick}></vwc-icon-button>
		 more text after tooltip</vwc-text>
		<vwc-tooltip ...=${spread(args)} open icon="info-line" style="--tooltip-inline-size:180px;" id="tooltip" anchor="button" text="I'm the tooltip content"></vwc-tooltip>
	</div>
`;

export const InText = InsideTextTemplate.bind({});
InText.args = { corner: "top" };





function onClick() {
	tooltip.open = !tooltip.open;
}
