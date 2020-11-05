import '../vwc-badge.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_BADGE = 'vwc-badge';

describe('badge', () => {
	const addElement = isolatedElementsCreation();

	it('vwc-badge is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_BADGE, 'vwc-badge element is not defined')
		);
	});

	it('should internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('connotation', function () {
		it(`should sync badge class member 'connotation' and html attribute 'connotation'`, async function () {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
			);
			await waitNextTask();

			const syncMatchFn = (connotation) =>
				badge.connotation == connotation &&
				badge.getAttribute('connotation') == connotation;

			let connotationValue = 'cta';
			badge.connotation = connotationValue;
			await waitNextTask();
			const propertyChangesAffectsAttribute = syncMatchFn(connotationValue);

			connotationValue = 'primary';
			badge.setAttribute('connotation', connotationValue);
			await waitNextTask();
			const attributeChangesAffectsProperty = syncMatchFn(connotationValue);

			expect(
				propertyChangesAffectsAttribute,
				'Property change did not apply to attribute'
			).to.equal(true);
			expect(
				attributeChangesAffectsProperty,
				'Attribute change did not apply to property'
			).to.equal(true);
		});
	});

	describe('typography', function () {
		it(`should have set badge (text, default) typography correct`, async function () {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
			);
			await waitNextTask();
			expect(badge).to.exist;
			// @YonatanKra can we fetch this following object from json? It can be rendered for both scss and json usage from same source. would be a better practice for consistency
			const expectedStyles = {
				fontFamily: 'SpeziaWebVariable',
				fontSize: '12.642px',
				fontWeight: '400',
				fontStretch: '50%',
				// lineHeight: 'calc(1ex / 0.32);', // TODO: [VIV-166] line-height value contains runtime calculated value and depend on x-height of font (which may vary with the existence of font-size-adjust property). an alternative to existing test should be defined.
				letterSpacing: 'normal',
				textTransform: 'none',
			};
			assertComputedStyle(badge, expectedStyles);
		});
	});
});
