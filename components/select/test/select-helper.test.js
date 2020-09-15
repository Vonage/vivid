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

const COMPONENT_NAME = 'vwc-select';

describe('select helper', () => {
	let addedElements = [];

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should have a helper text visible', async () => {
		const helper = 'helper',
			error = 'error';
		addedElements = textToDomToParent(`
			<${COMPONENT_NAME}
				outlined
				label="Vwc select"
				helper="${helper}"
				validationMessage="${error}"
				required"
			>
				<vwc-list-item></vwc-list-item>
				<vwc-list-item value="0">Item 0</vwc-list-item>
				<vwc-list-item value="1">Item 1</vwc-list-item>
			</${COMPONENT_NAME}>
		`);
		await waitNextTask();

		//	present, not seen
		const helperLine = addedElements[0].shadowRoot.querySelector(
			'.mdc-select-helper-text'
		);
		expect(helperLine).to.exist;
		expect(helperLine.textContent).to.equal(helper);
		assertComputedStyle(helperLine, { opacity: '1' });
	});

	it('should have helper error message visible when error', async () => {
		const helper = 'helper',
			error = 'error';
		addedElements = textToDomToParent(`
			<${COMPONENT_NAME}
				outlined
				label="Vwc select"
				helper="${helper}"
				validationMessage="${error}"
				required
			>
				<vwc-list-item></vwc-list-item>
				<vwc-list-item value="0">Item 0</vwc-list-item>
				<vwc-list-item value="1">Item 1</vwc-list-item>
			</${COMPONENT_NAME}>
		`);
		await waitNextTask();

		//	present helper, seen
		let helperLine = addedElements[0].shadowRoot.querySelector(
			'.mdc-select-helper-text'
		);
		expect(helperLine).to.exist;
		expect(helperLine.textContent).to.equal(helper);
		let errorLine = addedElements[0].shadowRoot.querySelector(
			'.mdc-select-helper-text--validation-msg'
		);
		expect(errorLine).to.not.exist;
		assertComputedStyle(helperLine, { opacity: '1' });

		//	make it error and validate, error present
		addedElements[0].focus();
		addedElements[0].select(0);
		addedElements[0].reportValidity();
		addedElements[0].blur();

		await waitInterval(200);

		errorLine = addedElements[0].shadowRoot.querySelector(
			'.mdc-select-helper-text--validation-msg'
		);
		expect(errorLine).to.exist;
		expect(errorLine.textContent).to.equal(error);

		//	fix the error, error made invisible
		addedElements[0].focus();
		addedElements[0].select(1);
		addedElements[0].reportValidity();
		addedElements[0].blur();

		await waitInterval(200);

		errorLine = addedElements[0].shadowRoot.querySelector(
			'.mdc-select-helper-text--validation-msg'
		);
		expect(errorLine).to.not.exist;
		expect(helperLine.textContent).to.equal(helper);
	});
});
