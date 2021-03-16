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

describe('data grid expand details', () => {
	let addElement = isolatedElementsCreation();

	it('should render expanded item when opened', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		g.items = getItems(3);
		g.rowDetailsRenderer = (container, _config, data) => {
			container.innerHTML = `<span>${data.item.x} - ${data.item.y}</span>`;
		};

		await waitNextTask();
		g.openItemDetails(g.items[1]);
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		g.closeItemDetails(g.items[1]);
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});
});
