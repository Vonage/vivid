import '@vonage/vwc-dropdown';
import '@vonage/vwc-button';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-check-list-item.js';
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
		<vwc-dropdown id="dropdown" ...=${spread(args)}>
			<vwc-textfield label="Do something..."></vwc-textfield>
			<vwc-list multi>
				<vwc-check-list-item left>
					Basic item 1
				</vwc-check-list-item>
				<vwc-check-list-item left>
					Basic item 2
				</vwc-check-list-item>
				<vwc-check-list-item left>
					Basic item 3
				</vwc-check-list-item>
				<vwc-check-list-item left>
					Basic item 4
				</vwc-check-list-item>
			</vwc-list>
			<vwc-button slot="footer" layout="filled" @click="${actionClickHandler}">Done</vwc-button>
			<vwc-button slot="footer" @click="${actionClickHandler}">Cancel</vwc-button>
		</vwc-dropdown>
	</div>
`;

export const ComplexContent = TemplateA.bind({});
ComplexContent.args = {
	corner: 'BOTTOM_START'
}

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const dropdown = document.querySelector('#dropdown');
	dropdown.anchor = anchor;
	dropdown.open = true;
}

function actionClickHandler() {
	const dropdown = document.querySelector('#dropdown');
	dropdown.open = false;
}