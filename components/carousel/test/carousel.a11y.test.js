import '../vwc-carousel.js';
import '../vwc-carousel-item.js';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-carousel';

describe('carousel a11y', () => {
	const addElement = isolatedElementsCreation();

	it('should have 0 accessibility violations', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME}>
					<vwc-carousel-item>Content</vwc-carousel-item>
				</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();

		await expect(actualElement).shadowDom.to.be.accessible();
	});
});
