import '../vwc-datepicker.js';
import '@vonage/vwc-textfield/vwc-textfield.js';
import {
	waitNextTask,
	waitInterval,
	textToDomToParent,
	assertComputedStyle
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-datepicker';

describe('datepicker', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-datepicker is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-datepicker element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	// tests may fail if waitInterval insufficient
	it('should have lit-flatpickr instance in DOM', async () => {
		addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitInterval(500);

		const datepicker = document.querySelector('.vvd-datepicker');
		const customHeader = datepicker.querySelector('.vvd-datepicker-header');
		const customMonths = datepicker.querySelector('.vvd-datepicker-months');
		const customFooter = datepicker.querySelector('.vvd-datepicker-footer');

		expect(datepicker).to.exist;
		expect(customHeader).to.exist;
		expect(customMonths).to.exist;
		expect(customFooter).to.exist;
	});
	
	it('should update input value when date selected', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<vwc-textfield></vwc-textfield>
				</${COMPONENT_NAME}>
			`)
		);
		await waitInterval(500);

		actualElement.defaultDate = 'today';
		await waitNextTask();

		const input = actualElement.querySelector('.vivid-input-internal.flatpickr-input');
		expect(input.value).not.empty;
	});

	it('should have fixed position when fixed set', async () => {
		addElement(
			textToDomToParent(`
				<${COMPONENT_NAME} fixed></${COMPONENT_NAME}>
			`)
		);
		await waitInterval(500);

		const datepicker = document.querySelector('.vvd-datepicker');
		assertComputedStyle(datepicker, { position: 'fixed' });
	});

	describe('visibility', () => {
		it('should have datepicker visible when input clicked', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME}>
						<vwc-textfield></vwc-textfield>
					</${COMPONENT_NAME}>
				`)
			);
			await waitInterval(500);

			let datepicker = document.querySelector('.vvd-datepicker');
			assertComputedStyle(datepicker, { display: 'none' });
			
			const input = actualElement.querySelector('.vivid-input-internal.flatpickr-input');
			input.click();
			await waitNextTask();

			datepicker = document.querySelector('.vvd-datepicker.open');
			assertComputedStyle(datepicker, { display: 'block' });
		});

		it('should have month picker when monthPicker set', async () => {
			addElement(
				textToDomToParent(`
					<${COMPONENT_NAME} inline monthPicker></${COMPONENT_NAME}>
				`)
			);
			await waitInterval(500);

			const months = document.querySelector('.vvd-datepicker-month-view .vvd-datepicker-months');
			assertComputedStyle(months, { display: 'block' });
		});

		it('should have custom range when mode set to range', async () => {
			addElement(
				textToDomToParent(`
					<${COMPONENT_NAME} inline mode="range"></${COMPONENT_NAME}>
				`)
			);
			await waitInterval(500);

			const range = document.querySelector('.vvd-datepicker-range');
			assertComputedStyle(range, { display: 'flex' });
		});
	});
});
