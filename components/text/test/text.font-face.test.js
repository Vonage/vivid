import '../vwc-text.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';
import { VVDFontFace } from '@vonage/vvd-design-tokens/build/types/font-faces';

const VWC_TEXT = 'vwc-text';
const FONT_FACES_SUPPORTED = Object.values(VVDFontFace);

describe('text font face', () => {
	const addElement = isolatedElementsCreation();

	it(`should sync text property 'fontFace' and html attribute 'font-face'`, async function () {
		const [text] = addElement(
			textToDomToParent(`<${VWC_TEXT}></${VWC_TEXT}>`)
		);
		await text.updateComplete;

		const syncMatchFn = fontFace => text.fontFace == fontFace &&
			text.getAttribute('font-face') == fontFace;

		let fontFaceValue = 'body-1';
		text.fontFace = fontFaceValue;
		await text.updateComplete;
		const propertyChangesAffectsAttribute = syncMatchFn(fontFaceValue);

		fontFaceValue = 'headline-2';
		text.setAttribute('font-face', fontFaceValue);
		await text.updateComplete;
		const attributeChangesAffectsProperty = syncMatchFn(fontFaceValue);

		expect(
			propertyChangesAffectsAttribute,
			'Property change did not apply to attribute'
		).to.equal(true);
		expect(
			attributeChangesAffectsProperty,
			'Attribute change did not apply to property'
		).to.equal(true);
	});

	for (const fontFace of FONT_FACES_SUPPORTED) {
		it(`should reflect '${fontFace}' font face (attribute) visually`, async () => {
			const [text] = addElement(
				textToDomToParent(`<${VWC_TEXT}>Lorem ipsum</${VWC_TEXT}>`)
			);
			await assertConnotationAttribute({
				element: text,
				fontFace,
				stylesAffected: ['font'],
			});
		});

		it(`should reflect '${fontFace}' font face (property) visually`, async () => {
			const [text] = addElement(
				textToDomToParent(`<${VWC_TEXT}>Lorem ipsum</${VWC_TEXT}>`)
			);
			await assertConnotationProperty({
				element: text,
				fontFace,
				stylesAffected: ['font'],
			});
		});
	}
});
