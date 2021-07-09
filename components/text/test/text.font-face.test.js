import '../vwc-text.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';


const VWC_TEXT = 'vwc-text';
const FONT_FACES_SUPPORTED = [
	'body-1',
	'body-1-bold',
	'body-1-code',
	'body-1-link',
	'body-2',
	'body-2-bold',
	'body-2-code',
	'body-2-link',
	'button',
	'button-dense',
	'button-enlarge',
	'caption',
	'caption-bold',
	'caption-code',
	'caption-link',
	'headline-1',
	'headline-2',
	'subtitle-1',
	'subtitle-2',
	'title-1',
	'title-2'
];

describe(`${VWC_TEXT} font face`, () => {
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
});
