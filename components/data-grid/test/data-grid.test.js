import '@vonage/vwc-data-grid';
import { getColumns } from './helper-utils.test';
import {
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-data-grid';

describe('data grid', () => {
	let addElement = isolatedElementsCreation();

	it('should have vwc-data-grid is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-data-grid element is not defined')
		);
	});

	it('should reflect/react on reordering property', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} reordering></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		expect(g.reordering).true;
		expect(g).shadowDom.equalSnapshot();

		//	TODO: add actual simulation of drag'n'drop
	});

	it('should reflect columns redefinition on refreshConfiguration (header, hidden, frozen)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		g.columns = getColumns();
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		g.columns[0].hidden = true;
		g.columns[1].header = 'B1';
		g.columns[2].frozen = true;
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		g.refreshConfiguration();
		await waitNextTask();
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});

	it('should reflect columns redefinition on refreshConfiguration (sortable, resizable)', async () => {
		const [g] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const c = getColumns();
		c[1].sortable = true;
		g.columns = c;
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		g.columns[1].sortable = false;
		g.columns[2].resizable = true;
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();

		g.refreshConfiguration();
		await waitNextTask();
		expect(g).shadowDom.equalSnapshot();
	});
});
