import '../vwc-calendar.js';
import '../vwc-calendar-event.js';
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

	it('should set correct size proportions', async () => {
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

	const extractDaysTextFromHeaders = columnHeaders => Array.from(columnHeaders.querySelectorAll('h2'))
		.map(h2 => Array.from(h2.children)
			.reduce((acc, curr) => acc.textContent.trim() + curr.textContent.trim()));

	describe('API', () => {
		it('should reflect weekdays as set by property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.datetime = '2021-01-01';
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const columnHeaders = shadowRoot.querySelector('.column-headers');

			const reflectedDates = extractDaysTextFromHeaders(columnHeaders);

			const expectedDates = ['27Sun', '28Mon', '29Tue', '30Wed', '31Thu', '01Fri', '02Sat'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});

		it('should reflect weekdays as set by attribute', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.setAttribute('datetime', '2021-01-01');
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const columnHeaders = shadowRoot.querySelector('.column-headers');

			const reflectedDates = extractDaysTextFromHeaders(columnHeaders);

			const expectedDates = ['27Sun', '28Mon', '29Tue', '30Wed', '31Thu', '01Fri', '02Sat'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});

		it('should reflect weekdays and hours as set by locales', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.setAttribute('datetime', '2021-01-01');
			actualElement.setAttribute('locales', 'zh-cn');
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const columnHeaders = shadowRoot.querySelector('.column-headers');

			const reflectedDates = extractDaysTextFromHeaders(columnHeaders);

			const expectedDates = ['27日周日', '28日周一', '29日周二', '30日周三', '31日周四', '01日周五', '02日周六'];

			expect(reflectedDates.join()).to.equal(expectedDates.join());
		});

		it('should delegate attributes to custom properties', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${eventComponent}
					color="rgb(43, 158, 250)"
					start="18.5"
					duration="7.5"
					overlap-count="1">
				</${eventComponent}>`)
			);

			await actualElement.updateComplete;
			const section = actualElement.shadowRoot.querySelector('section');

			const getValue = prop => getComputedStyle(section).getPropertyValue(`--vvd-calendar-event--${prop}`);

			expect(getValue('primary-color'), 'wrong color').to.equal('rgb(43, 158, 250)');
			expect(getValue('start'), 'wrong start').to.equal('18.5');
			expect(getValue('duration'), 'wrong duration').to.equal('7.5');
			expect(getValue('overlap-count'), 'wrong indentation').to.equal('1');
		});

		it('should set correct styles of start & duration', async () => {
			const eventComponent = 'vwc-calendar-event';
			const start = 4;
			const duration = 5;
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-3" start="${start}" duration="${duration}"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const column = shadowRoot.querySelector('[role=gridcell]:nth-child(4)');
			const event = actualElement.querySelector(eventComponent);
			const section = event.shadowRoot.querySelector('section');

			const getHoursCalculatedBlockSize = (hours) => {
				const hourInPx = (column.offsetHeight - 23 /* 23 grid gaps */) / 24/* total hours in calendar */;
				return hourInPx * hours + (hours - 1 /* duration less 1 grid gap */);
			};

			expect(getHoursCalculatedBlockSize(duration), 'wrong duration').to.equal(section.offsetHeight);

			const { y: columnY } = column.getBoundingClientRect();
			const { y: sectionY } = section.getBoundingClientRect();

			expect(sectionY - columnY, 'wrong start position').to.equal(getHoursCalculatedBlockSize(start) + 1);
		});

		it('should not exceed column block size', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-3" start="6" duration="25"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const column = shadowRoot.querySelector('[role=gridcell]:nth-child(4)');
			const event = actualElement.querySelector(eventComponent);
			const section = event.shadowRoot.querySelector('section');

			const hour = (column.offsetHeight - 23 /* 23 grid gaps */) / 24;
			const maxDuration = 18;
			expect(hour * maxDuration + (maxDuration - 1) /* hours less 1 grid gap */).to.equal(section.offsetHeight);
		});

		it('should set event in correct column slot', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-3"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const slot = shadowRoot.querySelector('[role=gridcell]:nth-child(4) > slot');
			const [assignedNode] = Array.from(slot.assignedNodes());

			expect(assignedNode).to.equal(actualElement.querySelector(eventComponent));
		});
	});
});
