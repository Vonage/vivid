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
		<div>Default Content</div>
	</vwc-card>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic' };

export const Heading = Template.bind({});
Heading.args = {
	label: 'Heading',
	heading: 'Card title'
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
	'header-icon': 'chat-line'
};

export const Badge = Template.bind({});
Badge.args = {
	label: 'Badge',
	heading: 'Badge Example',
	'badge-content': 'New'
};

const MediaTemplate = args => html`
	<vwc-card ...=${spread(args)}>
		<img alt="test" src="https://www.w3schools.com/tags/img_girl.jpg" slot="media"/>
		<div>Showing media using the 'media' slot.</div>
	</vwc-card>
`;
export const Media = MediaTemplate.bind({});
Media.args = {
	label: 'Media',
	heading: 'Media',
	'header-icon': 'home',
	'badge-content': 'New'
};

const ActionsTemplate = args => html`
	<vwc-card ...=${spread(args)}>
		<div>Use the 'actions' slot in order to add actionable items.</div>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
	</vwc-card>`;

export const Actions = ActionsTemplate.bind({});
Actions.args = {
	label: 'Actions',
	heading: 'Actions'
};


export const Large = ActionsTemplate.bind({});
Large.args = {
	label: 'Large',
	heading: 'Large card title',
	'header-icon': 'chat-line',
	'badge-content': 'New',
	layout: 'large'
};
