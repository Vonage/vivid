import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-radio-list-item.js';
import { html } from 'lit-element';

export default {
	title: 'Atoms/List (radio list item)',
	component: 'vwc-radio-list-item'
}

export const radioList = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<h3>List of radios</h3>
	<vwc-list multi>
		<vwc-radio-list-item group="b">Item 0</vwc-radio-list-item>
		<vwc-radio-list-item group="b" selected>Item 1</vwc-radio-list-item>
		<li divider role="separator"></li>
		<vwc-radio-list-item group="c" selected>Item 2</vwc-radio-list-item>
		<vwc-radio-list-item group="c">Item 3</vwc-radio-list-item>
	</vwc-list>
`;
