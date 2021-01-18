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

export const Basic = Template.bind({});
Basic.args = { id: 'dialog-a' };

export const Heading = Template.bind({});
Heading.args = { id: 'dialog-a', heading: 'Hello Modal!'};

export const Stacked = Template.bind({});
Stacked.args = { id: 'dialog-a', stacked: ''};

function handleOpenDialogClick(e) {
	e.target.parentNode.querySelector('#dialog-a').show();
}
