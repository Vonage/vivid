import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-list/vwc-check-list-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';
import '@vonage/vwc-icon/vwc-icon.js';

export default {
	title: 'Atoms|List',
	component: 'vwc-list',
	decorators: [withA11y]
}

export const basic = () => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<h3>Simple list</h3>
	<vwc-list>
		<vwc-list-item>Item 0</vwc-list-item>
		<vwc-list-item>Item 1</vwc-list-item>
		<vwc-list-item>Item 2</vwc-list-item>
		<vwc-list-item>Item 3</vwc-list-item>
	</vwc-list>
`;

export const metaIcon = () => html`
	<style>
		vwc-list {
			width: 240px;

		}
	</style>

	<h3>List with meta data (icon)</h3>
	<vwc-list>
		<vwc-list-item hasMeta>
			<span>Item A</span>
			<vwc-icon slot="meta" class="material-icons">info</vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item B</span>
			<vwc-icon slot="meta" class="material-icons">info</vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item C</span>
			<vwc-icon slot="meta" class="material-icons">info</vwc-icon>
		</vwc-list-item>
		<vwc-list-item hasMeta>
			<span>Item D</span>
			<vwc-icon slot="meta" class="material-icons">info</vwc-icon>
		</vwc-list-item>
	</vwc-list>
`;

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