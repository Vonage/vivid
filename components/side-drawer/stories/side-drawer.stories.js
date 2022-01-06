import '@vonage/vwc-side-drawer';
import '@vonage/vwc-list/vwc-list-expansion-panel';
import '@vonage/vwc-text';

import { html } from 'lit-element';
import { argTypes } from './arg-types.js';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Alpha/Components/Side Drawer',
	component: 'vwc-side-drawer',
	argTypes
};

const Template = args => html`
<style>
	.sb-show-main.sb-main-padded {
  		padding: 0;
  	}
</style>

<vwc-side-drawer ...=${spread(args)} @click="${onClick}">
	<div slot="top-bar">
		<vwc-icon type="vonage-mono"></vwc-icon>
		<vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
	</div>
	<div>
		<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
			<vwc-list-item shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
			</vwc-list-item>
			<p>
				<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
			</p>
			<vwc-list-item shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
			</vwc-list-item>
			<vwc-list-expansion-panel open>
				<vwc-list-item slot="header" shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
				</vwc-list-item>
				<vwc-list-expansion-panel open>
					<vwc-list-item slot="header" shape="rounded">2nd level item</vwc-list-item>
					<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
					<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
				</vwc-list-expansion-panel>
			</vwc-list-expansion-panel>
			<p>
				<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
			</p>
			<vwc-list-expansion-panel>
				<vwc-list-item slot="header" shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
				</vwc-list-item>
				<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
				<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
			</vwc-list-expansion-panel>
		</vwc-list>
	</div>
	<div slot="app-content">
		${content()}
	</div>
</vwc-side-drawer>`;


export const Dismissible = Template.bind({});
Dismissible.args = { open: true };

export const Modal = Template.bind({});
Modal.args = { modal: true, open: true };

export const Alternate = Template.bind({});
Alternate.args = { alternate: true, open: true };

export const TopBar = Template.bind({});
TopBar.args = { hasTopBar: true, open: true };

export const PositionEnd = Template.bind({});
PositionEnd.args = { position: 'end', open: true };

let prevActivatedItem;
function onClick(e) {
	// only list items can be activated
	if (e.target.localName !== "vwc-list-item") {
		return;
	}
	if (e.target.slot === "header") {
		return;
	}
	if (typeof prevActivatedItem !== 'undefined') {
		prevActivatedItem.activated = false;
	}
	prevActivatedItem = e.target;
	prevActivatedItem.activated = true;
}

const loremIpsum = () => html`
	<vwc-text font-face="body-1">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
		standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
		a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
		remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
		Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
		of Lorem Ipsum.
	</vwc-text>
`;

const content = () => Array(8).fill().map(loremIpsum);