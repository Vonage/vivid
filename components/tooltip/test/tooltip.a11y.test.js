import '../vwc-tooltip.js';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-tooltip';

describe('tooltip a11y', () => {
	const addElement = isolatedElementsCreation();

	const addtooltipElement = async (content) => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>${content || ''}</${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;

		return actualElement;
	};

	const extracttooltipElements = (actualElement) => {
		const { shadowRoot } = actualElement;
		return {
			actualElement,
			shadowRoot,
			grid: shadowRoot.querySelector('[role="grid"i]')
		};
	};

	it('should pass accessibility test', async () => {
		const { actualElement } = extracttooltipElements(await addtooltipElement());
		await expect(actualElement).shadowDom.to.be.accessible();
	});
});
