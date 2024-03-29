import '@vonage/vwc-list';
import '@vonage/vwc-list/vwc-list-item';
import '@vonage/vwc-list/vwc-check-list-item';
import '@vonage/vwc-list/vwc-radio-list-item';


import { storiesToElement } from '../../utils/storiesToElement';
import * as basicStories from '@vonage/vwc-list/stories/list-basic.stories';
import * as checkStories from '@vonage/vwc-list/stories/list-check.stories';
import * as expansionPanelStories from '@vonage/vwc-list/stories/list-expansion-panel.stories';
import * as metaStories from '@vonage/vwc-list/stories/list-meta-icon.stories';
import * as listItemStories from '@vonage/vwc-list/stories/list-item.stories';
import * as radioItemStories from '@vonage/vwc-list/stories/list-radio.stories';

export async function createElementVariations(wrapper) {
	const elementWrapper = storiesToElement({
		...basicStories,
		...checkStories,
		...expansionPanelStories,
		...metaStories,
		...listItemStories,
		...radioItemStories
	});

	wrapper.appendChild(elementWrapper);

	wrapper.classList.add('grid');
	elementWrapper.classList.add('grid');
}


