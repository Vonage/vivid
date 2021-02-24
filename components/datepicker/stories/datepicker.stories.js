import '@vonage/vwc-datepicker/vwc-datepicker.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Components/Composite/Datepicker',
  component: 'vwc-datepicker',
  argTypes
};

// outer div required for inline mode
const Template = args => html`
  <style>
    vwc-textfield { width: 260px; }
  </style>
  <div>
    <vwc-datepicker ...=${spread(args)}>
      <vwc-textfield dense icon='calendar' placeholder='Datepicker'></vwc-textfield>
    </vwc-datepicker>
  </div>`;

export const Basic = Template.bind({});
Basic.args = { dateFormat: 'Y-m-d', altInput: '', altFormat: 'F j, Y', closeOnSelect: '' };

export const MaxDate = Template.bind({});
MaxDate.args = { dateFormat: 'Y-m-d', MaxDate: 'today', closeOnSelect: '' };

// export const WeekPicker = Template.bind({});
// WeekPicker.args = { weekSelect: '' };

export const MonthPicker = Template.bind({});
MonthPicker.args = { dateFormat: 'F Y', monthPicker: '', closeOnSelect: '' };

export const Range = Template.bind({});
Range.args = { mode: 'range' };

export const DateTime = Template.bind({});
DateTime.args = { enableTime: '', dateFormat: 'Y-m-d H:i' };

export const Time = Template.bind({});
Time.args = { enableTime: '', noCalendar: '', dateFormat: 'H:i' };

export const Inline = Template.bind({});
Inline.args = { inline: '' };

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
