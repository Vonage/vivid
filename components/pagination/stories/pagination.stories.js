import '@vonage/vwc-pagination/vwc-pagination.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Composite/Pagination',
	component: 'vwc-pagination',
	argTypes
};

const TemplatePlain = args => html`<vwc-pagination ...=${spread(args)}></vwc-pagination>`;

export const Basic = TemplatePlain.bind({});
Basic.args = { total: 20 };