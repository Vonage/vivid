import '../vwc-textfield.js';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield',
	HELPER_MESSAGE = 'helper',
	ERROR_MESSAGE = 'error';

describe('textfield helper', () => {
	let addedElements = [];

	beforeEach(async () => {
		addedElements = textToDomToParent(`
			<${COMPONENT_NAME} outlined	label="Vwc textfield"	helper="${HELPER_MESSAGE}" validationMessage="${ERROR_MESSAGE}"	required pattern="[0-9]+"></${COMPONENT_NAME}>
		`);
		await waitNextTask();
	});

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should have helper text visible', async () => {
		const helperLine = getAsHelperLine(addedElements[0]);

		assertExistWithMessage(helperLine, HELPER_MESSAGE);
		assertComputedStyle(helperLine, { opacity: '1' });
	});

	it('should have the helper text colored', async () => {
		const actualElement = addedElements[0];
		const helperLine = getAsHelperLine(actualElement);

		assertComputedStyle(helperLine, { color: 'rgb(102, 102, 102)' });

		actualElement.dense = true;
		await waitNextTask();
		assertComputedStyle(helperLine, { color: 'rgb(102, 102, 102)' });

		actualElement.disabled = true;
		await waitNextTask();
		assertComputedStyle(helperLine, { color: 'rgb(153, 153, 153)' });
	});

	it('should have the error message colored', async () => {
		await turnValidityWaitReported(addedElements[0], false);
		await blur(addedElements[0]);
		const errorLine = getAsErrorLine(addedElements[0]);
		const vwcIcon = addedElements[0].shadowRoot.querySelector(
			'.mdc-text-field-helper-icon'
		);

		assertComputedStyle(errorLine, { color: 'rgb(0, 0, 0)' });
		assertComputedStyle(vwcIcon, { color: 'rgb(230, 29, 29)' });
	});

	it('should have error message icon of our own', async () => {
		const vwcIcon = addedElements[0].shadowRoot.querySelector('vwc-icon');
		expect(vwcIcon).to.exist;
		assertComputedStyle(vwcIcon, { display: 'none' });
	});

	it('should have error message invisible when valid', async () => {
		let errorLine = getAsErrorLine(addedElements[0]);
		expect(errorLine).to.not.exist;
	});

	it('should have error message visible when error', async () => {
		await turnValidityWaitReported(addedElements[0], false);

		const errorLine = getAsErrorLine(addedElements[0]);
		const vwcIcon = addedElements[0].shadowRoot.querySelector('vwc-icon');
		assertExistWithMessage(errorLine, ERROR_MESSAGE);
		assertComputedStyle(errorLine, { opacity: '1' });
		assertComputedStyle(vwcIcon, { display: 'flex' });
	});

	it('should have error message gone when back to normal', async () => {
		//	make it error, blur, error still present
		await turnValidityWaitReported(addedElements[0], false);
		await blur(addedElements[0]);
		const errorLine = getAsErrorLine(addedElements[0]);
		assertComputedStyle(errorLine, { opacity: '1' });

		//	fix the error
		await turnValidityWaitReported(addedElements[0], true);

		//	blurred, helper is visible now
		await blur(addedElements[0]);
		const helperLine = getAsHelperLine(addedElements[0]);
		assertExistWithMessage(helperLine, HELPER_MESSAGE);
		assertComputedStyle(errorLine, { opacity: '1' });
	});
});

//	internal util functions
//
function getAsHelperLine(addedElement) {
	return addedElement.shadowRoot.querySelector('.mdc-text-field-helper-text');
}

function getAsErrorLine(addedElement) {
	return addedElement.shadowRoot.querySelector(
		'.mdc-text-field-helper-text--validation-msg'
	);
}

function assertExistWithMessage(helperLine, messageExpected) {
	expect(helperLine).to.exist;
	expect(helperLine.textContent.trim()).to.equal(messageExpected.trim());
}

async function turnValidityWaitReported(input, toBeValid) {
	input.focus();
	input.value = toBeValid ? '12' : 'not-a-number';
	input.reportValidity();
	await waitInterval(200);
}

async function blur(input) {
	input.blur();
	await waitInterval(200);
}
