import '../vwc-icon-button.js';
import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';

const VWC_ICON_BUTTON = 'vwc-icon-button';
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
		childrenAffected: ['.mdc-icon-button'],
		stylesAffected: ['backgroundColor'],
	},
	{
		layout: 'outlined',
		childrenAffected: ['.mdc-icon-button'],
		stylesAffected: [
			'color',
			'borderTopColor',
			'borderRightColor',
			'borderBottomColor',
			'borderLeftColor',
		],
	},
];

describe('icon button connotation', () => {
	const addElement = isolatedElementsCreation();

	for (const { layout, childrenAffected, stylesAffected } of LAYOUTS_AFFECTED) {
		for (const connotation of CONNOTATIONS_SUPPORTED) {
			it(`should reflect '${connotation}' connotation (attribute) visually, ${layout}`, async () => {
				const [iconButton] = addElement(
					textToDomToParent(
						`<${VWC_ICON_BUTTON} layout="${layout}">Icon Button</${VWC_ICON_BUTTON}>`
					)
				);
				await assertConnotationAttribute({
					element: iconButton,
					connotation: connotation,
					childrenAffected: childrenAffected,
					stylesAffected: stylesAffected,
				});
			});

			it(`should reflect '${connotation}' connotation (property) visually, ${layout}`, async () => {
				const [iconButton] = addElement(
					textToDomToParent(
						`<${VWC_ICON_BUTTON} layout="${layout}">Icon Button</${VWC_ICON_BUTTON}>`
					)
				);
				await assertConnotationProperty({
					element: iconButton,
					connotation: connotation,
					childrenAffected: childrenAffected,
					stylesAffected: stylesAffected,
				});
			});
		}
	}
});
