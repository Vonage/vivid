import '@vonage/vwc-pagination/vwc-pagination.js';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Pagination',
	component: 'vwc-pagination',
	argTypes
};

const TemplatePlain = args => html`<vwc-pagination ...=${spread(args)}></vwc-pagination>`;

export const Basic = TemplatePlain.bind({});
Basic.args = { total: 20 };

const TemplateSlotted = args => html`
<style>
	.page-control {
		padding: 4px;
	}
  .page-control:hover {
		background-color: var(--vvd-color-neutral-20);
	}
	[prev-disabled] .prev,
	[next-disabled] .next {
		color: var(--vvd-color-neutral-50);
		pointer-events: none;
	}
</style>
<vwc-pagination ...=${spread(args)}>
	<span class="page-control prev" slot="prev-control">Previous</span>
	<span class="page-control next" slot="next-control">Next</span>
</vwc-pagination>`;

export const PrevNextSimpleText = TemplateSlotted.bind({});
PrevNextSimpleText.args = { total: 20 };

const TemplateSlottedLinks = args => html`
<style>
  a.page-control {
		text-decoration: initial;
	}
	[prev-disabled] .prev,
	[next-disabled] .next {
		color: var(--vvd-color-neutral-50);
		pointer-events: none;
	}
</style>
<vwc-pagination ...=${spread(args)}>
  <a class="page-control prev" slot="prev-control">Previous</a>
	<a class="page-control next" slot="next-control">Next</a>
</vwc-pagination>`;

export const PrevNextAsLinks = TemplateSlottedLinks.bind({});
PrevNextAsLinks.args = { total: 20 };
