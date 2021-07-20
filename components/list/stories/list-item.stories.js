import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list-item.js';

export default {
	title: 'Components/List/list item',
	component: 'vwc-list-item',
	argTypes
};

const Template = args => html`
	<style>
	vwc-list {
		width: 240px;
	}
	</style>

	<vwc-list>
		<vwc-list-item ...=${spread(args)}>
			Item A
			<span slot="secondary">Secondary line</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
			<vwc-icon slot="graphic" type="chat" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item ...=${spread(args)}>
			Item B
			<span slot="secondary">Secondary line</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
			<vwc-icon slot="graphic" type="chat" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item ...=${spread(args)} disabled>
			Item C
			<span slot="secondary">Secondary line</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
			<vwc-icon slot="graphic" type="chat" size="small"></vwc-icon>
		</vwc-list-item>
	</vwc-list>`;


export const Basic = Template.bind({});

export const Shape = Template.bind({});
Shape.args = { shape: 'rounded' };

export const Connotation = Template.bind({});
Connotation.args = {
	connotation: 'cta',
	activated: '',
	shape: 'rounded',
	graphic: 'icon'
};

export const TwoLine = Template.bind({});
TwoLine.args = { twoline: '', hasMeta: '' };

export const TwoLineIcon = Template.bind({});
TwoLineIcon.args = { twoline: '', graphic: 'icon' };

export const MetaIcon = Template.bind({});
MetaIcon.args = { hasMeta: '' };

export const Icon = Template.bind({});
Icon.args = { graphic: 'icon' };

const ActivatedTemplate = args => html`
	<style>
	vwc-list {
		width: 240px;
	}
	</style>

	<vwc-list>
		<vwc-list-item graphic="icon">
			Item A
			<vwc-icon slot="graphic" type="chat" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item ...=${spread(args)}>
			Item B
			<vwc-icon slot="graphic" type="chat" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item graphic="icon">
			Item C
			<vwc-icon slot="graphic" type="chat" size="small"></vwc-icon>
		</vwc-list-item>
	</vwc-list>`;


export const Activated = ActivatedTemplate.bind({});
Activated.args = { activated: '' };
