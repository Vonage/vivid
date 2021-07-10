import '@vonage/vwc-file-picker';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';

import { filePickersHTML } from './html';

export async function createElementVariations(wrapper) {
	const el = document.createElement('div');
	el.innerHTML = filePickersHTML;
	wrapper.appendChild(el);
}
