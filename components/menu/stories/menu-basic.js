import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const Template = args => html`
	<div style="position: relative">
		<vwc-button id="button" label="Open menu" @click="${anchorClickHandler}"></vwc-button>
		<vwc-menu id="menu" ...=${spread(args)}>
			<vwc-list-item>Basic item 1</vwc-list-item>
			<vwc-list-item>Basic item 2</vwc-list-item>
			<vwc-list-item>Basic item 3</vwc-list-item>
			<vwc-list-item>Basic item 4</vwc-list-item>
		</vwc-menu>
	</div>`;

export const Basic = Template.bind({});

function anchorClickHandler() {
	const anchor = document.querySelector('#button');
	const menu = document.querySelector('#menu');
	menu.anchor = anchor;
	menu.open = true;
}
