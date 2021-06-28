import '@vonage/vwc-file-picker';
import '@vonage/vwc-button';
import * as stories from '@vonage/vwc-file-picker/stories/file-picker-presentation.stories';
import { storiesToElement } from '../../utils/storiesToElement';


export async function createElementVariations(wrapper) {
	wrapper.appendChild(storiesToElement(stories));
}
