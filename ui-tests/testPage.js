import { createElementVariations as vwcAudioTests } from './vwc-audio';
import { createElementVariations as vwcBadgeTests } from './vwc-badge';
import { createElementVariations as vwcTextFieldTests } from './vwc-textfield';

const wrapper = document.createElement('div');
wrapper.id = 'main';
document.body.appendChild(wrapper);

async function main() {
	await vwcAudioTests(wrapper);
	await vwcBadgeTests(wrapper);
	await vwcTextFieldTests(wrapper);
}

main().then(() => {});
