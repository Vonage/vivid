import { html } from 'lit-element';
import '@vonage/vwc-button';
import '@vonage/vwc-list/vwc-check-list-item';

export const CheckboxItems = () => html`
	<div style="position: relative">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="checkbox-items-menu" corner="BOTTOM_LEFT" multi>
			<vwc-check-list-item twoline left>
				Nested menu item A
				<span slot="secondary">Secondary line</span>
			</vwc-check-list-item>
			<li divider role="separator"></li>
			<vwc-check-list-item twoline left>
				Nested menu item B
				<span slot="secondary">Secondary line</span>
			</vwc-check-list-item>
			<vwc-check-list-item twoline left>
				Nested menu item C
				<span slot="secondary">Secondary line</span>
			</vwc-check-list-item>
		</vwc-menu>
	</div>
`;

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const menu = document.querySelector('#checkbox-items-menu');
	menu.anchor = anchor;
	menu.open = true;
}
