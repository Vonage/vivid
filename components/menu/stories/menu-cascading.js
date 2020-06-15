import { html } from 'lit-element';

export const cascading = () => html`
	<div style="position: relative">
		<vwc-fab id="context-menu-anchor" style="display: inline-flex" mini icon="more_vert" @click="${anchorAClickHandler}"></vwc-fab>
		<vwc-menu id="context-menu-base">
			<vwc-list-item>Root menu item A</vwc-list-item>
			<vwc-list-item>Root menu item B</vwc-list-item>
			<vwc-list-item>Root menu item C</vwc-list-item>
			<li divider role="separator"></li>
			<vwc-list-item id="nested-menu-anchor" @click="${anchorBClickHandler}">Root menu item D ...</vwc-list-item>
			<vwc-list-item>Root menu item E</vwc-list-item>
		</vwc-menu>
		<vwc-menu id="context-menu-nested">
			<vwc-list-item>
				Nested menu item A
			</vwc-list-item>
			<li divider role="separator"></li>
			<vwc-list-item>
				Nested menu item B
			</vwc-list-item>
			<vwc-list-item>
				Nested menu item C
			</vwc-list-item>
		</vwc-menu>
	</div>
`;

function anchorAClickHandler() {
	const anchor = document.querySelector('#context-menu-anchor');
	const menu = document.querySelector('#context-menu-base');
	menu.anchor = anchor;
	menu.corner = 'BOTTOM_START';
	menu.open = true;
}

function anchorBClickHandler(event) {
	const anchor = document.querySelector('#nested-menu-anchor');
	const menu = document.querySelector('#context-menu-nested');
	menu.anchor = anchor;
	menu.corner = 'TOP_END';
	menu.open = true;
	console.dir(event);
	event.preventDefault();
	event.stopPropagation();
	return false;
}
