import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-check-list-item.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list-item.js';

export default {
	title: 'Components/Atoms/List (check list item)',
	component: 'vwc-check-list-item',
	argTypes: {
		...argTypes,
		left: {
			control: {
				type: 'inline-radio',
				options: { 'true': '', 'false': undefined }
			}
		}
	}
}

const Template = args => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-check-list-item ...=${spread(args)}>Item 0</vwc-check-list-item>
		<vwc-check-list-item ...=${spread(args)}>Item 1</vwc-check-list-item>
		<li divider role="separator" padded></li>
		<vwc-check-list-item left ...=${spread(args)}>Item 2 (left)</vwc-check-list-item>
		<vwc-check-list-item left ...=${spread(args)}>Item 3 (left)</vwc-check-list-item>
	</vwc-list>`;

export const Checklist = Template.bind({});
Checklist.args = { selected: '', left: '' }

export const CheckListSelected = args => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-check-list-item selected ...=${spread(args)}>Item 0</vwc-check-list-item>
		<vwc-check-list-item selected ...=${spread(args)}>Item 1</vwc-check-list-item>
		<li divider role="separator" padded></li>
		<vwc-check-list-item left selected ...=${spread(args)}>Item 2 (left)</vwc-check-list-item>
		<vwc-check-list-item left ...=${spread(args)}>Item 3 (left)</vwc-check-list-item>
	</vwc-list>
`;
