import '../vwc-loading-veil.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
} from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-loading-veil';

describe.only('loading veil', () => {
	const addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				`${COMPONENT_NAME} element is not defined`
			)
		);
	});

	it('should have default internal contents when nothing slotted', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have custom internal contents when slotted (no default)', async () => {
		const addedElements = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME}><span>Loading...</span></${COMPONENT_NAME}>`
			)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('behaviours', () => {
		it('should put a veil and remove it by given timeout (no awaitees)', async () => {});

		it('should put a veil and remove it when all awaitees done', async () => {});

		it('should put a veil and remove it by given timeout (awaitees take too much)', async () => {});
	});
});
