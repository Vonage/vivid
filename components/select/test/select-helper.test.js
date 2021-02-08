import '../vwc-select.js';
import '@vonage/vwc-list/vwc-list-item.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	textToDomToParent,
	waitNextTask,
	waitInterval,
	assertComputedStyle,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-select';
	const HELPER_MESSAGE = 'helper';
	const ERROR_MESSAGE = 'error';

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
		const errorLine = getAsErrorLine(addedElements[0]);
		const vwcIcon = errorLine.shadowRoot.querySelector('.helper-icon');

		assertComputedStyle(errorLine, { color: 'rgb(0, 0, 0)' });
		assertComputedStyle(vwcIcon, { color: 'rgb(230, 29, 29)' });
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
function getAsHelperLine(baseElement) {
	return baseElement.shadowRoot.querySelector('.helper-message:not([is-error])');
}

function getAsErrorLine(baseElement) {
	return baseElement.shadowRoot.querySelector('.helper-message[is-error]');
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
