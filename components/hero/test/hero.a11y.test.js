import '../vwc-hero.js';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-hero';

describe('hero a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}
					icon="chat-line"
					heading="Empty State Title"
					body="Empty state body for more information"
				>
				</${COMPONENT_NAME}>
			`)
		);
		await actualElement.updateComplete;

		await expect(actualElement).shadowDom.to.be.accessible();
	});
});
