import '@vonage/vwc-datepicker';
import '@vonage/vwc-dialog';
import '@vonage/vwc-button';
import '@vonage/vwc-textfield';
import '@vonage/vwc-banner';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';

const DialogTemplate = args => html`
  <style>
    html, body {
      height: 100%;
    }
		vwc-note {
			margin-bottom: 1rem;
		}
    vwc-datepicker { display: flex; }
    vwc-textfield { width: 100%; }
  </style>

	<vwc-note header="This component is being deprecated!" open icon="warning-solid" connotation="warning">
		We're working on a newer and better solution. Sorry for the inconvenience.
	</vwc-note>
  <vwc-button @click="${handleOpenDialogClick}">Open dialog</vwc-button>
  <vwc-dialog id="dialog-a" scrimClickAction="">
    <div>
      <vwc-datepicker ...=${spread(args)}>
        <vwc-textfield dense icon='calendar' placeholder='Datepicker'></vwc-textfield>
      </vwc-datepicker>
    </div>
    <vwc-button
    slot="secondaryAction"
    dialogAction="cancel">
    Cancel
    </vwc-button>
    <vwc-button
      connotation="cta"
      layout="filled"
      slot="primaryAction"
      dialogAction="ok">
      OK
    </vwc-button>
  </vwc-dialog>
`;

export const Dialog = DialogTemplate.bind({});
Dialog.args = {
	fixedMenuPosition: '', dateFormat: 'Y-m-d', altInput: '', altFormat: 'F j, Y', closeOnSelect: ''
};

function handleOpenDialogClick(e) {
	e.target.parentNode.querySelector('#dialog-a').show();
}
