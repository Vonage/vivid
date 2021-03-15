import '@vonage/vwc-top-app-bar';
import '@vonage/vwc-icon-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Top App Bar',
	component: 'vwc-top-app-bar',
	argTypes
}

const Template = (args) => html`
	<vwc-top-app-bar ...=${spread(args)}>
		<vwc-icon-button slot="navigationIcon" icon="menu-line" layout="filled"></vwc-icon-button>
		<span slot="title">Top App Bar</span>
		<vwc-icon-button slot="actionItems" icon="twitter-mono" layout="filled"></vwc-icon-button>
		<vwc-icon-button slot="actionItems" icon="facebook-mono" layout="filled"></vwc-icon-button>
		<vwc-icon-button slot="actionItems" icon="heart-solid" layout="filled"></vwc-icon-button>
	</vwc-top-app-bar>
`;

export const Default = Template.bind({});

export const Dense = Template.bind({});
Dense.args = { dense: '' };
