import '@vonage/vwc-file-picker';
import {
	waitNextTask,
	textToDomToParent,
	randomAlpha,
	isSafari,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_COMPONENT = 'vwc-file-picker';

describe('file picker', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_COMPONENT, 'vwc-file-picker element is not defined')
		);
	});

	xit('should have the expected internal contents', async () => {
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
			const filePicker = form.querySelector(VWC_COMPONENT);

			await waitNextTask();
			expect(filePicker).exist;
			expect(filePicker.form).equal(form);
			filePicker.form = null;
			expect(filePicker.form).equal(form);
		});

		it('should be associated with the wrapping form', async () => {
			const filePickerName = randomAlpha();
			addedElements = textToDomToParent(`
				<form>
					<${VWC_COMPONENT} name="${filePickerName}" multiple></${VWC_COMPONENT}>
					<button></button>
				</form>
			`);
			const form = addedElements[0];
			const filePicker = form.querySelector(VWC_COMPONENT);
			const internalInput = filePicker.querySelector('[type="file"]');
			const filesTotal = 3;

			expect(internalInput).exist;
			if (!isSafari()) {
				mockInputFiles(internalInput, filesTotal);
			}

			return new Promise((resolve) => {
				form.addEventListener('submit', (e) => {
					e.preventDefault();
					expect(e.target).equal(form);
					const d = new FormData(e.target).getAll(filePickerName);
					expect(d).exist;
					if (!isSafari()) {
						expect(d.length).equal(filesTotal);
					}
					resolve();
				});
				form.querySelector('button').click();
			});
		});

		it('should re-associate itself upon moving in the DOM', async () => {
			const filePickerName = randomAlpha();
			addedElements = textToDomToParent(`
				<form>
					<${VWC_COMPONENT} name="${filePickerName}"></${VWC_COMPONENT}>
					<button></button>
				</form>
				<form><button></button></form>
			`);
			const formA = addedElements[0];
			const formB = addedElements[1];
			const filePicker = formA.querySelector(VWC_COMPONENT);

			expect(filePicker.form).equal(formA);
			formB.appendChild(filePicker);

			expect(filePicker.form).equal(formB);

			const filesTotal = 3;
			const internalInput = filePicker.querySelector('[type="file"]');

			expect(internalInput).exist;
			if (!isSafari()) {
				mockInputFiles(internalInput, filesTotal);
			}

			return new Promise((resolve) => {
				formB.addEventListener('submit', (e) => {
					e.preventDefault();
					expect(e.target).equal(formB);
					const d = new FormData(e.target).getAll(filePickerName);
					expect(d).exist;
					if (!isSafari()) {
						expect(d.length).equal(filesTotal);
					}
					resolve();
				});
				formB.querySelector('button').click();
			});
		});

		it('should re-associate itself upon change of the "form" attribute', () => {
			const formAId = randomAlpha();
			const formBId = randomAlpha();
			const filePickerName = randomAlpha();
			addedElements = textToDomToParent(`
				<form id="${formAId}"></form>
				<form id="${formBId}"></form>
				<${VWC_COMPONENT} name="${filePickerName}"></${VWC_COMPONENT}>
			`);
			const formA = addedElements[0];
			const formB = addedElements[1];
			const filePicker = addedElements[2];

			expect(filePicker.form).null;

			filePicker.setAttribute('form', formAId);
			expect(filePicker.form).equal(formA);

			filePicker.setAttribute('form', formBId);
			expect(filePicker.form).equal(formB);
		});
	});
});

function mockInputFiles(input, total) {
	const dt = new DataTransfer();
	for (let i = 0; i < total; i++) {
		dt.items.add(
			new File(['file content'], `file-${i}.png`, { type: 'image/png' })
		);
	}
	input.files = dt.files;
}
