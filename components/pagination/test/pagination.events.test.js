import { COMPONENT_NAME } from '@vonage/vwc-pagination';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';

describe('pagination events', () => {
	let addElement = isolatedElementsCreation();

	it('should not fire on init', async () => {
		const [pagination] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
			)
		);
		const events = getEventsCollector(pagination);
		await waitNextTask();

		expect(events.length).equal(0);
	});

	describe('triggered by change of selectedIndex', () => {
		it('should fire on regular change', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="5" selected-index="2"></${COMPONENT_NAME}>`
				)
			);
			const events = getEventsCollector(pagination);
			await waitNextTask();

			pagination.selectedIndex = 3;
			await waitNextTask();

			expect(events.length).equal(1);
			expect(events[0].detail).exist;
			expect(events[0].detail.selectedIndex).equal(3);
			expect(events[0].detail.total).equal(5);
		});

		it('should not fire on re-assign', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="5" selected-index="2"></${COMPONENT_NAME}>`
				)
			);
			const events = getEventsCollector(pagination);
			await waitNextTask();

			pagination.selectedIndex = 2;
			await waitNextTask();

			expect(events.length).equal(0);
		});
	});

	describe('triggered by change of total', () => {
		it('should not fire on regular change', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="5"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			const events = getEventsCollector(pagination);

			pagination.total = 7;
			await waitNextTask();

			expect(events.length).equal(0);
		});

		it('should fire on change from none to something', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			const events = getEventsCollector(pagination);
			pagination.total = 7;
			await waitNextTask();

			expect(events.length).equal(1);
			expect(events[0].detail).exist;
			expect(events[0].detail.selectedIndex).equal(0);
			expect(events[0].detail.total).equal(7);
		});

		it('should fire when total lowered below selectedIndex', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="4" selected-index="3"></${COMPONENT_NAME}>`
				)
			);
			const events = getEventsCollector(pagination);
			pagination.total = 3;
			await waitNextTask();

			expect(events.length).equal(1);
			expect(events[0].detail).exist;
			expect(events[0].detail.selectedIndex).equal(2);
			expect(events[0].detail.total).equal(3);
		});
	});
});

function getEventsCollector(pagination) {
	const result = [];
	pagination.addEventListener('change', e => result.push(e));
	return result;
}
