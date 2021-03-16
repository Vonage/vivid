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

describe('data grid renderers customization', () => {
	let addElement = isolatedElementsCreation();

	it('should render header text by default', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should render footer text by default', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[0].footer = 'Footer text';
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should render custom header when renderer provided', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[0].headerRenderer = (container, config) => {
			container.innerHTML = `<span class="custom">${config.column.header}</span>`;
		};
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should render custom footer when renderer provided', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[0].footerRenderer = (container, config) => {
			container.innerHTML = `<span class="custom">Total: ${config.grid.items.length}</span>`;
		};
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});

	it('should render custom cell when renderer provided', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[0].cellRenderer = (container, _config, data) => {
			container.innerHTML = `<span class="custom">${JSON.stringify(data)}</span>`;
		};
		g.columns = c;
		g.items = getItems(3);
		await waitNextTask();

		expect(g).shadowDom.equalSnapshot();
	});
});
