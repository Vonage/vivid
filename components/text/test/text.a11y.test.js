import '../vwc-text.js';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-text';

describe(`${COMPONENT_NAME} a11y`, () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations containing semantic tag', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}><h1>Lorem ipsum dolor sit amet</h1></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;

		await expect(actualElement).shadowDom.to.be.accessible();
	});

	it('should have 0 accessibility violations nested in semantic tag', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<h1><${COMPONENT_NAME} style="display: contents">Lorem ipsum dolor sit amet</${COMPONENT_NAME}></h1>`)
		);
		await actualElement.updateComplete;

		await expect(actualElement).shadowDom.to.be.accessible();
	});
});
