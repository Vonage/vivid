import '../vwc-dialog.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-dialog';

describe('Dialog', () => {
	async function openDialog(actualElement) {
		actualElement.open = true;
		await actualElement.updateComplete;
	}

	async function getScrimElement(actualElement) {
		await actualElement.updateComplete;
		const scrimElement = actualElement.shadowRoot.querySelector(
			'.mdc-dialog__scrim'
		);
		return scrimElement;
	}

	async function toggleModalMode(actualElement, mode = true) {
		actualElement.modalMode = mode;
		await actualElement.updateComplete;
	}

	async function getDialogElement() {
		const [actualElement] = addElement(textToDomToParent(
			`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`
		));
		await actualElement.updateComplete;
		return actualElement;
	}

	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(customElements.get(COMPONENT_NAME));
	});

	it('should have internal contents', async () => {
		const actualElement = await getDialogElement();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it(`should not close dialog when clicking on scrimshaw if modal is set`, async function () {
		const actualElement = await getDialogElement();

		const scrimElement = await getScrimElement(actualElement);

		await openDialog(actualElement);

		await toggleModalMode(actualElement, true);

		scrimElement.click();

		expect(actualElement.open).to.equal(true);
	});

	it(`should close dialog when clicking on scrim if modal is not set`, async function () {
		const actualElement = await getDialogElement();

		const scrimElement = await getScrimElement(actualElement);

		await openDialog(actualElement);

		scrimElement.click();

		expect(actualElement.open).to.equal(false);
	});
});
