import { COMPONENT_NAME } from '@vonage/vwc-pagination';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { isolatedElementsCreation } from '../../../test/test-helpers';

describe('pagination controls', () => {
	let addElement = isolatedElementsCreation();

	describe('pointer controls', () => {
		it('should move to the next page when clicked next', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="10" selected-index="3"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.selectedIndex).equal(3);

			await hitNext(pagination);
			expect(pagination.selectedIndex).equal(4);
		});

		it('should move to the prev page when clicked prev', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="10" selected-index="3"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.selectedIndex).equal(3);

			await hitPrev(pagination);
			expect(pagination.selectedIndex).equal(2);
		});

		it('should move to the specific page when clicked specific page', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="10" selected-index="3"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.selectedIndex).equal(3);

			await hitPage(pagination, 4);
			expect(pagination.selectedIndex).equal(4);
		});

		it('should do nothing when empty pages', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.selectedIndex).equal(-1);

			await hitNext(pagination);
			expect(pagination.selectedIndex).equal(-1);

			await hitPrev(pagination);
			expect(pagination.selectedIndex).equal(-1);
		});
	});
});

async function hitNext(pagination) {
	pagination.shadowRoot.querySelector('.next').dispatchEvent(
		new PointerEvent('pointerup', { bubbles: true })
	);
	await waitNextTask();
}

async function hitPrev(pagination) {
	pagination.shadowRoot.querySelector('.prev').dispatchEvent(
		new PointerEvent('pointerup', { bubbles: true })
	);
	await waitNextTask();
}

async function hitPage(pagination, pageIndex) {
	pagination.shadowRoot.querySelector(`[data-index="${pageIndex}"]`).dispatchEvent(
		new PointerEvent('pointerup', { bubbles: true })
	);
	await waitNextTask();
}
