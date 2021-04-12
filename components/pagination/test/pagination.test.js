import { COMPONENT_NAME } from '@vonage/vwc-pagination';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

describe('pagination', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-pagination is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-pagination element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [pagination] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(pagination.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('API - total', () => {
		it('should have total set to 0 initially (property, attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.total).equal(0);
			expect(pagination.getAttribute('total')).equal('0');
		});

		it('should have total set to 8 when set to 8 (property)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			pagination.total = 8;
			await waitNextTask();

			expect(pagination.total).equal(8);
			expect(pagination.getAttribute('total')).equal('8');
		});

		it('should have total set to 4 when set to 4 (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="4"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();

			expect(pagination.total).equal(4);
			expect(pagination.getAttribute('total')).equal('4');
		});

		it('should have total set to 0 if set to NaN (property)', async () => {
			const [pagination] = (
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			pagination.total = 'non-sense';
			await waitNextTask();

			expect(pagination.total).equal(0);
			expect(pagination.getAttribute('total')).equal('0');
		});

		it('should have total set to 0 if set to NaN (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();

			expect(pagination.total).equal(0);
			expect(pagination.getAttribute('total')).equal('0');
		});

		it('should have total set to 0 if set to negative (property)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			pagination.total = -4;
			await waitNextTask();

			expect(pagination.total).equal(0);
			expect(pagination.getAttribute('total')).equal('0');
		});

		it('should have total set to 0 if set to negative (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			pagination.setAttribute('total', '-4');
			await waitNextTask();

			expect(pagination.total).equal(0);
			expect(pagination.getAttribute('total')).equal('0');
		});
	});

	describe('API - selectedIndex', () => {
		it('should have selectedIndex set to -1 initially (property, attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(pagination.selectedIndex).equal(-1);
			expect(pagination.getAttribute('selected-index')).equal('-1');
		});

		it('should have selectedIndex set to selectedIndex when set to positive (property)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="7"></${COMPONENT_NAME}>`
				)
			);
			pagination.selectedIndex = 4;
			await waitNextTask();

			expect(pagination.selectedIndex).equal(4);
			expect(pagination.getAttribute('selected-index')).equal('4');
		});

		it('should have selectedIndex set to selectedIndex when set to positive (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="4" selected-index="3"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();

			expect(pagination.selectedIndex).equal(3);
			expect(pagination.getAttribute('selected-index')).equal('3');
		});

		it('should have selectedIndex set to 0 if set to NaN (property)', async () => {
			const [pagination] = (
				textToDomToParent(
					`<${COMPONENT_NAME} total="2"></${COMPONENT_NAME}>`
				)
			);
			pagination.selectedIndex = 'non-sense';
			await waitNextTask();

			expect(pagination.selectedIndex).equal(0);
			expect(pagination.getAttribute('selected-index')).equal('0');
		});

		it('should have selectedIndex set to 0 if set to NaN (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="3" selected-index="dfsf"></${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();

			expect(pagination.selectedIndex).equal(0);
			expect(pagination.getAttribute('selected-index')).equal('0');
		});

		it('should have selectedIndex set to 0 if set to negative (property)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="3"></${COMPONENT_NAME}>`
				)
			);
			pagination.selectedIndex = -4;
			await waitNextTask();

			expect(pagination.selectedIndex).equal(0);
			expect(pagination.getAttribute('selected-index')).equal('0');
		});

		it('should have selectedIndex set to 0 if set to negative (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="3"></${COMPONENT_NAME}>`
				)
			);
			pagination.setAttribute('selected-index', '-1');
			await waitNextTask();

			expect(pagination.selectedIndex).equal(0);
			expect(pagination.getAttribute('selected-index')).equal('0');
		});

		it('should have selectedIndex set to (total - 1) if set above total (property)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="3"></${COMPONENT_NAME}>`
				)
			);
			pagination.selectedIndex = 4;
			await waitNextTask();

			expect(pagination.selectedIndex).equal(2);
			expect(pagination.getAttribute('selected-index')).equal('2');
		});

		it('should have selectedIndex set to (total - 1) if set above total (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} total="3"></${COMPONENT_NAME}>`
				)
			);
			pagination.setAttribute('selected-index', '3');
			await waitNextTask();

			expect(pagination.selectedIndex).equal(2);
			expect(pagination.getAttribute('selected-index')).equal('2');
		});

		it('should have selectedIndex set to -1 when set to non-sense and total=0 (property)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			pagination.selectedIndex = 'non-sense';
			await waitNextTask();

			expect(pagination.selectedIndex).equal(-1);
			expect(pagination.getAttribute('selected-index')).equal('-1');
		});

		it('should have selectedIndex set to -1 if set to negative and total=0 (attribute)', async () => {
			const [pagination] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
				)
			);
			pagination.setAttribute('selected-index', '-2');
			await waitNextTask();

			expect(pagination.selectedIndex).equal(-1);
			expect(pagination.getAttribute('selected-index')).equal('-1');
		});
	});
});
