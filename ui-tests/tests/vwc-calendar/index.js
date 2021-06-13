import vvdCore from '@vonage/vvd-core';
import { VWCCalendar } from '@vonage/vwc-calendar';
import '@vonage/vwc-calendar/vwc-calendar-event.js';
import * as stories from '@vonage/vwc-calendar/stories/calendar.stories';
import { storiesToElement } from '../../utils/storiesToElement';

VWCCalendar;

export async function createElementVariations(wrapper) {
	wrapper.appendChild(storiesToElement(stories));

	await vvdCore.settled;
}


