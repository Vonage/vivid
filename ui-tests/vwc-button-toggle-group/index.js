import vvdCore from '@vonage/vvd-core';
import * as stories from '@vonage/vwc-button-toggle-group/stories/toggle-buttons-group.stories';
import { VWCButtonToggleGroup } from '@vonage/vwc-button-toggle-group';
import { storiesToElement } from '../utils/storiesToElement';

VWCButtonToggleGroup;

export async function createElementVariations(wrapper) {
	wrapper.appendChild(storiesToElement(stories));

	await vvdCore.settled;
}


