import '../vwc-textfield.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-textfield';
const HELPER_MESSAGE = 'helper';
const ERROR_MESSAGE = 'error';

describe('textfield helper', () => {
	let addedElement;

	beforeEach(async () => {
		[addedElement] = textToDomToParent(`
			<${COMPONENT_NAME} outlined	label="Vwc textfield"	helper="${HELPER_MESSAGE}" validationMessage="${ERROR_MESSAGE}"	required pattern="[0-9]+"></${COMPONENT_NAME}>
		`);
		await waitNextTask();
	});

	afterEach(() => {
		addedElement.remove();
	});

	it('should have helper text visible', async () => {
		const helperLine = getAsHelperLine(addedElement);

		assertExistWithMessage(helperLine, HELPER_MESSAGE);
		assertComputedStyle(helperLine, { opacity: '1' });
	});

	it('should have the helper text colored', async () => {
		const helperLine = getAsHelperLine(addedElement);

		assertComputedStyle(helperLine, { color: 'rgb(102, 102, 102)' });

		addedElement.dense = true;
		await waitNextTask();
		assertComputedStyle(helperLine, { color: 'rgb(102, 102, 102)' });

		addedElement.disabled = true;
		await waitNextTask();
		assertComputedStyle(helperLine, { color: 'rgb(153, 153, 153)' });
	});

	it('should have the error message colored', async () => {
		await turnValidityWaitReported(addedElement, false);
		await blur(addedElement);
		const errorLine = getAsErrorLine(addedElement);
		const errorIcon = getErrorIcon(addedElement);

		assertComputedStyle(errorLine, { color: 'rgb(0, 0, 0)' });
		assertComputedStyle(errorIcon, { color: 'rgb(230, 29, 29)' });
	});

	it('should have error message icon of our own', async () => {
		await turnValidityWaitReported(addedElement, false);

		const errorIcon = getErrorIcon(addedElement);
		expect(errorIcon).to.exist;
		assertComputedStyle(errorIcon, { display: 'flex' });
	});

	it('should have error message invisible when valid', async () => {
		let errorLine = getAsErrorLine(addedElement);
		expect(errorLine).to.not.exist;
	});

	it('should have error message visible when error', async () => {
		await turnValidityWaitReported(addedElement, false);

		const errorLine = getAsErrorLine(addedElement);
		const errorIcon = getErrorIcon(addedElement);
		assertExistWithMessage(errorLine, ERROR_MESSAGE);
		assertComputedStyle(errorLine, { opacity: '1' });
		assertComputedStyle(errorIcon, { display: 'flex' });
	});

	it('should have error message gone when back to normal', async () => {
		//	make it error, blur, error still present
		await turnValidityWaitReported(addedElement, false);
		await blur(addedElement);
		const errorLine = getAsErrorLine(addedElement);
		assertComputedStyle(errorLine, { opacity: '1' });

		//	fix the error
		await turnValidityWaitReported(addedElement, true);

		//	blurred, helper is visible now
		await blur(addedElement);
		const helperLine = getAsHelperLine(addedElement);
		assertExistWithMessage(helperLine, HELPER_MESSAGE);
		assertComputedStyle(errorLine, { opacity: '1' });
	});
});

//	internal util functions
//
function getAsHelperLine(baseElement) {
	return baseElement.shadowRoot.querySelector('.helper-message:not([is-error])');
}

function getAsErrorLine(baseElement) {
	return baseElement.shadowRoot.querySelector('.helper-message[is-error]');
}

function getErrorIcon(baseElement) {
	return getAsErrorLine(baseElement)?.shadowRoot.querySelector('.helper-icon');
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
