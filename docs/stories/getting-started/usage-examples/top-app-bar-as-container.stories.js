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
	title: 'Getting Started/Usage Examples/Top App Bar',
};

const style = html`
	<style>
		.sb-show-main.sb-main-padded {
			padding: 0;
		}
		vwc-side-drawer#side-drawer {
			/* Initial side drawer height is 100vh, but once the top bar is added, 
			the side drawer height will need to be reduced. */
			height: calc(100vh - 64px);
			--side-drawer-z-index:3;
		}
	</style>
`;

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

const content = () => Array(20).fill().map(loremIpsum);

const listItems = () => html`
	<vwc-list-item shape="rounded" graphic="icon">
		<vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
	</vwc-list-item>
	<p>
		<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
	</p>
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
`;

const sideDrawerContent = html`
	<span slot="top-bar">
		<vwc-icon type="vonage-mono"></vwc-icon>
		<vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
	</span>
	<vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
		<vwc-list-item shape="rounded" graphic="icon">
			<vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
		</vwc-list-item>
		<p>
			<vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
		</p>
		${Array(8).fill().map(listItems)}
	</vwc-list>`;

const topAppBarFixedContent = html`
	<vwc-button slot="navigationIcon" icon="vonage-mono" label="VONAGE" type="submit" unelevated=""></vwc-button>
	<div slot="actionItems">
		<vwc-icon-button icon="search-line"></vwc-icon-button>
		<vwc-icon-button icon="info-line"></vwc-icon-button>
		<vwc-icon-button icon="share-line"></vwc-icon-button>
	</div>
`;

const WithSideDrawerAndTopAppBarTemplate = args => html`
	${style}
	<vwc-top-app-bar alternate slot=" app-content">
		${topAppBarFixedContent}
		<vwc-side-drawer id="side-drawer" ...=${spread(args)}>
			${sideDrawerContent}
			<main slot="app-content">${content()}</main>
		</vwc-side-drawer>
	</vwc-top-app-bar>
`;

export const WithSideDrawerAndTopAppBar = WithSideDrawerAndTopAppBarTemplate.bind({});
WithSideDrawerAndTopAppBar.args = {};

const WithSideDrawerAndTopAppBarFixedTemplate = args => html`
	${style}
	<vwc-top-app-bar-fixed alternate slot=" app-content">
		${topAppBarFixedContent}
		<vwc-side-drawer id="side-drawer" ...=${spread(args)}>
			${sideDrawerContent}
			<main slot="app-content">${content()}</main>
		</vwc-side-drawer>
	</vwc-top-app-bar-fixed>
`;

export const WithSideDrawerAndTopAppBarFixed = WithSideDrawerAndTopAppBarFixedTemplate.bind({});
WithSideDrawerAndTopAppBarFixed.args = {};

