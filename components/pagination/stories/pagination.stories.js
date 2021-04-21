import '@vonage/vwc-pagination/vwc-pagination.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Pagination',
	component: 'vwc-pagination',
	argTypes
};

const TemplatePlain = args => html`<vwc-pagination ...=${spread(args)}></vwc-pagination>`;

export const Basic = TemplatePlain.bind({});
Basic.args = { total: 20 };

const TemplateSlotted = args => html`<vwc-pagination ...=${spread(args)}>
	<span slot="prev-control">Previous</span>
	<span slot="next-control">Next</span>
</vwc-pagination>`;

export const CustomPrevNext = TemplateSlotted.bind({});
CustomPrevNext.args = { total: 20 };

const TemplateSlottedLinks = args => html`
<style>
  a.page-control {
		text-decoration: initial;
	}
	::part(control):hover {
		background-color: initial;
	}
</style>
<vwc-pagination ...=${spread(args)}>
  <a class="page-control" slot="prev-control">Previous</a>
	<a class="page-control" slot="next-control">Next</a>
</vwc-pagination>`;

export const PrevNextAsLinks = TemplateSlottedLinks.bind({});
PrevNextAsLinks.args = { total: 20 };