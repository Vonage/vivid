import '../vwc-calendar.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-calendar';

describe('calendar', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(customElements.get(COMPONENT_NAME));
	});

	it('should match internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		actualElement.datetime = '2021-01-01';
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should set cells in correct day column', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const { shadowRoot } = actualElement;
		const cells = shadowRoot.querySelectorAll('.calendar > [role="listitem"i]');

		const isCorrectColumns = Array.from(cells).every((cell, i) => getComputedStyle(cell)
			.getPropertyValue('--column') == ~~(i / 24) + 1);

		expect(isCorrectColumns).to.equal(true);
	});

	it('sets correct size proportions', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const { shadowRoot } = actualElement;

		const grid = shadowRoot.querySelector('.calendar-grid-presentation');
		const cells = shadowRoot.querySelectorAll('[role="gridcell"i]');
		const rowHeaders = shadowRoot.querySelector('.row-headers');
		const columnHeaders = shadowRoot.querySelector('.column-headers');

		const cellsStylesMatch = Array.from(cells).every(cell => getComputedStyle(cell).blockSize == getComputedStyle(grid).blockSize);
		const rowHeadersStylesMatch = getComputedStyle(rowHeaders).blockSize == getComputedStyle(grid).blockSize;
		const columnHeadersStylesMatch = getComputedStyle(columnHeaders).inlineSize == getComputedStyle(grid).inlineSize;

		expect(cellsStylesMatch).to.equal(true);
		expect(rowHeadersStylesMatch).to.equal(true);
		expect(columnHeadersStylesMatch).to.equal(true);
	});

	describe('API', () => {
		it('reflects weekdays as set by property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.datetime = '2021-01-01';
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const columnHeaders = shadowRoot.querySelector('.column-headers');

			const reflectedDates = Array.from(columnHeaders.querySelectorAll('h2'))
				.map(h2 => Array.from(h2.children)
					.reduce((acc, curr) => acc.textContent.trim() + curr.textContent.trim()));

			const expectedDates = ['27Sun', '28Mon', '29Tue', '30Wed', '31Thu', '01Fri', '02Sat'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});

		it('reflects weekdays as set by attribute', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.setAttribute('datetime', '2021-01-01');
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const columnHeaders = shadowRoot.querySelector('.column-headers');

			const reflectedDates = Array.from(columnHeaders.querySelectorAll('h2'))
				.map(h2 => Array.from(h2.children)
					.reduce((acc, curr) => acc.textContent.trim() + curr.textContent.trim()));

			const expectedDates = ['27Sun', '28Mon', '29Tue', '30Wed', '31Thu', '01Fri', '02Sat'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});
	});
});
