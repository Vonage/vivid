import '../vwc-button.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {
	body1BoldTypographyStyles,
	buttonDefaultTypographyStyles,
	captionBoldTypographyStyles,
} from '../../../test/style-utils.js';

const COMPONENT_NAME = 'vwc-button';
const SIZE_FLAVORS = {
	default: buttonDefaultTypographyStyles,
	dense: captionBoldTypographyStyles,
	enlarged: body1BoldTypographyStyles,
};

describe('button typography', () => {
	let addElement = isolatedElementsCreation();

	for (const flavor in SIZE_FLAVORS) {
		const expectedTypography = SIZE_FLAVORS[flavor];

		it(`should have set button (${flavor}, text, rounded) typography correct`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} ${flavor}>Button Text</${COMPONENT_NAME}>`
				)
			);
			const button = await getButtonElement(actualElement);
			assertComputedStyle(button, expectedTypography);
		});

		it(`should have set button (${flavor}, outlined, pill) typography correct`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} ${flavor} layout="outlined" shape="pill">Button Text</${COMPONENT_NAME}>`
				)
			);
			const button = await getButtonElement(actualElement);
			assertComputedStyle(button, expectedTypography);
		});

		it(`should have set button (${flavor}, filled, disabled, pill) typography correct`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} ${flavor} layout="filled" disabled shape="pill">Button Text</${COMPONENT_NAME}>`
				)
			);
			const button = await getButtonElement(actualElement);
			assertComputedStyle(button, expectedTypography);
		});
	}
});

async function getButtonElement(component) {
	await waitNextTask();
	return component.shadowRoot.querySelector('#button');
}
