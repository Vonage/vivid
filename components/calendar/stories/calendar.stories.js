import '@vonage/vwc-calendar/vwc-calendar.js';
import '@vonage/vwc-calendar/vwc-calendar-event.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Calendar',
	component: 'vwc-calendar',
	argTypes
};

const Template = args => html`<vwc-calendar ...=${spread(args)}>
	<vwc-calendar-event day="1" start="23" duration="9" heading="Summer time" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event day="1" start="0" duration="12" color="rgb(43, 158, 250)" heading="Summer time" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event day="3" start="4" duration="17" color="rgb(214, 33, 156)" heading="Summer time" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event day="7" start="12" duration="24" color="rgb(183, 126, 249)" heading="Summer time" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event day="7" start="69" duration="27" color="rgb(50, 175, 76)" heading="Summer time" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event day="4" start="24" duration="12" color="rgb(50, 175, 76)" heading="Summer time" description="All Day" overlap-count="2"></vwc-calendar-event>
	<vwc-calendar-event day="4" start="26" duration="27" color="rgb(43, 158, 250)" heading="Summer time" description="All Day"></vwc-calendar-event>
</vwc-calendar>`;

export const Basic = Template.bind({});
Basic.args = { datetime: '2021-01-01' };
