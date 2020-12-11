import {
	textToDomToParent,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	assertConnotationAttribute,
	assertConnotationProperty,
} from '@vonage/vvd-foundation/test/connotation.test.js';

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
		stylesAffected: [
			'color',
			'borderTopColor',
			'borderRightColor',
			'borderBottomColor',
			'borderLeftColor',
		],
	},
];

export async function connotationTestCases(COMPONENT_NAME) {
	const addElement = isolatedElementsCreation();

	for (const { layout, childrenAffected, stylesAffected } of LAYOUTS_AFFECTED) {
		for (const connotation of CONNOTATIONS_SUPPORTED) {
			it(`should reflect '${connotation}' connotation (attribute) visually, ${layout}`, async () => {
				const [button] = addElement(
					textToDomToParent(
						`<${COMPONENT_NAME} layout="${layout}">
							${COMPONENT_NAME === 'vwc-button' ? 'Button' : ''}
						</${COMPONENT_NAME}>`
					)
				);
				await assertConnotationAttribute({
					element: button,
					connotation: connotation,
					childrenAffected: childrenAffected,
					stylesAffected: stylesAffected,
				});
			});

			it(`should reflect '${connotation}' connotation (property) visually, ${layout}`, async () => {
				const [button] = addElement(
					textToDomToParent(
						`<${COMPONENT_NAME} layout="${layout}">Button</${COMPONENT_NAME}>`
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
}
