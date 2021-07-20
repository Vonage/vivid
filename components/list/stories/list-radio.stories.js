import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-radio-list-item.js';
import { html } from 'lit-element';

export default {
	title: 'Components/List/Radio List Item',
	component: 'vwc-radio-list-item'
};

export const RadioList = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-radio-list-item group="b">
			Item 0
		</vwc-radio-list-item>
		<vwc-radio-list-item group="b" selected>
			Item 1
		</vwc-radio-list-item>
		<li divider role="separator"></li>
		<vwc-radio-list-item left group="c" selected>
			Item 2
		</vwc-radio-list-item>
		<vwc-radio-list-item left group="c" disabled>
			Item 3
		</vwc-radio-list-item>
	</vwc-list>
`;

export const RadioListTwoLines = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-radio-list-item twoline group="b">
			Item 0
			<span slot="secondary">Additional info</span>
		</vwc-radio-list-item>
		<vwc-radio-list-item twoline group="b" selected>
			Item 1
			<span slot="secondary">Additional info</span>
		</vwc-radio-list-item>
		<li divider role="separator"></li>
		<vwc-radio-list-item left twoline group="c" selected>
			Item 2
			<span slot="secondary">Additional info</span>
		</vwc-radio-list-item>
		<vwc-radio-list-item left twoline group="c" disabled>
			Item 3
			<span slot="secondary">Additional info</span>
		</vwc-radio-list-item>
	</vwc-list>
`;
