import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-check-list-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Atoms/List (check list item)',
	component: 'vwc-check-list-item',
	decorators: [withA11y]
}

export const checklist = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<h3>List of check boxes</h3>
	<vwc-list multi>
		<vwc-check-list-item selected>Item 0</vwc-check-list-item>
		<vwc-check-list-item selected>Item 1</vwc-check-list-item>
		<li divider role="separator" padded></li>
		<vwc-check-list-item left selected>Item 2 (left)</vwc-check-list-item>
		<vwc-check-list-item left>Item 3 (left)</vwc-check-list-item>
	</vwc-list>
`;
