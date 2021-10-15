import '@vonage/vwc-side-drawer';
import '@vonage/vwc-top-app-bar';
import '@vonage/vwc-top-app-bar-fixed';
import '@vonage/vwc-icon';
import '@vonage/vwc-layout';

import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';

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

const loremIpsum = () => html`
<vwc-layout gutters="xs">
	<p>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
		standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
		a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
		remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
		Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
		of Lorem Ipsum.
	</p>
</vwc-layout>
`;

const content = () => Array(8).fill().map(loremIpsum);

const style = html`
	<style>
		.sb-show-main.sb-main-padded {
			padding: 0;
		}
	</style>
`;

const topAppBarContent = html`
	<vwc-theme-switch slot="actionItems"></vwc-theme-switch>
	<span slot="title">Main top bar</span>
	<main>
		${content()}
	</main>
`;

const WithAppContentTemplate = args => html`
	${style}
	<vwc-side-drawer alternate hastopbar ...=${spread(args)}>
		<span slot="top-bar">Side drawer top bar</span>
		Should top bar font face differ from body?
		${content()}
	
		<main slot="app-content">
			${content()}
		</main>
	</vwc-side-drawer>
`;

export const WithAppContent = WithAppContentTemplate.bind({});
WithAppContent.args = {};

const WithTopAppBarTemplate = args => html`
	${style}
	<vwc-side-drawer alternate hastopbar ...=${spread(args)}>
		<span slot="top-bar">Side drawer top bar</span>
		Should top bar font face differ from body?
		${content()}
	
		<vwc-top-app-bar slot="app-content">
			${topAppBarContent}
		</vwc-top-app-bar>
	</vwc-side-drawer>
`;

export const WithTopAppBar = WithTopAppBarTemplate.bind({});
WithTopAppBar.args = {};

const Masthead = () => html`
	<vwc-icon type="vonage-solid"></vwc-icon>
	App Title
`;

const WithTopAppBarFixedTemplate = args => html`
	${style}
	<vwc-side-drawer alternate hastopbar ...=${spread(args)}>
		<span slot="top-bar">${Masthead()}</span>
		Should top bar font face differ from body?
		${content()}
	
		<vwc-top-app-bar-fixed alternate slot="app-content">
			${topAppBarContent}
		</vwc-top-app-bar-fixed>
	</vwc-side-drawer>
`;

export const WithTopAppBarFixed = WithTopAppBarFixedTemplate.bind({});
WithTopAppBarFixed.args = {};
