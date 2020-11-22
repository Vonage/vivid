import '../vwc-switch.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';

const VWC_SWITCH = 'vwc-switch';
const CONNOTATIONS_SUPPORTED = ['primary', 'cta', 'success', 'alert'];

describe('switch connotation', () => {
	const addElement = isolatedElementsCreation();

	for (const connotation of CONNOTATIONS_SUPPORTED) {
		it(`should reflect ${connotation} connotation (attribute) visually, checked`, async () => {
			const [vwcSwitch] = addElement(
				textToDomToParent(`<${VWC_SWITCH} checked></${VWC_SWITCH}>`)
			);
			await assertConnotationAttribute({
				element: vwcSwitch,
				connotation: connotation,
				childrenAffected: ['.mdc-switch__track'],
				stylesAffected: ['backgroundColor'],
			});
		});

		it(`should reflect ${connotation} connotation (property) visually, checked`, async () => {
			const [vwcSwitch] = addElement(
				textToDomToParent(`<${VWC_SWITCH} checked></${VWC_SWITCH}>`)
			);
			await assertConnotationProperty({
				element: vwcSwitch,
				connotation: connotation,
				childrenAffected: ['.mdc-switch__track'],
				stylesAffected: ['backgroundColor'],
			});
		});
	}
});
