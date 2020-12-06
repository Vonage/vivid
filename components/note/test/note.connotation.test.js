import '../vwc-note.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';
import { Connotation } from '@vonage/vvd-foundation/constants';

const VWC_NOTE = 'vwc-note';
const CONNOTATIONS_SUPPORTED = Object.values(Connotation).filter((c) =>
	[
		Connotation.Success,
		Connotation.Alert,
		Connotation.Warning,
		Connotation.Info,
		Connotation.Announcement,
	].includes(c)
);

// TODO @gullerya we can extend this test to make sure unsupported connotations aren't reflected
// const CONNOTATIONS_UNSUPPORTED = Object.values(Connotation).filter(
// 	(c) => !CONNOTATIONS_SUPPORTED.includes(c)
// );

describe('note connotation', () => {
	const addElement = isolatedElementsCreation();

	for (const connotation of CONNOTATIONS_SUPPORTED) {
		it(`should reflect '${connotation}' connotation (attribute) visually`, async () => {
			const [badge] = addElement(textToDomToParent(`<${VWC_NOTE}></${VWC_NOTE}>`));
			await assertConnotationAttribute({
				element: badge,
				connotation: connotation,
				childrenAffected: ['::before'],
				stylesAffected: ['backgroundColor'],
			});
		});

		it(`should reflect '${connotation}' connotation (property) visually`, async () => {
			const [badge] = addElement(textToDomToParent(`<${VWC_NOTE}></${VWC_NOTE}>`));
			await assertConnotationProperty({
				element: badge,
				connotation: connotation,
				childrenAffected: ['::before'],
				stylesAffected: ['backgroundColor'],
			});
		});
	}
});
