import '@vonage/vwc-datepicker';
import '@vonage/vwc-textfield';
import '@vonage/vwc-banner';
import { html } from 'lit';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Datepicker',
	component: 'vwc-datepicker',
	argTypes
};

const Template = args => html`
  <style>
    html, body {
      height: 100%;
    }
		vwc-note {
			margin-bottom: 1rem;
		}
    vwc-textfield { width: 260px; }
  </style>
	<vwc-note header="This component is being deprecated!" open icon="warning-solid" connotation="warning">
		We're working on a newer and better solution. Sorry for the inconvenience.
	</vwc-note>
  <vwc-datepicker ...=${spread(args)}>
    <vwc-textfield dense icon='calendar' placeholder='Datepicker'></vwc-textfield>
  </vwc-datepicker>
`;

export const Basic = Template.bind({});
Basic.args = { dateFormat: 'Y-m-d', closeOnSelect: '' };

export const MaxDate = Template.bind({});
MaxDate.args = { dateFormat: 'Y-m-d', MaxDate: 'today', closeOnSelect: '' };

export const MonthPicker = Template.bind({});
MonthPicker.args = { dateFormat: 'F Y', monthPicker: '', closeOnSelect: '' };

export const Range = Template.bind({});
Range.args = { mode: 'range' };

export const DateTime = Template.bind({});
DateTime.args = { enableTime: '', dateFormat: 'Y-m-d H:i' };

export const Time = Template.bind({});
Time.args = { enableTime: '', noCalendar: '', dateFormat: 'H:i' };

const InlineTemplate = args => html`
	<style>
		vwc-note {
			margin-bottom: 1rem;
		}
	</style>
	<vwc-note header="This component is being deprecated!" open icon="warning-solid" connotation="warning">
		We're working on a newer and better solution. Sorry for the inconvenience.
	</vwc-note>
	<vwc-datepicker ...=${spread(args)}></vwc-datepicker>
`;

export const Inline = InlineTemplate.bind({});
Inline.args = { inline: '' };

export {
	WeekSelect
} from './datepicker-week-select.stories.js';

export {
	Dialog
} from './datepicker-dialog.stories.js';

export {
	Anchor
} from './datepicker-anchor.stories.js';
