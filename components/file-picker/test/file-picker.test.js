import '@vonage/vwc-file-picker';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	waitNextTask,
	textToDomToParent,
	randomAlpha,
	isSafari,
} from '../../../test/test-helpers.js';
import {
	getInput,
	simulateFilesSelect,
	simulateFilesDrop,
} from './file-picker-utils.test.js';

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

	it('should have the expected internal contents', async () => {
		addedElements = textToDomToParent(`<${VWC_COMPONENT}></${VWC_COMPONENT}>`);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('form association', () => {
		it('should have an associated form as a read-only property', async () => {
			addedElements = textToDomToParent(
				`<form><${VWC_COMPONENT}><input type="file"/></${VWC_COMPONENT}></form>`
			);
			const form = addedElements[0];
			const filePicker = form.querySelector(VWC_COMPONENT);

			await waitNextTask();
			expect(filePicker).exist;
			expect(filePicker.firstElementChild.form).equal(form);
		});

		it('should be associated with the wrapping form', async () => {
			const filePickerName = randomAlpha();
			addedElements = textToDomToParent(`
				<form>
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
					<button></button>
				</form>
			`);
			await waitNextTask();

			const form = addedElements[0];
			const filePicker = form.querySelector(VWC_COMPONENT);
			const internalInput = getInput(filePicker);
			const filesTotal = 3;

			expect(internalInput).exist;
			if (!isSafari()) {
				await simulateFilesSelect(filePicker, filesTotal);
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
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
					<button></button>
				</form>
				<form><button></button></form>
			`);
			await waitNextTask();

			const formA = addedElements[0];
			const formB = addedElements[1];
			const filePicker = formA.querySelector(VWC_COMPONENT);
			const internalInput = getInput(filePicker);

			expect(internalInput).exist;
			expect(internalInput.form).equal(formA);

			formB.appendChild(filePicker);
			expect(internalInput.form).equal(formB);

			const filesTotal = 3;
			if (!isSafari()) {
				await simulateFilesDrop(filePicker, filesTotal);
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
				<${VWC_COMPONENT}><input type="file" name="${filePickerName}"/></${VWC_COMPONENT}>
			`);
			const formA = addedElements[0];
			const formB = addedElements[1];
			const filePicker = addedElements[2];
			const internalInput = getInput(filePicker);

			expect(internalInput.form).null;

			internalInput.setAttribute('form', formAId);
			expect(internalInput.form).equal(formA);

			internalInput.setAttribute('form', formBId);
			expect(internalInput.form).equal(formB);
		});
	});
});
