import '@vonage/vwc-inline';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Inline',
	component: 'vwc-inline',
	argTypes
}

const Template = args => html`
<style>
	.child {
		padding:20px;
		background-color: var(--connotation);
		color: var(--on-connotation);
	}
	.child:nth-child(odd) {
		--connotation: var(--vvd-color-primary);
		--on-connotation: var(--vvd-color-on-primary);
	}
	.child:nth-child(even){
		--connotation: var(--vvd-color-cta);
		--on-connotation: var(--vvd-color-on-cta);
	}
</style>

<vwc-inline ...=${spread(args)}>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
	<div class="child">lorem ipsum dolor sit amet, consectetur adipiscing</div>
</vwc-inline>`;

export const Basic = Template.bind({});
Basic.args = {  };
