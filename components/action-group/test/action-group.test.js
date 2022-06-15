import '../vwc-action-group.js';
import {
	isolatedElementsCreation, textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {VWCActionGroup} from '../vwc-action-group.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-action-group';

describe ('Action-Group', () => {
	let addElement = isolatedElementsCreation();
	let element;

	beforeEach(async function () {
		[element] = (
			textToDomToParent(`<${COMPONENT_NAME}>Content</${COMPONENT_NAME}>`)
		);
		await element.updateComplete;
	});

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		await element.updateComplete;
		expect(element.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('basic', () => {
		it('should be initialized as a vwc-action-group', async () => {
			expect(element instanceof VWCActionGroup).to.equal(true);
		});
	});

	describe('layout', function () {
		it('should set the outline class on the base', async function () {
			const control = element.shadowRoot?.querySelector('.vwc-action-group');
			const layout = 'outlined';
			element.layout = layout;
			await element.updateComplete;

			expect(control?.classList.contains(`layout-${layout}`))
				.to.equal(true);
		});
	});

	describe('shape', function () {
		it('should set the shape class on the base', async function () {
			const control = element.shadowRoot?.querySelector('.vwc-action-group');
			const shape = 'pill';
			element.shape = shape;
			await element.updateComplete;

			expect(control?.classList.contains(`shape-${shape}`))
				.to.equal(true);
		});
	});
});
