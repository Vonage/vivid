import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const TemplateA = args => html`
	<style>
		.container {
			position: relative;
		}

		.container div {
			margin: 16px;
		}
	</style>
	<div class="container">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="menu" ...=${spread(args)}>
			<div @click="${itemSelect}">Basic item 1</div>
			<div @click="${itemSelect}">Basic item 2</div>
			<div @click="${itemSelect}">Basic item 3</div>
			<div @click="${itemSelect}">Basic item 4</div>
		</vwc-menu>
	</div>
`;

export const WithDivItems = TemplateA.bind({});

function itemSelect(e) {
	console.log(`option ${e.target.textContent} selected`);
	e.target.closest('#menu').close();
}

const TemplateB = args => html`
	<div style="position: relative">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="menu" ...=${spread(args)}>
			<vwc-list-item>Basic item 1</vwc-list-item>
			<vwc-list-item>Basic item 2</vwc-list-item>
			<vwc-list-item>Basic item 3</vwc-list-item>
			<vwc-list-item>Basic item 4</vwc-list-item>
		</vwc-menu>
	</div>
`;

export const WithVWCListItem = TemplateB.bind({});

const TemplateC = args => html`
	<div style="position: relative">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="menu" ...=${spread(args)}>
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

export const WithVWCListItemComplex = TemplateC.bind({});

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const menu = document.querySelector('#menu');
	menu.anchor = anchor;
	menu.open = true;
}
