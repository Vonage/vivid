
import '@vonage/vwc-linear-progress';
import { Default, Buffered, Decorative } from '@vonage/vwc-linear-progress/stories/linear-progress.stories';
import { storiesToElement } from '../../utils/storiesToElement';

export async function createElementVariations(wrapper) {
	wrapper.style.width = '500px';
	wrapper.appendChild(storiesToElement({ Default, Buffered, Decorative }));
}


