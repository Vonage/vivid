import '@vonage/vwc-side-drawer';
import '@vonage/vwc-top-app-bar';
import '@vonage/vwc-top-app-bar-fixed';
import '@vonage/vwc-icon';
import '@vonage/vwc-layout';
import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import '@vonage/vwc-list/vwc-list-expansion-panel';

import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

export default {
	title: 'Getting Started/Usage Examples/Side Drawer',
	argTypes: {
		alternate: {
			control: {
				type: 'inline-radio',
				options: { true: '', false: undefined }
			}
		},
		open: {
			control: {
				type: 'inline-radio',
				options: { true: '', false: undefined }
			}
		},
		type: {
			control: {
				type: 'select',
				options: ['', 'modal', 'dismissible'],
			}
		},
	}
};

const style = html`
	<style>
		.sb-show-main.sb-main-padded {
			padding: 0;
		}
		p {
			color: "#C0C0C0";
			font-weight: "bold";
		}
		vwc-side-drawer#side-drawer{
			--side-drawer-background-color: var(--vvd-color-neutral-10);
		}
	</style>
`;

const loremIpsum = () => html`
<vwc-layout gutters="md">
	<div>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
		standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
		a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
		remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
		Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
		of Lorem Ipsum.
	</div>
</vwc-layout>
`;

const content = () => Array(20).fill().map(loremIpsum);

const sideDrawerContent = html`
<span slot="top-bar">
	<vwc-icon type="vonage-mono"></vwc-icon>
	<vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
</span>
<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
	<vwc-list-item shape="rounded" graphic="icon">
		<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
	</vwc-list-item>

	<p>SECTION TITLE</p>

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

	<p>SECTION TITLE</p>

	<vwc-list-expansion-panel>
		<vwc-list-item slot="header" shape="rounded" graphic="icon">
			<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
		</vwc-list-item>
		<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
		<vwc-list-item shape="rounded">2nd level item</vwc-list-item>
	</vwc-list-expansion-panel>
</vwc-list>`;

const WithAppContentTemplate = args => html`
	${style}
	<vwc-side-drawer id="side-drawer" hastopbar ...=${spread(args)}>
		${sideDrawerContent}
	
		<main slot="app-content">
			${content()}
		</main>
	</vwc-side-drawer>
`;

export const WithAppContent = WithAppContentTemplate.bind({});
WithAppContent.args = {};

const topAppBarContent = html`
	<span slot="actionItems">
		<vwc-button label="Action" layout="outlined" icon="search-line" type="submit">
			<button type="submit" style="display: none;"></button>
		</vwc-button>
		<vwc-button label="Action" layout="outlined" icon="info-line" type="submit">
			<button type="submit" style="display: none;"></button>
		</vwc-button>
		<vwc-button label="Action" layout="outlined" icon="share-line" type="submit">
			<button type="submit" style="display: none;"></button>
		</vwc-button>
	</span>
`;

const WithTopAppBarTemplate = args => html`
	${style}
	<vwc-side-drawer alternate hastopbar ...=${spread(args)}>
		${sideDrawerContent}
	
		<vwc-top-app-bar slot="app-content">
			${topAppBarContent}
			<main>
				${content()}
			</main>
		</vwc-top-app-bar>
	</vwc-side-drawer>
`;

export const WithTopAppBar = WithTopAppBarTemplate.bind({});
WithTopAppBar.args = {};

const topAppBarFixedContent = html`
	<vwc-icon-button slot="navigationIcon" icon="vonage-mono"></vwc-icon-button>
	<span slot="title">VONAGE</span>
	<span slot="actionItems">
		<vwc-icon-button icon="search-line"></vwc-icon-button>
		<vwc-icon-button icon="info-line"></vwc-icon-button>
		<vwc-icon-button icon="share-line"></vwc-icon-button>
	</span>
`;

const WithTopAppBarFixedTemplate = args => html`
	${style}
	<vwc-top-app-bar-fixed alternate slot="app-content">
		${topAppBarFixedContent}
		<vwc-side-drawer ...=${spread(args)}>
			${sideDrawerContent}
			<main slot="app-content">${content()}</main>
		</vwc-side-drawer>
	</vwc-top-app-bar-fixed>
`;

export const WithTopAppBarFixed = WithTopAppBarFixedTemplate.bind({});
WithTopAppBarFixed.args = {};

