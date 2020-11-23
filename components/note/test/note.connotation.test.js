import '../vwc-note.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';

const VWC_NOTE = 'vwc-note';
const CONNOTATIONS_SUPPORTED = [
	'primary',
	'cta',
	'success',
	'alert',
	'info',
	'announcement',
];

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
