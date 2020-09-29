import '../vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-select',
	HELPER_MESSAGE = 'helper',
	ERROR_MESSAGE = 'error';

describe('select helper', () => {
	let addedElements = [];

	beforeEach(async () => {
		addedElements = textToDomToParent(`
			<${COMPONENT_NAME}
				outlined
				label="Vwc select"
				helper="${HELPER_MESSAGE}"
				validationMessage="${ERROR_MESSAGE}"
				required
			>
				<vwc-list-item></vwc-list-item>
				<vwc-list-item value="0">Item 0</vwc-list-item>
				<vwc-list-item value="1">Item 1</vwc-list-item>
			</${COMPONENT_NAME}>
		`);
		await waitNextTask();
	});

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should have a helper text visible', async () => {
		const helperLine = getAsHelperLine(addedElements[0]);
		assertExistWithMessage(helperLine, HELPER_MESSAGE);
		assertComputedStyle(helperLine, { opacity: '1' });
	});

	it('should have helper error message visible when error', async () => {
		//	present helper, seen
		let helperLine = getAsHelperLine(addedElements[0]);
		assertExistWithMessage(helperLine, HELPER_MESSAGE);

		//	error not present
		let errorLine = getAsErrorLine(addedElements[0]);
		expect(errorLine).to.not.exist;
		assertComputedStyle(helperLine, { opacity: '1' });

		//	make it error and validate, error present
		await turnValidityWaitReported(addedElements[0], false);

		errorLine = getAsErrorLine(addedElements[0]);
		assertExistWithMessage(errorLine, ERROR_MESSAGE);

		//	fix the error, error made invisible
		await turnValidityWaitReported(addedElements[0], true);

		//	error replaced by helper
		errorLine = getAsErrorLine(addedElements[0]);
		expect(errorLine).to.not.exist;
		assertExistWithMessage(helperLine, HELPER_MESSAGE);
	});
});

//	internal util functions
//
function getAsHelperLine(addedElement) {
	return addedElement.shadowRoot.querySelector('.mdc-select-helper-text');
}

function getAsErrorLine(addedElement) {
	return addedElement.shadowRoot.querySelector(
		'.mdc-select-helper-text--validation-msg'
	);
}

function assertExistWithMessage(helperLine, messageExpected) {
	expect(helperLine).to.exist;
	expect(helperLine.textContent).to.equal(messageExpected);
}

async function turnValidityWaitReported(input, toBeValid) {
	input.focus();
	input.select(toBeValid ? 1 : 0);
	input.reportValidity();
	input.blur();
	await waitInterval(200);
}
