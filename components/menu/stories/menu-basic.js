import { html } from 'lit-element';

export const basic = () => html`
	<h3>Top end</h3>
	<div style="position: relative">
		<vwc-button id="basic-button-a" unelevated label="Open menu" @click="${anchorAClickHandler}"></vwc-button>
		<vwc-menu id="basic-menu-a">
			<vwc-list-item>Basic item 1</vwc-list-item>
			<vwc-list-item>Basic item 2</vwc-list-item>
			<vwc-list-item>Basic item 3</vwc-list-item>
			<vwc-list-item>Basic item 4</vwc-list-item>
		</vwc-menu>
	</div>

	<h3>Bottom start</h3>
	<div style="position: relative">
		<vwc-button id="basic-button-b" unelevated label="Open menu" @click="${anchorBClickHandler}"></vwc-button>
		<vwc-menu id="basic-menu-b">
			<vwc-list-item>Basic item 1</vwc-list-item>
			<vwc-list-item>Basic item 2</vwc-list-item>
			<vwc-list-item>Basic item 3</vwc-list-item>
			<vwc-list-item>Basic item 4</vwc-list-item>
		</vwc-menu>
	</div>
`;

function anchorAClickHandler() {
	const anchor = document.querySelector('#basic-button-a');
	const menu = document.querySelector('#basic-menu-a');
	menu.anchor = anchor;
	menu.corner = 'TOP_END';
	menu.open = true;
}

function anchorBClickHandler() {
	const anchor = document.querySelector('#basic-button-b');
	const menu = document.querySelector('#basic-menu-b');
	menu.anchor = anchor;
	menu.corner = 'BOTTOM_START';
	menu.open = true;
}