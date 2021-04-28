import '@vonage/vwc-toggle-buttons-group/vwc-toggle-button-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Toggle Buttons Group',
	component: 'vwc-toggle-button-group',
	argTypes
};

const Template = args => html`<vwc-toggle-button-group ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>`;

export const Basic = Template.bind({});
Basic.args = { };

const TemplatePilled = args => html`<vwc-toggle-button-group shape="pill" ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>`;

export const PillShape = TemplatePilled.bind({});
PillShape.args = { };

const TemplateIcons = args => html`<vwc-toggle-button-group ...=${spread(args)}>
	<vwc-icon-button icon="bullet-list-line"></vwc-icon-button>
	<vwc-icon-button icon="list-numbered-line"></vwc-icon-button>
</vwc-toggle-button-group>`;

export const Iconed = TemplateIcons.bind({});
Iconed.args = { };

const AccentTemplate = args => html`<vwc-toggle-button-group accent ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>`;

export const Accent = AccentTemplate.bind({});
Accent.args = { };

const MultiTemplate = args => html`<vwc-toggle-button-group multi
																														...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>`;

export const Multi = MultiTemplate.bind({});
Multi.args = { };

const SizesTemplate = args => html`
	<h5>Dense</h5>
	<vwc-toggle-button-group dense
																														...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>
<h5>Normal</h5>
<vwc-toggle-button-group
												 ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>
<h5>Enlarged</h5>
<vwc-toggle-button-group enlarged
												 ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-toggle-button-group>
`;

export const Sizes = SizesTemplate.bind({});
Multi.args = { };
