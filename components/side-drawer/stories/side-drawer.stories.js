import '@vonage/vwc-side-drawer/vwc-side-drawer.js';
import '@vonage/vwc-button/vwc-button.js';
import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import '@vonage/vwc-text/vwc-text.js';
import { styleMap } from 'lit-html/directives/style-map';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Side Drawer',
	component: 'vwc-side-drawer',
	argTypes
};

const titleStyles = {
	color: '#C0C0C0',
	fontWeight: 'bold'
};

const Template = args => html`
   <vwc-side-drawer class="close" id="side-drawer" ...=${spread(args)}>

		<vwc-list-item slot="navigation" activated="" shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
		</vwc-list-item>

		<p slot="navigation" style=${styleMap(titleStyles)}>SECTION TITLE</p>

		<vwc-list-item slot="navigation" shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
		</vwc-list-item>

		<li slot="navigation" divider role="separator" padded></li>

		<vwc-list-item slot="navigation" shape="rounded" graphic="icon">
			<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
		</vwc-list-item>

		<li slot="navigation" divider role="separator" padded></li>

		<vwc-list-expansion-panel open slot="navigation">
			<vwc-list-item slot="header" shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
			</vwc-list-item>
			<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
			<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
		</vwc-list-expansion-panel>

		<p slot="navigation" style=${styleMap(titleStyles)}>SECTION TITLE</p>

		<vwc-list-expansion-panel slot="navigation">
			<vwc-list-item slot="header" shape="rounded" graphic="icon">
				<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
			</vwc-list-item>
			<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
			<vwc-list-expansion-panel>
				<vwc-list-item slot="header" shape="rounded" >2nd level item</vwc-list-item>
				<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
				<vwc-list-item shape="rounded">3rd level item</vwc-list-item>
			</vwc-list-expansion-panel>
		</vwc-list-expansion-panel>

		<div slot="appContent">
			<div>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
			</div>
		</div>

   </vwc-side-drawer>
`;

export const Basic = Template.bind({});
Basic.args = { };

export const Alternate = Template.bind({});
Alternate.args = { alternate: true };


