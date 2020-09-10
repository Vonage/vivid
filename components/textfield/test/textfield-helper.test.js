import '../vwc-textfield.js';
import { textToDomToParent, waitNextTask, assertComputedStyle } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';

describe('textfield helper', () => {
	let addedElements = [];

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should have a helper text visible when focused', async () => {
		const
			helper = 'helper',
			error = 'error';
		addedElements = textToDomToParent(`
			<${COMPONENT_NAME} outlined label="Vwc textarea" helper="${helper}" error="${error}"></${COMPONENT_NAME}>
		`);
		await waitNextTask();

		
	});

	it('should have helper error message visible when error', async () => {
		addedElements = textToDomToParent(`<${COMPONENT_NAME} outlined label="Vwc textarea"></${COMPONENT_NAME}>`);
		await waitNextTask();
		const labelElement = addedElements[0].shadowRoot.querySelector('.mdc-notched-outline').querySelector('#label');
	});
});