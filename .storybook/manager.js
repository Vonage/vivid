import { addons } from '@storybook/addons';

import vividTheme from './vivid-theme.js';

addons.setConfig({
	theme: vividTheme,
});

window.addEventListener('load', processCustomUI);

async function processCustomUI() {
	const response = await fetch('./build-details.json');
	if (response.ok) {
		const buildDetails = await response.json();
		const vvc = document.querySelector('.sidebar-header');
		const vve = document.querySelector('#vivid-version-template');
		if (vvc && vve) {
			const bde = vve.content.cloneNode(true);
			bde.querySelector('.build-version').textContent = buildDetails.version;
			bde.querySelector('.build-timestamp').textContent = formatBuildTime(new Date(buildDetails.timestamp));
			vvc.parentElement.insertBefore(bde, vvc.nextElementSibling);
		}
	} else {
		console.error(`failed to fetch build details, status ${response.status}`);
	}
}

function formatBuildTime(input) {
	let d = new Date();
	return `${String(input.getHours()).padStart(2, '0')}:${String(input.getMinutes()).padStart(2, '0')} ${String(input.getDate()).padStart(2, '0')}-${String(input.getMonth() + 1).padStart(2, '0')}-${input.getFullYear()}`;
}