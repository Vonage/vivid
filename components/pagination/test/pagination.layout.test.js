import { COMPONENT_NAME } from '@vonage/vwc-pagination';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

describe('pagination layout', () => {
	let addElement = isolatedElementsCreation();

	//	total changes, selected index constant (0)
	const selectedConstantMovingTotal = 0;
	for (let i = 0; i < 6; i++) {
		it(`has correct pages layout for total of ${i} (selected index 0)`, async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="${i}" selected-index="${selectedConstantMovingTotal}"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.shadowRoot.innerHTML).to.equalSnapshot();
		});
	}

	//	total changes, selected index constant (last, total - 1)
	for (let i = 0; i < 6; i++) {
		it(`has correct pages layout for total of ${i} (selected index ${i - 1})`, async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="${i}" selected-index="${i - 1}"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.shadowRoot.innerHTML).to.equalSnapshot();
		});
	}

	//	total constant (10), selected index changes
	const totalConstMovingSelected = 10;
	for (let i = 0; i < 10; i++) {
		it(`has correct pages layout for total of ${totalConstMovingSelected} (selected index ${i})`, async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="${totalConstMovingSelected}" selected-index="${i}"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.shadowRoot.innerHTML).to.equalSnapshot();
		});
	}
});
