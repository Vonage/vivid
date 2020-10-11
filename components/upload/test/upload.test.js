import '@vonage/vwc-upload';
import {
	waitNextTask,
	textToDomToParent,
	randomAlpha,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_COMPONENT = 'vwc-upload';

describe('upload', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_COMPONENT, 'vwc-upload element is not defined')
		);
	});

	it('should have the expected internal contents', async () => {
		addedElements = textToDomToParent(`<${VWC_COMPONENT}></${VWC_COMPONENT}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('form association', () => {
		it('should have an associated form as a read-only property', async () => {
			addedElements = textToDomToParent(
				`<form><${VWC_COMPONENT}></${VWC_COMPONENT}></form>`
			);
			const form = addedElements[0];
			const upload = form.querySelector(VWC_COMPONENT);

			await waitNextTask();
			expect(upload).exist;
			expect(upload.form).equal(form);
			upload.form = null;
			expect(upload.form).equal(form);
		});

		it('should be associated with the wrapping form', async () => {
			const uploadName = randomAlpha();
			addedElements = textToDomToParent(
				`<form><${VWC_COMPONENT} name="${uploadName}"></${VWC_COMPONENT}></form>`
			);
			const form = addedElements[0];

			await waitNextTask();

			return new Promise((resolve) => {
				form.addEventListener('submit', (e) => {
					e.preventDefault();
					expect(e.target).equal(form);
					expect(new FormData(e.target).get(uploadName)).exist;
					resolve();
				});
				form.requestSubmit();
			});
		});

		it('should re-associate itself upon moving in the DOM', async () => {
			const uploadName = randomAlpha();
			addedElements = textToDomToParent(`
				<form><${VWC_COMPONENT} name="${uploadName}"></${VWC_COMPONENT}></form>
				<form></form>
			`);
			const formA = addedElements[0];
			const formB = addedElements[1];
			const upload = formA.querySelector(VWC_COMPONENT);

			await waitNextTask();

			expect(upload.form).equal(formA);
			formB.appendChild(upload);

			expect(upload.form).equal(formB);

			return new Promise((resolve) => {
				formB.addEventListener('submit', (e) => {
					e.preventDefault();
					expect(e.target).equal(formB);
					expect(new FormData(e.target).get(uploadName)).exist;
					resolve();
				});
				formB.requestSubmit();
			});
		});

		it('should re-associate itself upon change of the "form" attribute', () => {
			const formAId = randomAlpha();
			const formBId = randomAlpha();
			const uploadName = randomAlpha();
			addedElements = textToDomToParent(`
				<form id="${formAId}"></form>
				<form id="${formBId}"></form>
				<${VWC_COMPONENT} name="${uploadName}"></${VWC_COMPONENT}>
			`);
			const formA = addedElements[0];
			const formB = addedElements[1];
			const upload = addedElements[2];

			expect(upload.form).null;

			upload.setAttribute('form', formAId);
			expect(upload.form).equal(formA);

			upload.setAttribute('form', formBId);
			expect(upload.form).equal(formB);
		});
	});
});
