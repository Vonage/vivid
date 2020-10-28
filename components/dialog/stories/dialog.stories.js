import '@vonage/vwc-dialog/vwc-dialog.js';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Cells/Dialog',
	component: 'vwc-dialog',
	argTypes
};

const Template = args => html`
	<vwc-button @click="${handleOpenDialogClick}">Open dialog</vwc-button>
	<vwc-dialog ...=${spread(args)}>
		<div>Discard draft?</div>
		<mwc-button
				slot="primaryAction"
				dialogAction="discard">
			Discard
		</mwc-button>
		<mwc-button
				slot="secondaryAction"
				dialogAction="cancel">
			Cancel
		</mwc-button>
	</vwc-dialog>
`;

export const Basic = Template.bind({});
Basic.args = { id: 'dialog-a' };

function handleOpenDialogClick(e) {
	e.target.parentNode.querySelector('#dialog-a').show();
}