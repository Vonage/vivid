import '@vonage/vwc-icon';
import {
	waitInterval,
	isolatedElementsCreation,
	textToDomToParent,
	assertDistancePixels,
	assertComputedStyle,
} from '../../../test/test-helpers.js';

const LOAD_TIME = 400;
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

describe('vwc-icon', () => {
	describe('custom component registration', function () {
		it('Should be defined', function () {
			assert.exists(customElements.get('vwc-icon', 'vwc-icon element is defined'));
		});
	});

	describe('component behaviour', function () {
		let iconEl;
		const ICON_SAMPLE = {
			'arrow-right-solid': `M0 10.5H13.5V3L24 12L13.5 21V13.5H0V10.5Z`,
			'bookmark-solid': `M6 0C4.35 0 3 1.35 3 3V24L12 19.5L21 24V3C21 1.35 19.65 0 18 0H6Z`,
		};

		beforeEach(() => {
			iconEl = document.createElement('vwc-icon');
			document.querySelector('body').appendChild(iconEl);
		});

		afterEach(() => {
			document.querySelector('body').removeChild(iconEl);
		});

		it('Should be empty', () => {
			assert.isEmpty(iconEl.innerHTML);
		});

		Object.entries(ICON_SAMPLE).forEach(([iconName, iconData]) => {
			it(`Should contain "${iconName}" path`, async function () {
				iconEl.setAttribute('type', iconName);
				await sleep(LOAD_TIME);
				assert.equal(
					iconEl.shadowRoot
						.querySelector('svg > path:first-child')
						.getAttribute('d'),
					iconData
				);
			});
		});
	});

	describe('icon layout', () => {
		const addElement = isolatedElementsCreation();
		const ICON_SIZES = {
			small: '16px',
			medium: '24px',
			large: '32px',
		};

		for (const [sizeName, sizeValue] of Object.entries(ICON_SIZES)) {
			it(`'${sizeName}' icon should be sized property`, async () => {
				const [e] = addElement(
					textToDomToParent(
						`<vwc-icon type="happy-line" size="${sizeName}"></vwc-icon>`
					)
				);
				await waitInterval(LOAD_TIME);
				const svg = e.shadowRoot.querySelector('svg');
				assertComputedStyle(e, { width: sizeValue, height: sizeValue });
				assertComputedStyle(svg, { width: sizeValue, height: sizeValue });
			});

			it(`'${sizeName}' icon should be located property`, async () => {
				const [e] = addElement(
					textToDomToParent(
						`<vwc-icon type="happy-line" size="${sizeName}"></vwc-icon>`
					)
				);
				await waitInterval(LOAD_TIME);
				const svg = e.shadowRoot.querySelector('svg');
				assertDistancePixels(e, svg, 'top', 0);
				assertDistancePixels(e, svg, 'left', 0);
			});
		}

		it('icon should be inline', async () => {
			const [e] = addElement(
				textToDomToParent(`<vwc-icon type="happy-line" inline></vwc-icon>`)
			);
			await waitInterval(LOAD_TIME);
			const svg = e.shadowRoot.querySelector('svg');
			assertComputedStyle(svg, {
				display: 'inline',
				width: ICON_SIZES.small,
				height: ICON_SIZES.small,
			});
		});
	});
});
