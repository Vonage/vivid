import * as stories from '@vonage/vwc-button-toggle-group/stories/toggle-buttons-group.stories';
import '@vonage/vwc-button-toggle-group';
import '@vonage/vwc-button';
import '@vonage/vwc-icon-button';
import { storiesToElement } from '../../utils/storiesToElement';

export async function createElementVariations(wrapper) {
	wrapper.appendChild(storiesToElement(stories));

	await Promise.all([...wrapper.querySelectorAll('vwc-button-toggle-group')].map(element => element.updateComplete));
}


