import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const TemplateA = args => html`
	<style>
		html, body {
			height: 100%;
		}
	</style>
	<div style="position: relative">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="menu" ...=${spread(args)} @selected="${onMenuSelected}">
			<vwc-list-item>Basic item 1</vwc-list-item>
			<vwc-list-item>Basic item 2</vwc-list-item>
			<vwc-list-item>Basic item 3</vwc-list-item>
			<vwc-list-item>Basic item 4</vwc-list-item>
		</vwc-menu>
	</div>
`;

export const WithVWCListItem = TemplateA.bind({});

const TemplateB = args => html`
	<style>
		html, body {
			height: 100%;
		}
	</style>
	<div style="position: relative">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="menu" ...=${spread(args)} @selected="${onMenuSelected}">
			<vwc-list-item>
				<div>Basic item 1</div>
			</vwc-list-item>
			<vwc-list-item>
				<div>Basic item 2</div>
			</vwc-list-item>
			<vwc-list-item>
				<div>Basic item 3</div>
			</vwc-list-item>
			<vwc-list-item>
				<div>Basic item 4</div>
			</vwc-list-item>
		</vwc-menu>
	</div>
`;

export const WithVWCListItemComplex = TemplateB.bind({});

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const menu = document.querySelector('#menu');
	menu.anchor = anchor;
	menu.open = true;
}

function onMenuSelected(e) {
	console.log(e.detail);
}
