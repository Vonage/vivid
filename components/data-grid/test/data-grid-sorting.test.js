import '@vonage/vwc-data-grid';
import { getColumns, getItems } from './helper-utils.test';
import {
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-data-grid';

describe('data grid sorting behaviour', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-note is defined as a custom element', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		g.items = getItems(3);
	});
});
