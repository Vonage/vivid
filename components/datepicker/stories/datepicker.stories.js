import '@vonage/vwc-datepicker';
import '@vonage/vwc-textfield';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
  title: 'Components/Composite/Datepicker',
  component: 'vwc-datepicker',
  argTypes
};

const Template = args => html`
  <style>
    vwc-textfield { width: 260px; }
  </style>
  <vwc-datepicker ...=${spread(args)}>
    <vwc-textfield dense icon='calendar' placeholder='Datepicker'></vwc-textfield>
  </vwc-datepicker>
`;

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

const InlineTemplate = args => html`<vwc-datepicker ...=${spread(args)}></vwc-datepicker>`;

export const Inline = InlineTemplate.bind({});
Inline.args = { inline: '' };

export {
	Dialog
} from './datepicker-dialog.stories.js';

export {
	Position
} from './datepicker-position.stories.js';
