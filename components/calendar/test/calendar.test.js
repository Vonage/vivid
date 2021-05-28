import '../vwc-calendar.js';
import {
	waitNextTask,
	waitInterval,
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
		await waitInterval(100);
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

	describe('API', () => {
		it('should reflect weekdays as set by property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.datetime = '2021-01-01';
			await waitInterval(100);

			const { shadowRoot } = actualElement;
			const headline = shadowRoot.querySelector('.headline');

			const reflectedDates = Array.from(headline.children)
				.map(child => child.textContent.trim());

			const expectedDates = ['27 Sun', '28 Mon', '29 Tue', '30 Wed', '31 Thu', '01 Fri', '02 Sat'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});

		it('should reflect weekdays as set by attribute', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.setAttribute('datetime', '2021-01-01');
			await waitInterval(100);

			const { shadowRoot } = actualElement;
			const headline = shadowRoot.querySelector('.headline');

			const reflectedDates = Array.from(headline.children)
				.map(child => child.textContent.trim());

			const expectedDates = ['27 Sun', '28 Mon', '29 Tue', '30 Wed', '31 Thu', '01 Fri', '02 Sat'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});
	});
});
