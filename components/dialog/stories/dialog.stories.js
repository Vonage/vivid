import '@vonage/vwc-dialog/vwc-dialog.js';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Atoms/Dialog',
	component: 'vwc-dialog',
	argTypes
};

const Template = args => html`
	<vwc-button @click="${handleOpenDialogClick}">Open dialog</vwc-button>
	<vwc-dialog ...=${spread(args)}>
		<div>This is the modal's content.</div>
		<vwc-button
			slot="primaryAction"
			dialogAction="discard">
			Discard
		</vwc-button>
		<vwc-button
			slot="secondaryAction"
			dialogAction="cancel">
			Cancel
		</vwc-button>
	</vwc-dialog>
`;

const IconTemplate = args => html`
	<vwc-button @click="${handleOpenDialogClick}">Open dialog</vwc-button>
	<vwc-dialog id="dialog-a" ...=${spread(args)}>
		<div>This is the modal's content.</div>
		<vwc-icon slot="icon" size="large" type="home"></vwc-icon>
		<vwc-button
			slot="primaryAction"
			dialogAction="discard">
			Discard
		</vwc-button>
		<vwc-button
			slot="secondaryAction"
			dialogAction="cancel">
			Cancel
		</vwc-button>
	</vwc-dialog>
`;

export const Basic = Template.bind({});
Basic.args = { };

export const Heading = Template.bind({});
Heading.args = { heading: 'Hello Modal!'};

export const Icon = IconTemplate.bind({});
Icon.args = { heading: 'Homey feeling'};

export const Stacked = Template.bind({});
Stacked.args = { stacked: ''};

export const Modal = Template.bind({});
Modal.args = { heading: 'This is a modal window', scrimClickAction: ''};

function handleOpenDialogClick(e) {
	e.target.parentNode.querySelector('#dialog-a').show();
}
