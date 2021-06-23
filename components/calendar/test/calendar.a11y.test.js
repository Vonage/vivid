import '../vwc-calendar.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-calendar';

describe('calendar a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should pass accessibility test', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		await expect(actualElement).shadowDom.to.be.accessible();
	});

	describe('keyboard events', () => {
		it('should init focus on arrow down', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const grid = shadowRoot.querySelector('[role="grid"i]');

			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
			grid.dispatchEvent(event);

			const defaultFocusElement = grid.querySelector('[role="columnheader"i]');

			expect(shadowRoot.activeElement).to.equal(defaultFocusElement);
		});

		it('should focus to the right', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const grid = shadowRoot.querySelector('[role="grid"i]');

			grid.querySelector('[role="columnheader"i]:nth-child(3)').focus();

			const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
			grid.dispatchEvent(event);

			expect(shadowRoot.activeElement).to.equal(
				grid.querySelector('[role="columnheader"i]:nth-child(4)')
			);
		});

		it('should focus to down', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const grid = shadowRoot.querySelector('[role="grid"i]');

			grid.querySelector('[role="columnheader"i]:nth-child(3)').focus();

			const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
			grid.dispatchEvent(event);

			expect(shadowRoot.activeElement).to.equal(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
		});

		it('should move focus from calendar event to containing column', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-2" start="4" duration="5"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const grid = shadowRoot.querySelector('[role="grid"i]');

			actualElement.querySelector(eventComponent)
				.shadowRoot.querySelector('section')
				.focus();

			const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
			grid.dispatchEvent(event);

			expect(shadowRoot.activeElement).to.equal(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
		});
	});
});
