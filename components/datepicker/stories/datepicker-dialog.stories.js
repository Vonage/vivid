import '@vonage/vwc-datepicker';
import '@vonage/vwc-dialog';
import '@vonage/vwc-button';
import '@vonage/vwc-textfield';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const DialogTemplate = args => html`
  <style>
    vwc-datepicker { display: flex; }
    vwc-textfield { width: 100%; }
  </style>

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
Dialog.args = { dateFormat: 'Y-m-d', altInput: '', altFormat: 'F j, Y', closeOnSelect: '' };

function handleOpenDialogClick(e) {
  e.target.parentNode.querySelector('#dialog-a').show();
}
