import '@vonage/vwc-calendar';
import '@vonage/vwc-calendar/vwc-calendar-event.js';
import * as stories from '@vonage/vwc-calendar/stories/calendar.stories';
import { storiesToElement } from '../../utils/storiesToElement';


export async function createElementVariations(wrapper) {
	wrapper.appendChild(storiesToElement(stories));
}


