import '../vwc-textfield.js';
import { waitNextTask, textToDomToParent } from '../../../utils/js/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_TEXTFIELD = 'vwc-textfield';

describe.only('vwc-textfield', () => {
	let addedElements = [];

	afterEach(() => {
		while (addedElements.length) {
			addedElements.pop().remove();
		}
	});

	it('should be defined as a custom element', async () => {
		expect(Boolean(customElements.get(VWC_TEXTFIELD))).to.equal(true);
	});

	it('should have internal contents', async () => {
		await customElements.whenDefined('vwc-textfield');
		addedElements = textToDomToParent('<vwc-textfield id="textfield-a"></vwc-textfield>');
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe(`form association`, function() {

		it(`should attach to closest form`, function() {
			const fieldValue = Math.random().toString();
			const fieldName = 'test-field';
			const addedElements = textToDomToParent(`<form onsubmit="return false" name="testForm" id="testForm"><${VWC_TEXTFIELD} name="${fieldName}" value="${fieldValue}">Button Text</${VWC_TEXTFIELD}></form>`);
			const formElement = addedElements[0];
			const actualElement = formElement.firstChild;

			formElement.addEventListener('submit', () => {
				const formData = new FormData(formElement);
				for (let pair of formData.entries()) {
					expect(pair[0]).to.equal(fieldName);
					expect(pair[1]).to.equal(fieldValue);
				}
			});

			formElement.requestSubmit();
		});
	});
});
