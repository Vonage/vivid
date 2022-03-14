import { COMPONENT_NAME } from '../vwc-textfield.js';
import {
	textToDomToParent,
	waitNextTask,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

describe('textfield character counter', () => {
	let addedElement;

	beforeEach(async () => {
		[addedElement] = textToDomToParent(`
			<${COMPONENT_NAME} charcounter maxlength="18"></${COMPONENT_NAME}>
		`);
		await waitNextTask();
	});

	afterEach(() => {
		addedElement.remove();
	});

	it('should have character counter', async () => {
		expect(getCharCounter(addedElement)).to.be.exist;
	});

	it('should have character counter displaying correct count', async () => {
		const charCounter = getCharCounter(addedElement);

		const initialCharCounter = charCounter.textContent;

		addedElement.value = 'some value';
		await waitNextTask();

		const updatedCharCounter = charCounter.textContent;

		expect(initialCharCounter).to.equal('0 / 18');
		expect(updatedCharCounter).to.equal('10 / 18');
	});
});

function getCharCounter(baseElement) {
	return baseElement.shadowRoot.querySelector('.mdc-text-field-character-counter');
}

