import '@vonage/vwc-card/vwc-card.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Card',
	component: 'vwc-card',
	argTypes
};

const Template = args => html`
	<vwc-card ...=${spread(args)}>
	</vwc-card>`;

export const Basic = Template.bind({});
Basic.args = {
	label: 'Basic',
	heading: "Title",
	'supporting-text': 'Supporting Text'
};

export const Subtitle = Template.bind({});
Subtitle.args = {
	label: 'Subtitle',
	heading: "Title",
	subtitle: "Subtitle",
	'supporting-text': 'Supporting Text'
};

const IconTemplate = args => html`
	<vwc-card ...=${spread(args)}>
		<div>Using the icon attribute</div>
	</vwc-card>
	<vwc-card ...=${spread(args)}>
		<vwc-icon type="home" slot="header-icon"></vwc-icon>
		<div>Using a slotted icon</div>
	</vwc-card>`;
export const Icon = IconTemplate.bind({});
Icon.args = {
	label: 'Icon',
	heading: 'Icon Example',
	'header-icon': 'chat-line',
	subtitle: "Subtitle",
	'supporting-text': 'Supporting Text'
};


const MediaTemplate = args => html`
	<vwc-card ...=${spread(args)}>
		<img style="width: 100%;" alt="test" src="https://www.w3schools.com/tags/img_girl.jpg" slot="media"/>
		<div>Showing media using the 'media' slot.</div>
	</vwc-card>
`;
export const Media = MediaTemplate.bind({});
Media.args = {
	label: 'Media',
	heading: 'Media',
	'header-icon': 'home',
	subtitle: 'Subtitle',
	'supporting-text': 'Supporting Text'
};

const ActionsTemplate = args => html`
	<vwc-card ...=${spread(args)}>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
	</vwc-card>`;

export const Actions = ActionsTemplate.bind({});
Actions.args = {
	label: 'Actions',
	heading: 'Actions',
	'supporting-text': 'Use the \'actions\' slot in order to add actionable items.'
};

const AllTemplate = args => html`
	<vwc-card ...=${spread(args)}>
		<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
	</vwc-card>`;
export const AllOptions = AllTemplate.bind({});
AllOptions.args = {
	label: 'All Options',
	heading: 'All Options on Deck',
	'header-icon': 'chat-line',
	subtitle: 'Subtitle',
	'supporting-text': 'Use the \'actions\' slot in order to add actionable items.'
};
