import vvdContext from '@vonage/vvd-context';
import {
	assertComputedStyle,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import {
	CONTEXT_PROVIDING_ELEMENTS,
	DEVIATIVE_ELEMENTS,
	PADDING_DEFINITIONS,
	MARGIN_DEFINITIONS
} from './typography-definitions.test.js';

describe('vvd-context typography', () => {
	const wrapper = document.createElement('div');
	document.body.appendChild(wrapper);

	afterEach(function () {
		document.body.classList.remove('vivid-scope');
		wrapper.innerHTML = '';
	});

	for (const deviation of DEVIATIVE_ELEMENTS) {
		describe(`'${deviation.name}' deviation`, () => {

			for (const [contextElement, typographyContext] of Object.entries(
				CONTEXT_PROVIDING_ELEMENTS
			)) {
				for (const deviatingElement of deviation.elements) {
					it(`should have '${deviatingElement}' element styled within '${contextElement}'`, async () => {
						const d = document;

						d.body.classList.add('vivid-scope');

						await vvdContext.mount(d);

						const ce = d.createElement(contextElement);
						wrapper.appendChild(ce);

						const te = d.createElement(deviatingElement);
						te.textContent = 'sample';
						ce.appendChild(te);

						const expectedStyle = Object.assign(
							{},
							await getTypographyStyle(typographyContext),
							deviation.deviations
						);
						assertComputedStyle(te, expectedStyle);
					});
				}
			}
		});
	}

	describe('padding layout', () => {
		for (const [te, tp] of Object.entries(PADDING_DEFINITIONS)) {
			it(`should have '${te}' element with correct paddings`, async () => {
				const d = document;
				d.body.classList.add('vivid-scope');
				await vvdContext.mount(d);
				const ce = d.createElement(te);
				wrapper.appendChild(ce);
				assertComputedStyle(ce, {
					paddingTop: tp[0],
					paddingRight: tp[1],
					paddingBottom: tp[2],
					paddingLeft: tp[3]
				});
			});
		}
	});

	describe('margin layout', () => {
		for (const [te, tm] of Object.entries(MARGIN_DEFINITIONS)) {
			it(`should have '${te}' element with correct margins`, async () => {
				const d = document;
				d.body.classList.add('vivid-scope');
				await vvdContext.mount(d);
				const ce = d.createElement(te);
				wrapper.appendChild(ce);
				assertComputedStyle(ce, {
					marginTop: tm[0],
					marginRight: tm[1],
					marginBottom: tm[2],
					marginLeft: tm[3]
				});
			});
		}
	});
});

async function setupLocalIframe() {
	const r = document.createElement('iframe');
	let p = new Promise((resolve) => {
		r.onload = () => resolve(r);
	});
	document.body.appendChild(r);
	return p;
}
