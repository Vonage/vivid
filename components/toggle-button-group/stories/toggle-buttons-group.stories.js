import '@vonage/vwc-toggle-buttons-group/vwc-toggle-button-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Toggle Buttons Group',
	component: 'vwc-toggle-button-group',
	argTypes
};

const Template = args => html`<vwc-toggle-button-group ...=${spread(args)}>
	<vwc-button label="Standard" layout="filled"></vwc-button>
	<vwc-button label="Hybrid" layout="filled"></vwc-button>
	<vwc-button label="Satellite" layout="filled"></vwc-button>
</vwc-toggle-button-group>`;

export const Basic = Template.bind({});
Basic.args = { };

const TemplateLabels = args => html`<vwc-toggle-button-group ...=${spread(args)}>
	<vwc-button label="Standard" layout="outlined"></vwc-button>
	<vwc-button label="Hybrid" layout="outlined"></vwc-button>
	<vwc-button label="Satellite" layout="outlined"></vwc-button>
</vwc-toggle-button-group>`;

export const Labeled = TemplateLabels.bind({});
Labeled.args = { };

const TemplateIcons = args => html`<vwc-toggle-button-group ...=${spread(args)}>
	<vwc-icon-button icon="bullet-list-line" layout="filled"></vwc-icon-button>
	<vwc-icon-button icon="list-numbered-line" layout="filled"></vwc-icon-button>
</vwc-toggle-button-group>`;

export const Iconed = TemplateIcons.bind({});
Iconed.args = { };
