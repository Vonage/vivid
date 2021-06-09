import '@vonage/vwc-button-toggle-group/vwc-button-toggle-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Button Toggle Group',
	component: 'vwc-button-toggle-group',
	argTypes
};

const Template = args => html`<vwc-button-toggle-group ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>`;

export const Basic = Template.bind({});
Basic.args = { };

const TemplatePilled = args => html`<vwc-button-toggle-group shape="pill" ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>`;

export const PillShape = TemplatePilled.bind({});
PillShape.args = { };

const TemplateIcons = args => html`<vwc-button-toggle-group ...=${spread(args)}>
	<vwc-icon-button icon="bullet-list-line"></vwc-icon-button>
	<vwc-icon-button icon="list-numbered-line"></vwc-icon-button>
</vwc-button-toggle-group>`;

export const Iconed = TemplateIcons.bind({});
Iconed.args = { };

const AccentTemplate = args => html`<vwc-button-toggle-group accent ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>`;

export const Accent = AccentTemplate.bind({});
Accent.args = { };

const DisabledTemplate = args => html`<vwc-button-toggle-group accent disabled ...=${spread(args)}>
	<vwc-button selected label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
	<vwc-icon-button selected icon="home"></vwc-icon-button>
</vwc-button-toggle-group>`;

export const Disabled = DisabledTemplate.bind({});
Accent.args = { };

const MultiTemplate = args => html`<vwc-button-toggle-group multi>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>`;

export const Multi = MultiTemplate.bind({});
Multi.args = { };

const MandatoryTemplate = args => html`<vwc-button-toggle-group required multi>
	<vwc-button label="Standard" selected value="1"></vwc-button>
	<vwc-button label="Hybrid" value="2"></vwc-button>
	<vwc-icon-button icon="home" value="3"></vwc-icon-button>
	<vwc-button label="Satellite" value="4"></vwc-button>
</vwc-button-toggle-group>`;

export const Mandatory = MandatoryTemplate.bind({});
Mandatory.args = { };

const SizesTemplate = args => html`
	<h5>Dense</h5>
	<div style="float: left;"><label>Standard</label>
	<vwc-button-toggle-group dense shape="pill">
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>
	</div>
	<br style="clear: both;"/>
		<div style="float: left;"><label>Accent</label>
	<vwc-button-toggle-group accent dense>
		<vwc-button label="Standard"></vwc-button>
		<vwc-button label="Hybrid"></vwc-button>
		<vwc-icon-button icon="home"></vwc-icon-button>
		<vwc-button label="Satellite"></vwc-button>
	</vwc-button-toggle-group>
		</div>
	<br style="clear: both;"/>
<h5>Normal</h5>
	<div style="float: left;"><label>Standard</label>
<vwc-button-toggle-group shape="pill">
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>
	</div>
	<br style="clear: both;"/>
	<div style="float: left;"><label>Accent</label>
	<vwc-button-toggle-group accent>
		<vwc-button label="Standard"></vwc-button>
		<vwc-button label="Hybrid"></vwc-button>
		<vwc-icon-button icon="home"></vwc-icon-button>
		<vwc-button label="Satellite"></vwc-button>
	</vwc-button-toggle-group>
	</div>
	<br style="clear: both;"/>
<h5>Enlarged</h5>
	<div style="float: left;"><label>Standard</label>
<vwc-button-toggle-group enlarged shape="pill">
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>
	</div>
	<br style="clear: both;"/>
	<div style="float: left;"><label>Accent</label>
	<vwc-button-toggle-group accent enlarged>
		<vwc-button label="Standard"></vwc-button>
		<vwc-button label="Hybrid"></vwc-button>
		<vwc-icon-button icon="home"></vwc-icon-button>
		<vwc-button label="Satellite"></vwc-button>
	</vwc-button-toggle-group>
	</div>
	<br style="clear: both;"/>
`;

export const Sizes = SizesTemplate.bind({});
Sizes.args = { };
