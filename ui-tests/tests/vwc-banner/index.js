
import '@vonage/vwc-banner';
import {
	Info, Announcement, Success, Warning, Alert
} from '@vonage/vwc-banner/stories/banner.stories';
import { storiesToElement } from '../../utils/storiesToElement';

export async function createElementVariations(wrapper) {
	wrapper.style.width = '600px';
	wrapper.appendChild(storiesToElement({
		Info, Announcement, Success, Warning, Alert
	}));
}


