import '@vonage/vwc-expansion-panel/vwc-expansion-panel.js';
import '@vonage/vwc-textfield/vwc-textfield.js';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Accordion/Accordion Item',
	component: 'vwc-accordion-item',
	argTypes
};

const Template = args => html`
  <style>
		vwc-expansion-panel {
			width: 500px;
		}
    form {
      display: grid;
      gap: 20px;
    }
  </style>
  <vwc-expansion-panel ...=${spread(args)}>
  <form>
      A campaign describes a specific use case and details of the messages you will be sending through it.
      Such as: sample messages, subscriber opt-in/out, and the associated numbers you will be sending with these messages.

      <vwc-textfield label="Selected Brand" value="Vonage Inc." dense readonly></vwc-textfield>
      <vwc-textfield label="Description" dense></vwc-textfield>
    </form>
  </vwc-expansion-panel>
`;

export const Basic = Template.bind({});
Basic.args = { header: 'Campaign Details' };

const OutlinedTemplate = args => html`
	<style>
		vwc-expansion-panel {
			width: 500px;
			display: block;
			padding: 0.5rem;
			border-radius: 6px;
		}
		form {
			display: grid;
			gap: 20px;
		}
	</style>
	<div>
	<p>expansion panel inside elevation component</p>
	<vwc-elevation dp="0">
		<vwc-expansion-panel header="Item 1">
			<form>
				A campaign describes a specific use case and details of the messages you will be sending through it.
				Such as: sample messages, subscriber opt-in/out, and the associated numbers you will be sending with these messages.

				<vwc-textfield label="Selected Brand" value="Vonage Inc." dense readonly></vwc-textfield>
				<vwc-textfield label="Description" dense></vwc-textfield>
			</form>
		</vwc-expansion-panel>
	</vwc-elevation>
</div>`;

export const Outlined = OutlinedTemplate.bind({});
Outlined.args = { header: 'Campaign Details' };

export const IndicatorIconSet = Template.bind({});
IndicatorIconSet.args = { header: 'Campaign Details', indicatorIconSet: 'binary' };

export const Dense = Template.bind({});
Dense.args = { header: 'Campaign Details', dense: '' };

export const LeadingToggle = Template.bind({});
LeadingToggle.args = { header: 'Campaign Details', leadingToggle: '' };

export const Meta = Template.bind({});
Meta.args = { header: 'Campaign Details', meta: 'meta-data', icon: "chat-solid" };

export const Icon = Template.bind({});
Icon.args = { header: 'Campaign Details', icon: 'chat-solid' };

const SlottedIconsTemplate = args => html`
	<style>
		vwc-expansion-panel {
			width: 500px;
		}
		vwc-icon {
			--icon-size: 20px;
		}
	</style>
  <vwc-expansion-panel ...=${spread(args)}>
		<vwc-icon type="thumbs-up-line" slot="icon" size="small" connotation="cta"></vwc-icon>
		<vwc-icon type="thumbs-down-line" slot="trailingIcon" connotation="info"></vwc-icon>
		A campaign describes a specific use case and details of the messages you will be sending through it.
		Such as: sample messages, subscriber opt-in/out, and the associated numbers you will be sending with these messages.
  </vwc-expansion-panel>
`;

export const SlottedIcons = SlottedIconsTemplate.bind({});
SlottedIcons.args = { header: 'Campaign Details' };
