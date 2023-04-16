import '../vwc-breadcrumb-item.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-breadcrumb-item';

describe('Breadcrumb-item', () => {
	let addElement = isolatedElementsCreation();
	let element;
	beforeEach(async () => {
		[element] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} text="text"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
	});
	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should have an anchor when href is set content', async () => {
		element.href = 'https://www.google.com';
		await new Promise(res => {
			const interval = setInterval(() => {
				if (element.shadowRoot.querySelector('a.control')) {
					clearInterval(interval);
					res();
				}
			});
		});
		expect(element.shadowRoot.querySelector('a.control')).to.exist;
	});
});
