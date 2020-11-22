import '../vwc-button.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';

const VWC_BUTTON = 'vwc-button';
const CONNOTATIONS_SUPPORTED = [
	'primary',
	'cta',
	'success',
	'alert',
	'info',
	'announcement',
];
const LAYOUTS_AFFECTED = [
	{
		layout: 'filled',
		childrenAffected: ['button'],
		stylesAffected: ['backgroundColor'],
	},
	{
		layout: 'outlined',
		childrenAffected: ['button'],
		stylesAffected: ['color', 'borderColor'],
	},
];

describe('button connotation', () => {
	const addElement = isolatedElementsCreation();

	for (const { layout, childrenAffected, stylesAffected } of LAYOUTS_AFFECTED) {
		for (const connotation of CONNOTATIONS_SUPPORTED) {
			it(`should reflect ${connotation} connotation (attribute) visually, ${layout}`, async () => {
				const [button] = addElement(
					textToDomToParent(
						`<${VWC_BUTTON} layout="${layout}">Button</${VWC_BUTTON}>`
					)
				);
				await assertConnotationAttribute({
					element: button,
					connotation: connotation,
					childrenAffected: childrenAffected,
					stylesAffected: stylesAffected,
				});
			});

			it(`should reflect ${connotation} connotation (property) visually, ${layout}`, async () => {
				const [button] = addElement(
					textToDomToParent(
						`<${VWC_BUTTON} layout="${layout}">Button</${VWC_BUTTON}>`
					)
				);
				await assertConnotationProperty({
					element: button,
					connotation: connotation,
					childrenAffected: childrenAffected,
					stylesAffected: stylesAffected,
				});
			});
		}
	}
});
