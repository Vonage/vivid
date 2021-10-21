import '../vwc-text.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';
import { Connotation } from '@vonage/vvd-foundation/constants.js';

const VWC_TEXT = 'vwc-text';
const CONNOTATIONS_SUPPORTED = Object.values(Connotation).filter(c => [
	Connotation.Priamry,
	Connotation.CTA,
	Connotation.Announcement,
	Connotation.Info,
	Connotation.Success,
	Connotation.Alert,
].includes(c));

describe('text connotation', () => {
	const addElement = isolatedElementsCreation();

	for (const connotation of CONNOTATIONS_SUPPORTED) {
		it(`should reflect '${connotation}' connotation (attribute) visually`, async () => {
			const [note] = addElement(textToDomToParent(`<${VWC_TEXT}></${VWC_TEXT}>`));
			await assertConnotationAttribute({
				element: note,
				childrenAffected: ['.vwc-text'],
				connotation: connotation,
				stylesAffected: ['borderInlineStartColor'],
			});
		});

		it(`should reflect '${connotation}' connotation (property) visually`, async () => {
			const [note] = addElement(textToDomToParent(`<${VWC_TEXT}></${VWC_TEXT}>`));
			await assertConnotationProperty({
				element: note,
				childrenAffected: ['.vwc-text'],
				connotation: connotation,
				stylesAffected: ['borderInlineStartColor'],
			});
		});
	}
});
