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
	<vwc-calendar-event day="2" style="--vvd-calendar-event-event-color: #4cc3d2; --vvd-calendar-event-event-row: 9 / span 24; --vvd-calendar-event-overlap-count: 2"></vwc-calendar-event>
	<vwc-calendar-event day="2" style="--vvd-calendar-event-event-color: #d6219c; --vvd-calendar-event-event-row: 5 / span 16"></vwc-calendar-event>
	<vwc-calendar-event day="2" style="--vvd-calendar-event-event-color: #b779ff; --vvd-calendar-event-event-row: 13 / span 10; --vvd-calendar-event-overlap-count: 1"></vwc-calendar-event>
	<vwc-calendar-event day="4" style="--vvd-calendar-event-event-color: #d6219c; --vvd-calendar-event-event-row: 13 / span 32"></vwc-calendar-event>
	<vwc-calendar-event day="6" style="--vvd-calendar-event-event-color: #b779ff; --vvd-calendar-event-event-row: 15 / span 8" label="my event"></vwc-calendar-event>
</vwc-calendar>`;

export const Basic = Template.bind({});
Basic.args = { datetime: '2021-01-01' };
