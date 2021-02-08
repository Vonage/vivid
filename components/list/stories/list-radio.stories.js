import '@vonage/vwc-list/vwc-list.js';
import '@vonage/vwc-list/vwc-radio-list-item.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types-list-item.js';

export default {
	title: 'Components/Atoms/List (radio list item)',
	component: 'vwc-radio-list-item',
	argTypes: {
		...argTypes,
		left: {
			control: {
				type: 'inline-radio',
				options: { 'true': '', 'false': undefined }
			}
		}
	}
};

export const radioList = args => html`
	<style>
		vwc-list {
			width: 240px;
		}
	</style>

	<vwc-list multi>
		<vwc-radio-list-item group="b" ...=${spread(args)}>Item 0</vwc-radio-list-item>
		<vwc-radio-list-item group="b" selected ...=${spread(args)}>Item 1</vwc-radio-list-item>
		<li divider role="separator" ...=${spread(args)}></li>
		<vwc-radio-list-item left group="c" selected ...=${spread(args)}>Item 2</vwc-radio-list-item>
		<vwc-radio-list-item left group="c" ...=${spread(args)}>Item 3</vwc-radio-list-item>
	</vwc-list>
`;
