import '../vwc-badge-combined.js';
import '@vonage/vwc-badge/vwc-badge.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { assertShapeStyles } from './badge-utils.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_BADGE_COMBINED = 'vwc-badge-combined';

describe('badge-combined', () => {
	const addElement = isolatedElementsCreation();

	it('vwc-badge-combined is defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				VWC_BADGE_COMBINED,
				'vwc-badge-combined element is not defined'
			)
		);
	});

	it('should internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${VWC_BADGE_COMBINED}>
					<vwc-badge>I'm a badge</badge>
				</${VWC_BADGE_COMBINED}>
			`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('shape', () => {
		let actualElement, badgeLeftElement, badgeRightElement;
		beforeEach(async () => {
			const addedElements = addElement(
				textToDomToParent(`
				<${VWC_BADGE_COMBINED}>
					<vwc-badge>I'm a badge</vwc-badge>
					<vwc-badge>I'm a badge</vwc-badge>
				</${VWC_BADGE_COMBINED}>
			`)
			);
			await waitNextTask();
			actualElement = addedElements[0];

			const badgeElements = actualElement._getBadges();
			badgeLeftElement = badgeElements[0];
			badgeRightElement = badgeElements[1];
		});

		it('should have rounded shape by default', async () => {
			assertShapeStyles(badgeLeftElement, 'rounded', 'left');
			assertShapeStyles(badgeRightElement, 'rounded', 'right');
		});

		it('should have rounded shape when shape set to rounded', async () => {
			actualElement.shape = 'rounded';
			await waitNextTask();
			assertShapeStyles(badgeLeftElement, 'rounded', 'left');
			assertShapeStyles(badgeRightElement, 'rounded', 'right');
		});

		it('should have pill shape when shape set to pill', async () => {
			actualElement.shape = 'pill';
			await waitNextTask();
			assertShapeStyles(badgeLeftElement, 'pill', 'left');
			assertShapeStyles(badgeRightElement, 'pill', 'right');
		});
	});

	describe('slotted badge prop management', () => {
		let addedElements, actualElement, badgeElement;
		beforeEach(async () => {
			addedElements = addElement(
				textToDomToParent(`
				<${VWC_BADGE_COMBINED}>
					<vwc-badge>I'm a badge</vwc-badge>
				</${VWC_BADGE_COMBINED}>
			`)
			);
			await waitNextTask();
			actualElement = addedElements[0];
			badgeElement = actualElement.shadowRoot
				.querySelector('slot')
				.assignedNodes()[1];
		});

		it('should set connotation prop', async () => {
			actualElement.connotation = 'cta';
			await waitNextTask();
			expect(badgeElement.connotation).to.equal('cta');
		});

		it('should set dense prop', async () => {
			actualElement.dense = true;
			await waitNextTask();
			expect(badgeElement.dense).to.equal(true);
		});

		it('should set enlarged prop', async () => {
			actualElement.enlarged = true;
			await waitNextTask();
			expect(badgeElement.enlarged).to.equal(true);
		});

		it('should set disabled prop', async () => {
			actualElement.disabled = true;
			await waitNextTask();
			expect(badgeElement.disabled).to.equal(true);
		});
	});
});
