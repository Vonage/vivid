import '@vonage/vwc-side-drawer';
import '@vonage/vwc-list/vwc-list-expansion-panel';
import '@vonage/vwc-text';

import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { pageContentMock } from '../../../scripts/storybook/svg_templates';

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
		div#demo {
			position: relative;
			display: flex;
			width: 1060px;
			height: 540px;
			margin: auto;
			border-radius: 10px;
			overflow: hidden;
			box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
			border: solid 1px #ccc;
		}
		vwc-side-drawer#side-drawer {
			height: inherit;
			--side-drawer-background-color: var(--vvd-color-neutral-10);
		}
	</style>

	<div id="demo">
		${SideDrawerTemplate(args)}
	</div>`;

const SideDrawerTemplate = args => html`
	<vwc-side-drawer id="side-drawer" ...=${spread(args)} @click="${onClick}">
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
			${unsafeSVG(pageContentMock())}
		</div>
	</vwc-side-drawer>`;

export const Basic = Template.bind({});
Basic.args = { };

export const Alternate = Template.bind({});
Alternate.args = { alternate: true };

export const TopBar = Template.bind({});
TopBar.args = { hasTopBar: true };

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