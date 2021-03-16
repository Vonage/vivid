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

	it('should sort ascending upon the first click on sorting header', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[1].sortable = true;
		g.columns = c;
		g.items = getItems(3);

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		const sortingHeader = g.shadowRoot.querySelector('[sortable]');
		expect(sortingHeader).exist;
		sortingHeader.click();

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should sort descending upon the second click on sorting header', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[1].sortable = true;
		g.columns = c;
		g.items = getItems(3);

		await waitNextTask();
		const sortingHeader = g.shadowRoot.querySelector('[sortable]');
		expect(sortingHeader).exist;
		sortingHeader.click();
		sortingHeader.click();

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should disable sort upon the third click on sorting header', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[1].sortable = true;
		g.columns = c;
		g.items = getItems(3);

		await waitNextTask();
		const sortingHeader = g.shadowRoot.querySelector('[sortable]');
		expect(sortingHeader).exist;
		sortingHeader.click();
		sortingHeader.click();
		sortingHeader.click();

		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});
});


