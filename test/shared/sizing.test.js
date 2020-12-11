import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../test-helpers.js';
import {
  selectors,
  sizeStyles
} from '../style-utils.js';

let addElement = isolatedElementsCreation();

export async function sizingTestCases(COMPONENT_NAME) {
	let formElement, actualElement;
	beforeEach(async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		formElement = addedElements[0];
		actualElement = formElement.shadowRoot.querySelector(selectors[COMPONENT_NAME]);
	});

	it('should have normal size by default', async () => {
		assertComputedStyle(actualElement, sizeStyles('default'));
	});

	it('should have dense size when dense', async () => {
		formElement.setAttribute('dense', 'true');
		await waitNextTask();
		assertComputedStyle(actualElement, sizeStyles('dense'));
	});

	it('should have enlarged size when enlarged', async () => {
		formElement.enlarged = true;
		await waitNextTask();
		assertComputedStyle(actualElement, sizeStyles('enlarged'));
	});
}
