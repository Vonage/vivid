import '@vonage/vwc-file-picker';
import '@vonage/vwc-button';
import '@vonage/vwc-icon';

import { filePickersHTML } from './html';

export async function createElementVariations(wrapper) {
	const el = document.createElement('div');
	wrapper.classList.add('grid');
	el.classList.add('grid');
	el.innerHTML = filePickersHTML;
	wrapper.appendChild(el);
}
