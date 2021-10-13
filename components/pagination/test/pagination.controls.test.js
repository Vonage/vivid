import { COMPONENT_NAME } from '@vonage/vwc-pagination';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';

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

			await hitControl(pagination, '.next');
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

			await hitControl(pagination, '.prev');
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

			await hitControl(pagination, '.next');
			expect(pagination.selectedIndex).equal(-1);

			await hitControl(pagination, '.prev');
			expect(pagination.selectedIndex).equal(-1);
		});
	});
});

async function hitControl(pagination, selector) {
	const target = pagination.shadowRoot.querySelector(`${selector} .control`);
	for (const event of ['pointerdown', 'pointerup']) {
		target.dispatchEvent(new PointerEvent(event, { bubbles: true }));
	}
	await waitNextTask();
}

async function hitPage(pagination, pageIndex) {
	const target = pagination.shadowRoot.querySelector(`[data-index="${pageIndex}"]`);
	for (const event of ['pointerdown', 'pointerup']) {
		target.dispatchEvent(new PointerEvent(event, { bubbles: true }));
	}
	await waitNextTask();
}
