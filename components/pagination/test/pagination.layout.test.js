import { COMPONENT_NAME } from '@vonage/vwc-pagination';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

describe('pagination layout', () => {
	let addElement = isolatedElementsCreation();

	it('should not fire on init', async () => {
		const [pagination] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME}></${COMPONENT_NAME}>`
			)
		);
		const events = getEventsCollector(pagination);
		await waitNextTask();

		expect(events.length).equal(0);
	});
});
