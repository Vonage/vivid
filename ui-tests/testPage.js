import vvdCore from '@vonage/vvd-core';
import { createElementVariations as VwcAccordion } from './tests/vwc-accordion';
	import { createElementVariations as VwcAudio } from './tests/vwc-audio';
	import { createElementVariations as VwcBadge } from './tests/vwc-badge';
	import { createElementVariations as VwcButtonToggleGroup } from './tests/vwc-button-toggle-group';
	import { createElementVariations as VwcCalendar } from './tests/vwc-calendar';
	import { createElementVariations as VwcIconButtonToggle } from './tests/vwc-icon-button-toggle';
	import { createElementVariations as VwcTextfield } from './tests/vwc-textfield';
	
import { waitInterval } from '../test/test-helpers';
import './assets/testPage.css';

const wrapper = document.createElement('div');
wrapper.id = 'main';
document.body.appendChild(wrapper);

async function main() {
	await vvdCore.settled;

	await Promise.all([
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcAccordion";
			wrapper.appendChild(wrapperElement);
			return VwcAccordion(wrapperElement);
		})(),
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcAudio";
			wrapper.appendChild(wrapperElement);
			return VwcAudio(wrapperElement);
		})(),
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcBadge";
			wrapper.appendChild(wrapperElement);
			return VwcBadge(wrapperElement);
		})(),
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcButtonToggleGroup";
			wrapper.appendChild(wrapperElement);
			return VwcButtonToggleGroup(wrapperElement);
		})(),
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcCalendar";
			wrapper.appendChild(wrapperElement);
			return VwcCalendar(wrapperElement);
		})(),
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcIconButtonToggle";
			wrapper.appendChild(wrapperElement);
			return VwcIconButtonToggle(wrapperElement);
		})(),
		(() => {
			const wrapperElement = document.createElement('div');
			wrapperElement.id = "VwcTextfield";
			wrapper.appendChild(wrapperElement);
			return VwcTextfield(wrapperElement);
		})(),
		
	]);

	await waitInterval(500);
}

main().then(() => globalThis.doTest());
