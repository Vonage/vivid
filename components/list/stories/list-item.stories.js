import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list-item.js';

export default {
	title: 'Components/Atoms/List (list item)',
	component: 'vwc-list-item',
	argTypes
}

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
		</vwc-list-item>
		<vwc-list-item ...=${spread(args)}>
			Item B
			<span slot="secondary">Secondary line</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
		</vwc-list-item>
		<vwc-list-item ...=${spread(args)}>
			Item C
			<span slot="secondary">Secondary line</span>
			<vwc-icon slot="meta" type="info" size="small"></vwc-icon>
		</vwc-list-item>
	</vwc-list>`;

export const TwoLine = Template.bind({});
TwoLine.args = { twoline: '', hasMeta: '' }
