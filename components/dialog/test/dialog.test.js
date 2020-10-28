import '../vwc-dialog.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
	awaitEvent,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import vvdCore from '@vonage/vvd-core';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-dialog';

describe('dialog', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(customElements.get(COMPONENT_NAME));
	});

	it('should have internal contents matching snapshot', async () => {
		const [actualElement] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} open><div>Content</div></${COMPONENT_NAME}>`
			)
		);
		await awaitEvent(actualElement, 'opened');
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`styles`, function () {
		it(`should have the wanted styles`, async function () {
			await vvdCore.set({
				scheme: 'light',
			});

			const surfaceWantedStyles = {
				'background-color': 'rgb(255, 255, 255)',
				'border-radius': '6px',
				'box-shadow': 'rgba(19, 20, 21, 0.1) 0px 4px 20px 0px',
			};

			const contentWantedStyles = {
				color: 'rgb(0, 0, 0)',
			};

			const [actualElement] = textToDomToParent(
				`<${COMPONENT_NAME} open><div>Content</div></${COMPONENT_NAME}>`
			);

			await waitNextTask();
			const surface = actualElement.shadowRoot.querySelector(
				'.mdc-dialog__surface'
			);
			const content = actualElement.shadowRoot.querySelector('#content');

			assertComputedStyle(surface, surfaceWantedStyles);
			assertComputedStyle(content, contentWantedStyles);
		});
	});
});
