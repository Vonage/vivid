import '../vwc-datepicker.js';
import '@vonage/vwc-textfield/vwc-textfield.js';
import {
	waitNextTask,
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

	// it('should have internal contents', async () => {
	// 	const [actualElement] = addElement(
	// 		textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
	// 	);
	// 	await actualElement.onReady;
	// 	expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	// });

	it('should have lit-flatpickr instance in DOM', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await actualElement.onReady;
		await waitNextTask();

		const datepicker = actualElement.shadowRoot.querySelector('.vvd-datepicker');
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
		await actualElement.onReady;
		await waitNextTask();

		actualElement.defaultDate = 'today';
		await waitNextTask();

		const input = actualElement.querySelector('.vivid-input-internal.flatpickr-input');
		expect(input.value).not.empty;
	});

	it('should have fixed menu position when fixedMenuPosition set', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME} fixedMenuPosition></${COMPONENT_NAME}>
			`)
		);
		await actualElement.onReady;
		await waitNextTask();

		const vwcMenu = actualElement.shadowRoot.querySelector('vwc-menu');
		const mwcMenuSurface = vwcMenu.shadowRoot.querySelector('mwc-menu-surface');
		const menuSurface = mwcMenuSurface.shadowRoot.querySelector('.mdc-menu-surface');

		assertComputedStyle(menuSurface, { position: 'fixed' });
	});

	describe('visibility', async () => {
		it('should have datepicker visible when input clicked', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME}>
						<vwc-textfield></vwc-textfield>
					</${COMPONENT_NAME}>
				`)
			);
			await actualElement.onReady;
			await waitNextTask();

			const vwcMenu = actualElement.shadowRoot.querySelector('vwc-menu');

			let datepicker = vwcMenu.querySelector('.vvd-datepicker');
			assertComputedStyle(datepicker, { display: 'none' });

			const input = actualElement.querySelector('.vivid-input-internal.flatpickr-input');
			input.click();
			await actualElement.onOpen;
			await waitNextTask();

			datepicker = vwcMenu.querySelector('.vvd-datepicker.open');
			assertComputedStyle(datepicker, { display: 'block' });
		});

		it('should have month picker when monthPicker set', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME} inline monthPicker></${COMPONENT_NAME}>
				`)
			);
			await actualElement.onReady;
			await waitNextTask();

			const months = actualElement.shadowRoot.querySelector('.vvd-datepicker-month-view .vvd-datepicker-months');
			assertComputedStyle(months, { display: 'block' });
		});

		it('should have custom range when mode set to range', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`
					<${COMPONENT_NAME} inline mode="range"></${COMPONENT_NAME}>
				`)
			);
			await actualElement.onReady;
			await waitNextTask();

			const range = actualElement.shadowRoot.querySelector('.vvd-datepicker-range');
			assertComputedStyle(range, { display: 'flex' });
		});
	});
});
