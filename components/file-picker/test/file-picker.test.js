import '@vonage/vwc-file-picker';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
	randomAlpha,
	isSafari,
	isFirefox,
} from '../../../test/test-helpers.js';
import {
	getInput,
	simulateFilesSelect,
	simulateFilesDrag,
	simulateFilesDrop,
	simulateFilesDragEnd,
	simulateButtonSlotClick,
	simulateInputKeyTrigger,
} from './file-picker-utils.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_COMPONENT = 'vwc-file-picker';

describe('file picker', () => {
	let addElements = isolatedElementsCreation();

	it('is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_COMPONENT, 'vwc-file-picker element is not defined')
		);
	});

	it('should have the expected internal contents', async () => {
		const [fp] = addElements(textToDomToParent(`<${VWC_COMPONENT}></${VWC_COMPONENT}>`));
		await waitNextTask();
		expect(fp.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have the expected internal contents (with label)', async () => {
		const [fp] = addElements(textToDomToParent(`<${VWC_COMPONENT} label="Label"></${VWC_COMPONENT}>`));
		await waitNextTask();
		expect(fp.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('form association', () => {
		it('should have an associated form as a read-only property', async () => {
			const [form] = addElements(textToDomToParent(
				`<form><${VWC_COMPONENT}><input type="file"/></${VWC_COMPONENT}></form>`
			));
			const filePicker = form.querySelector(VWC_COMPONENT);

			await waitNextTask();
			expect(filePicker).exist;
			expect(filePicker.firstElementChild.form).equal(form);
		});

		it('should be associated with the wrapping form', async () => {
			const filePickerName = randomAlpha();
			const [form] = addElements(textToDomToParent(`
				<form>
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
					<button></button>
				</form>
			`));
			await waitNextTask();

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
			const [formA, formB] = addElements(textToDomToParent(`
				<form>
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
					<button></button>
				</form>
				<form><button></button></form>
			`));
			await waitNextTask();

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
			const [formA, formB, filePicker] = addElements(textToDomToParent(`
				<form id="${formAId}"></form>
				<form id="${formBId}"></form>
				<${VWC_COMPONENT}><input type="file" name="${filePickerName}"/></${VWC_COMPONENT}>
			`));
			const internalInput = getInput(filePicker);

			expect(internalInput.form).null;

			internalInput.setAttribute('form', formAId);
			expect(internalInput.form).equal(formA);

			internalInput.setAttribute('form', formBId);
			expect(internalInput.form).equal(formB);
		});
	});

	describe('validation', () => {
		it('should set to invalid state when setCustomValidity with text', async () => {
			const errorText = 'error';
			const [filePicker] = addElements(textToDomToParent(
				`<${VWC_COMPONENT}><input type="file"/></${VWC_COMPONENT}>`
			));

			await setValidityAssertError(filePicker, errorText);
		});

		it('should un-set invalid state when setCustomValidity with empty', async () => {
			const errorText = 'error';
			const [filePicker] = addElements(textToDomToParent(
				`<${VWC_COMPONENT}><input type="file"/></${VWC_COMPONENT}>`
			));

			await setValidityAssertError(filePicker, errorText);
			await setValidityAssertError(filePicker, '');
		});

		it('should un-set invalid state when new input triggered by click', async () => {
			if (isFirefox()) {
				return;
			}
			const errorText = 'error';
			const [filePicker] = addElements(textToDomToParent(
				`<${VWC_COMPONENT}><input slot="button" type="file"/></${VWC_COMPONENT}>`
			));

			await setValidityAssertError(filePicker, errorText);
			await simulateButtonSlotClick(filePicker);
			const helper = filePicker.shadowRoot.querySelector('#helper');
			expect(helper).not.exist;
		});

		it('should un-set invalid state when new input triggered by keypress (Space)', async () => {
			if (isFirefox()) {
				return;
			}
			const errorText = 'error';
			const [filePicker] = addElements(textToDomToParent(
				`<${VWC_COMPONENT}><input slot="button" type="file"/></${VWC_COMPONENT}>`
			));

			await setValidityAssertError(filePicker, errorText);
			await simulateInputKeyTrigger(filePicker, 'Space');
			const helper = filePicker.shadowRoot.querySelector('#helper');
			expect(helper).not.exist;
		});

		it('should reject drop of non-file items', async () => {
			if (isSafari()) {
				return;
			}

			const filePickerName = randomAlpha();
			const [filePicker] = addElements(textToDomToParent(`
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
			`));
			await waitNextTask();

			const itemsTotal = 3;
			const nonFileOne = true;
			await simulateFilesDrop(filePicker, itemsTotal, nonFileOne);

			const helper = filePicker.shadowRoot.querySelector('#helper');
			expect(helper).exist;
			expect(helper.textContent).equal('only file/s drop allowed');
			expect(filePicker.filesCount).equal(0);
		});

		it('should allow drag of file items', async () => {
			if (isSafari()) {
				return;
			}

			const filePickerName = randomAlpha();
			const [filePicker] = addElements(textToDomToParent(`
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
			`));
			await waitNextTask();

			const itemsTotal = 3;
			await simulateFilesDrag(filePicker, itemsTotal);

			const wrapper = filePicker.shadowRoot.querySelector('.wrapper');
			expect(wrapper).exist;
			expect(wrapper.classList.contains('drag-over')).true;
		});

		it('should reflect drag of invalid items', async () => {
			if (isSafari()) {
				return;
			}

			const filePickerName = randomAlpha();
			const [filePicker] = addElements(textToDomToParent(`
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
			`));
			await waitNextTask();

			const itemsTotal = 3;
			const nonFileOne = true;
			await simulateFilesDrag(filePicker, itemsTotal, nonFileOne);

			const wrapper = filePicker.shadowRoot.querySelector('.wrapper');
			expect(wrapper).exist;
			expect(wrapper.classList.contains('drag-over')).true;
			expect(wrapper.classList.contains('drag-invalid')).true;
		});

		it('should clean all drag hints upon leave', async () => {
			if (isSafari()) {
				return;
			}

			const filePickerName = randomAlpha();
			const [filePicker] = addElements(textToDomToParent(`
					<${VWC_COMPONENT}><input type="file" name="${filePickerName}" multiple/></${VWC_COMPONENT}>
			`));
			await waitNextTask();

			const itemsTotal = 3;
			const nonFileOne = true;
			await simulateFilesDrag(filePicker, itemsTotal, nonFileOne);

			const wrapper = filePicker.shadowRoot.querySelector('.wrapper');
			expect(wrapper.classList.contains('drag-over')).true;
			expect(wrapper.classList.contains('drag-invalid')).true;

			await simulateFilesDragEnd(filePicker);
			expect(wrapper.classList.contains('drag-over')).false;
			expect(wrapper.classList.contains('drag-invalid')).false;
		});
	});
});

async function setValidityAssertError(filePicker, validationMessage) {
	filePicker.setCustomValidity(validationMessage);
	await waitNextTask();
	const helper = filePicker.shadowRoot.querySelector('#helper');
	if (validationMessage) {
		expect(helper).exist;
		expect(helper.textContent).equal(validationMessage);
	} else {
		expect(helper).not.exist;
	}
}
