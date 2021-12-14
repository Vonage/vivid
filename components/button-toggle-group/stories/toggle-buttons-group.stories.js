import '@vonage/vwc-button-toggle-group/vwc-button-toggle-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Button Toggle Group',
	component: 'vwc-button-toggle-group',
	argTypes
};

const Template = args => html`
	<h3 style="margin-top: 0">Basic</h3>
	<p><code>accent</code> is deprecated. <code>accent</code> has the basic style</p>
	<vwc-button-toggle-group ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>`;

export const Basic = Template.bind({});
Basic.args = { };

const TemplatePilled = args => html`
	<h3 style="margin-top: 0">Pill Shape</h3>
	<vwc-button-toggle-group  ...=${spread(args)}>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
</vwc-button-toggle-group>`;

export const PillShape = TemplatePilled.bind({});
PillShape.args = {shape: 'pill' };

const TemplateIcons = args => html`
	<h3 style="margin-top: 0">Iconed</h3>
	<div style="display: flex;">
		<div style="margin-right: 1rem">
			<vwc-button-toggle-group ...=${spread(args)}>
				<vwc-icon-button icon="bullet-list-line"></vwc-icon-button>
				<vwc-icon-button icon="list-numbered-line"></vwc-icon-button>
			</vwc-button-toggle-group>
		</div>
		<vwc-button-toggle-group ...=${spread(args)} shape="pill">
			<vwc-icon-button icon="bullet-list-line"></vwc-icon-button>
			<vwc-icon-button icon="list-numbered-line"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	`;

export const Iconed = TemplateIcons.bind({});
Iconed.args = { };

const DisabledTemplate = args => html`
	<h3 style="margin-top: 0">Disabled</h3>
	<vwc-button-toggle-group accent disabled ...=${spread(args)}>
	<vwc-button selected label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-button label="Satellite"></vwc-button>
	<vwc-icon-button selected icon="home"></vwc-icon-button>
</vwc-button-toggle-group>`;

export const Disabled = DisabledTemplate.bind({});
Disabled.args = { };

const MultiTemplate = args => html`
	<h3 style="margin-top: 0">Multi</h3>
	<p>multiple button can be selected</p>
	<vwc-button-toggle-group multi>
	<vwc-button label="Standard"></vwc-button>
	<vwc-button label="Hybrid"></vwc-button>
	<vwc-icon-button icon="home" selected></vwc-icon-button>
	<vwc-button label="Satellite" selected></vwc-button>
</vwc-button-toggle-group>`;

export const Multi = MultiTemplate.bind({});
Multi.args = { };

const MandatoryTemplate = args => html`
	<h3 style="margin-top: 0">Mandatory</h3>
	<p>one button always selected</p>
	<vwc-button-toggle-group required multi>
	<vwc-button label="Standard" selected value="1"></vwc-button>
	<vwc-button label="Hybrid" value="2"></vwc-button>
	<vwc-icon-button icon="home" value="3"></vwc-icon-button>
	<vwc-button label="Satellite" value="4"></vwc-button>
</vwc-button-toggle-group>`;

export const Mandatory = MandatoryTemplate.bind({});
Mandatory.args = { };

const SizesTemplate = args => html`
	<style>
		.grid-wrapper{
			display: grid;
			grid-template-columns: 70px repeat(2 , 380px 200px);
			gap: 1rem;
			align-items: center;
		}
	</style>
	<h3 style="margin-top: 0">Sizes</h3>
	<div class="grid-wrapper">
		<p style="margin: 0">Dense</p>
		<vwc-button-toggle-group dense>
			<vwc-icon-button icon="home" selected=""></vwc-icon-button>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group dense >
			<vwc-icon-button icon="video-solid" selected=""></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group dense shape="pill">
			<vwc-icon-button icon="home" selected=""></vwc-icon-button>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group dense shape="pill">
			<vwc-icon-button icon="video-solid" selected=""></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
		<p style="margin: 0">Normal</p>
		<vwc-button-toggle-group>
			<vwc-icon-button icon="home" selected=""></vwc-icon-button>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group>
			<vwc-icon-button icon="video-solid" selected=""></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group shape="pill">
			<vwc-icon-button icon="home" selected=""></vwc-icon-button>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group shape="pill">
			<vwc-icon-button icon="video-solid" selected=""></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
		<p style="margin: 0">Enlarged</p>
		<vwc-button-toggle-group enlarged>
			<vwc-icon-button icon="home" selected=""></vwc-icon-button>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group enlarged>
			<vwc-icon-button icon="video-solid" selected=""></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group enlarged shape="pill">
			<vwc-icon-button icon="home" selected=""></vwc-icon-button>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
		<vwc-button-toggle-group enlarged shape="pill">
			<vwc-icon-button icon="video-solid" selected=""></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
`;

export const Sizes = SizesTemplate.bind({});
Sizes.args = { };
