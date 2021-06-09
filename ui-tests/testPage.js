import vvdCore from '@vonage/vvd-core';
import { createElementVariations as vwcAudioTests } from './vwc-audio';
import { createElementVariations as vwcBadgeTests } from './vwc-badge';
import { createElementVariations as vwcTextFieldTests } from './vwc-textfield';
import { createElementVariations as vwcButtonToggleGroup } from './vwc-button-toggle-group';
import { waitInterval } from '../test/test-helpers';
import './testPage.css';

const wrapper = document.createElement('div');
wrapper.id = 'main';
document.body.appendChild(wrapper);

async function main() {
	await vvdCore.settled;
	await vwcAudioTests(wrapper);
	await vwcBadgeTests(wrapper);
	await vwcTextFieldTests(wrapper);
	await vwcButtonToggleGroup(wrapper);
	await waitInterval(500);
}

main().then(() => globalThis.doTest());
