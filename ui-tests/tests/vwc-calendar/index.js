import vvdCore from '@vonage/vvd-core';
import { VWCCalendar } from '@vonage/vwc-calendar';
import '@vonage/vwc-calendar/vwc-calendar-event.js';
import * as stories from '@vonage/vwc-calendar/stories/calendar.stories';
import { storiesToElement } from '../../utils/storiesToElement';

VWCCalendar;

export async function createElementVariations(wrapper) {
	wrapper.style.transform = 'scale(.5)';
	wrapper.appendChild(storiesToElement(stories));

	await wrapper.querySelector('vwc-calendar').updateComplete;

	const events = Array.from(wrapper.querySelectorAll('vwc-calendar-event'));
	await Promise.allSettled(events.map(({ updateComplete }) => updateComplete));

	await vvdCore.settled;
}


