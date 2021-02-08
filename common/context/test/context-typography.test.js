import vvdContext from '@vonage/vvd-context';
import {
	assertComputedStyle,
	getTypographyStyle,
} from '../../../test/test-helpers.js';
import {
	CONTEXT_PROVIDING_ELEMENTS,
	DEVIATIVE_ELEMENTS,
} from './typography-definitions.test.js';

describe('vvd-context typography', () => {
	for (const deviation of DEVIATIVE_ELEMENTS) {
		describe(`'${deviation.name}' deviation`, () => {
			for (const [contextElement, typographyContext] of Object.entries(
				CONTEXT_PROVIDING_ELEMENTS
			)) {
				for (const deviatingElement of deviation.elements) {
					it(`should have '${deviatingElement}' element styled within '${contextElement}'`, async () => {
						const iframe = await setupLocalIframe();
						const d = iframe.contentWindow.document;

						d.body.classList.add('vivid-scope');

						await vvdContext.mount(d);

						const ce = d.createElement(contextElement);
						d.body.appendChild(ce);

						const te = d.createElement(deviatingElement);
						te.textContent = 'sample';
						ce.appendChild(te);

						const expectedStyle = {
							...(await getTypographyStyle(typographyContext)),
							...deviation.deviations,
						};
						assertComputedStyle(te, expectedStyle);

						iframe.remove();
					});
				}
			}
		});
	}
});

async function setupLocalIframe() {
	const r = document.createElement('iframe');
	let p = new Promise((resolve) => {
		r.onload = () => resolve(r);
	});
	document.body.appendChild(r);
	return p;
}
