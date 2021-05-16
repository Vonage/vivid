import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-check-list-item.js';
import { html } from 'lit-element';

export default {
	title: 'Components/List (check list item)',
	component: 'vwc-check-list-item'
}

export const CheckList = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-check-list-item selected>Item 0</vwc-check-list-item>
		<vwc-check-list-item>Item 1</vwc-check-list-item>
		<li divider role="separator" padded></li>
		<vwc-check-list-item left selected>Item 2 (left)</vwc-check-list-item>
		<vwc-check-list-item left>Item 3 (left)</vwc-check-list-item>
	</vwc-list>`;

export const CheckListTwoLines = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-check-list-item selected twoline>
			Item 0
			<span slot="secondary">Additional info</span>
		</vwc-check-list-item>
		<vwc-check-list-item twoline>
			Item 1
			<span slot="secondary">Additional info</span>
		</vwc-check-list-item>
		<li divider role="separator" padded></li>
		<vwc-check-list-item left selected twoline>
			Item 2 (left)
			<span slot="secondary">Additional info</span>
		</vwc-check-list-item>
		<vwc-check-list-item left twoline>
			Item 3 (left)
			<span slot="secondary">Additional info</span>
		</vwc-check-list-item>
	</vwc-list>`;
