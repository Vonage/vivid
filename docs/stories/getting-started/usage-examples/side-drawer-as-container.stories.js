import '@vonage/vwc-side-drawer';
import '@vonage/vwc-top-app-bar';
import '@vonage/vwc-top-app-bar-fixed';
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

const loremIpsum = () => html`
	<p>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
	</p>
`;

const content = () => Array(8).fill().map(loremIpsum);

const topAppBarContent = html`
	<vwc-theme-switch slot="actionItems"></vwc-theme-switch>
	<span slot="title">Main top bar</span>
	<main>
		${content()}
	</main>
`;

const WithTopAppBarTemplate = args => html`
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
WithTopAppBar.args = { };

const WithTopAppBarFixedTemplate = args => html`
	<vwc-side-drawer alternate hastopbar ...=${spread(args)}>
			<span slot="top-bar">Side drawer top bar</span>
			Should top bar font face differ from body?
			${content()}

			<vwc-top-app-bar-fixed slot="app-content">
				${topAppBarContent}
			</vwc-top-app-bar-fixed>
		</vwc-side-drawer>
`;

export const WithTopAppBarFixed = WithTopAppBarFixedTemplate.bind({});
WithTopAppBarFixed.args = { };
