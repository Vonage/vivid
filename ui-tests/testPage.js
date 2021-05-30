import { createElementVariations as vwcAudioTests } from './vwc-audio';
import { createElementVariations as vwcBadgeTests } from './vwc-badge';
import { createElementVariations as vwcTextFieldTests } from './vwc-textfield';
import { createElementVariations as vwcIconButtonToggle } from './vwc-icon-button-toggle';
import './testPage.css';

const wrapper = document.createElement('div');
wrapper.id = 'main';
document.body.appendChild(wrapper);

async function main() {
	await vwcAudioTests(wrapper);
	await vwcBadgeTests(wrapper);
	await vwcTextFieldTests(wrapper);
	await vwcIconButtonToggle(wrapper);
}

main().then(() => {});
