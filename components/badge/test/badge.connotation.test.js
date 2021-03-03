import '../vwc-badge.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';

const VWC_BADGE = 'vwc-badge';
const CONNOTATIONS_SUPPORTED = [
	'primary',
	'cta',
	'success',
	'alert',
	'info',
	'announcement',
];

describe('badge connotation', () => {
	const addElement = isolatedElementsCreation();

	it(`should sync badge class member 'connotation' and html attribute 'connotation'`, async function () {
		const [badge] = addElement(
			textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
		);
		await waitNextTask();

		const syncMatchFn = connotation => badge.connotation == connotation &&
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

	for (const connotation of CONNOTATIONS_SUPPORTED) {
		it(`should reflect '${connotation}' connotation (attribute) visually`, async () => {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
			);
			await assertConnotationAttribute({
				element: badge,
				connotation: connotation,
				childrenAffected: ['::before'],
				stylesAffected: ['backgroundColor'],
			});
		});

		it(`should reflect '${connotation}' connotation (property) visually`, async () => {
			const [badge] = addElement(
				textToDomToParent(`<${VWC_BADGE}>Badge Text</${VWC_BADGE}>`)
			);
			await assertConnotationProperty({
				element: badge,
				connotation: connotation,
				childrenAffected: ['::before'],
				stylesAffected: ['backgroundColor'],
			});
		});
	}
});
