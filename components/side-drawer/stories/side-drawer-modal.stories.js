import '@vonage/vwc-side-drawer/vwc-side-drawer.js';
import '@vonage/vwc-list/vwc-list-expansion-panel.js';
import { styleMap } from 'lit-html/directives/style-map';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { pageContentMock } from '../../../scripts/storybook/svg_templates';

export default {
	title: 'Alpha/Components/Side Drawer/Modal',
	component: 'vwc-side-drawer',
	argTypes
};

let prevActivatedItem;

const titleStyles = {
	color: "#C0C0C0",
	fontWeight: "bold",
};

const Template = args => html`
	<style>
		div#demo {
			top: 0px;
			position: fixed;
		}
	</style>

	<div id="demo">
		<vwc-side-drawer id="side-drawer" ...=${spread(args)} @click="${onClick}">
			<span slot="top-bar">
				<vwc-icon type="vonage-mono"></vwc-icon> VONAGE
			</span>

			<vwc-list
					innerRole="navigation"
					innerAriaLabel="Primary navigation"
					itemRoles="link"
				>
				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
				</vwc-list-item>

				<p style=${styleMap(titleStyles)}>SECTION TITLE</p>

				<vwc-list-item shape="rounded" graphic="icon">
					<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
				</vwc-list-item>

				<vwc-list-expansion-panel open>
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-expansion-panel open>
						<vwc-list-item slot="header" shape="rounded"
							>2nd level item</vwc-list-item
						>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
						<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
					</vwc-list-expansion-panel>
				</vwc-list-expansion-panel>

				<p style=${styleMap(titleStyles)}>SECTION TITLE</p>

				<vwc-list-expansion-panel >
					<vwc-list-item slot="header" shape="rounded" graphic="icon">
						<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
					</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
					<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
				</vwc-list-expansion-panel>
			</vwc-list>

		</vwc-side-drawer>

		<div id="default"></div>
		${unsafeSVG(pageContentMock())}

	</div>
`;

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

export const Modal = Template.bind({});
Modal.args = { type: 'modal', open: true };
