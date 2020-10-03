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

describe.only('textfield helper', () => {
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

	it('should make a helper text visible when focused', async () => {
		const helperLine = getAsHelperLine(addedElements[0]);

		//	present, not seen
		assertExistWithMessage(helperLine, HELPER_MESSAGE);
		assertComputedStyle(helperLine, { opacity: '0' });

		//	focused, seen
		await focus(addedElements[0]);
		assertComputedStyle(helperLine, { opacity: '1' });
	});

	it('should make a helper text invisible when blurred', async () => {
		const helperLine = getAsHelperLine(addedElements[0]);
		await focus(addedElements[0]);
		addedElements[0].shadowRoot
			.querySelector('.mdc-text-field')
			.classList.remove('mdc-text-field--focused');
		await waitInterval(200);
		assertComputedStyle(helperLine, { opacity: '0' });
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

		//	fix the error, error made invisible
		await turnValidityWaitReported(addedElements[0], true);
		assertComputedStyle(errorLine, { opacity: '0' });

		//	blurred, helper is visible now
		await blur(addedElements[0]);
		const helperLine = getAsHelperLine(addedElements[0]);
		assertExistWithMessage(helperLine, HELPER_MESSAGE);
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

async function focus(input) {
	input.focus();
	await waitInterval(200);
}

async function blur(input) {
	input.blur();
	await waitInterval(200);
}
