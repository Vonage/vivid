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
      <vwc-textfield outlined dense icon='calendar' placeholder='Datepicker'></vwc-textfield>
    </vwc-datepicker>
  </div>`;

export const Basic = Template.bind({});
Basic.args = { dateFormat: 'Y-m-d', altInput: '', altFormat: 'F j, Y' };

export const MaxDate = Template.bind({});
MaxDate.args = { dateFormat: 'Y-m-d', altInput: '', altFormat: 'F j, Y', MaxDate: 'today' };

export const WeekPicker = Template.bind({});
WeekPicker.args = { weekSelect: '', altInput: '' };

export const MonthPicker = Template.bind({});
MonthPicker.args = { monthSelect: '', altInput: '' };

export const Range = Template.bind({});
Range.args = { mode: 'range' };

export const DateTime = Template.bind({});
DateTime.args = { enableTime: '', dateFormat: 'Y-m-d H:i' };

export const Time = Template.bind({});
Time.args = { enableTime: '', noCalendar: '', dateFormat: 'H:i' };

export const Inline = Template.bind({});
Inline.args = { inline: '' };
