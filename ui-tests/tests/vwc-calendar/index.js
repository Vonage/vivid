import vvdCore from '@vonage/vvd-core';
import * as stories from '@vonage/vwc-calendar/stories/calendar.stories';
import { VWCCalendar } from '@vonage/vwc-calendar';
import { storiesToElement } from '../../utils/storiesToElement';

VWCCalendar;

export async function createElementVariations(wrapper) {
	wrapper.style.transform = 'scale(.5)';
	wrapper.appendChild(storiesToElement(stories));

	await vvdCore.settled;
}


