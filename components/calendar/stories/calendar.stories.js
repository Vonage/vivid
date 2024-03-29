import '@vonage/vwc-calendar/vwc-calendar.js';
import '@vonage/vwc-calendar/vwc-calendar-event.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types';

export default {
	title: 'Components/Calendar',
	component: 'vwc-calendar',
	argTypes
};

const Calendar = args => html`<vwc-calendar ...=${spread(args)} @click=${onClick} @keydown=${onKeyDown}>
	<vwc-calendar-event slot="day-0" start="0" duration="1" color="rgb(43, 158, 250)" heading="Pool party" description="2pm"></vwc-calendar-event>
	<vwc-calendar-event slot="day-0" start="14" duration="2.25" heading="Summer time" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event slot="day-2" start="4" duration="4" color="rgb(214, 33, 156)" heading="Team meeting" description="11am - 13pm"></vwc-calendar-event>
	<vwc-calendar-event slot="day-3" start="16" duration="8" color="rgb(50, 175, 76)" heading="Main event" description="12:30pm" overlap-count="2"></vwc-calendar-event>
	<vwc-calendar-event slot="day-3" start="17" duration="7" color="rgb(43, 158, 250)" heading="Roadmap discussion" description="All Day"></vwc-calendar-event>
	<vwc-calendar-event slot="day-3" start="18.5" duration="7.5" heading="Summer time" description="15:30pm" overlap-count="1"></vwc-calendar-event>
	<vwc-calendar-event slot="day-6" start="12" duration="4" color="rgb(183, 126, 249)" heading="Team social" description="14pm"></vwc-calendar-event>
	<vwc-calendar-event slot="day-6" start="20" duration="5" color="rgb(50, 175, 76)" heading="Summer time" description="18pm"></vwc-calendar-event>
</vwc-calendar>`;

export const Basic = Calendar.bind({});
Basic.args = { datetime: '2021-01-01' };

export const Locale = Calendar.bind({});
Locale.args = { datetime: '2021-01-01', locales: ['he-IL'], style: 'direction: rtl' };

function onClick(e) {
	console.log(e.target.getEventContext(e));
}

function onKeyDown(e) {
	const { keyCode } = e;
	if (!(keyCode == 13 || keyCode == 32)) {
		return;
	}
	console.log(e.target.getEventContext(e));
}
