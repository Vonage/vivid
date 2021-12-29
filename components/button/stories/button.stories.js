import '@vonage/vwc-button/vwc-button.js';
import '@vonage/vwc-circular-progress';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Button',
	component: 'vwc-button',
	argTypes
};

const Template = args => html`<vwc-button ...=${spread(args)}>`;

export const Basic = Template.bind({});
Basic.args = { label: 'Basic', layout: 'text' };

export const Filled = Template.bind({});
Filled.args = { label: 'Filled', layout: 'filled' };

export const Outlined = Template.bind({});
Outlined.args = { label: 'Outlined', layout: 'outlined' };

export const PillShape = Template.bind({});
PillShape.args = { label: 'Filled', layout: 'filled', shape: 'pill' };

export const Dense = Template.bind({});
Dense.args = { label: 'Dense', layout: 'filled', dense: '' };

export const Enlarged = Template.bind({});
Enlarged.args = { label: 'Enlarged', layout: 'filled', enlarged: '' };

export const Icon = Template.bind({});
Icon.args = { label: 'Icon', layout: 'filled', icon: 'download' };

export const Stacked = Template.bind({});
Stacked.args = { label: 'Action', layout: 'filled', icon: 'compose-line', stacked: '' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled', layout: 'filled', disabled: '' };

const TemplateState = args => html`<vwc-button ...=${spread(args)}>
	<vwc-circular-progress
	slot="trailingIcon"
	indeterminate
	density="-7.5"
	></vwc-circular-progress>
</vwc-button>`;

export const Pending = TemplateState.bind({});
Pending.args = { label: 'Pending', layout: 'filled', disabled: '' };

const TemplateSizes = args => html`
	<style>
		.wrapper {
			display: grid;
			grid-template-columns: repeat(2, 100px);
			gap: 2rem;
			justify-items: center;
		}
	</style>
	<div class="wrapper">
		<vwc-button label="Button" layout="filled" dense ...=${spread(args)}></vwc-button>
		<vwc-button label="Button" layout="filled" icon="calendar-line" dense ...=${spread(args)}></vwc-button>
		<vwc-button label="Button" layout="filled" ...=${spread(args)}></vwc-button>
		<vwc-button label="Button" layout="filled" icon="calendar-line" ...=${spread(args)}></vwc-button>
		<vwc-button label="Button" layout="filled" enlarged ...=${spread(args)}></vwc-button>
		<vwc-button label="Button" layout="filled" icon="calendar-line" enlarged ...=${spread(args)}></vwc-button>
	</div>
	<vwc-button >
</vwc-button>`;

export const MixesSizes = TemplateSizes.bind({});
