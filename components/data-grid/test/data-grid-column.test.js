import '@vonage/vwc-data-grid';
import {
	waitNextTask,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-data-grid-column';

describe('data grid columns', () => {
	let addElement = isolatedElementsCreation();

	it('should have vwc-data-grid-column is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-data-grid-column element is not defined')
		);
	});

	it('should reflect configuration from elements to grid configuration (hidden, frozen, header)', async () => {
		const [g] = addElement(
			textToDomToParent(`
				<vwc-data-grid>
					<${COMPONENT_NAME} header="A" hidden></${COMPONENT_NAME}>
					<${COMPONENT_NAME} header="B" frozen></${COMPONENT_NAME}>
					<${COMPONENT_NAME} header="C"></${COMPONENT_NAME}>
				</vwc-data-grid>
			`)
		);
		await waitNextTask();
		expect(g.columns).exist;
		expect(g.columns.length).equal(3);
		expect(g.columns[0].header).equal('A');
		expect(g.columns[0].hidden).true;
		expect(g.columns[1].header).equal('B');
		expect(g.columns[1].frozen).true;
		expect(g.columns[2].header).equal('C');

		g.children[0].removeAttribute('hidden');
		g.children[1].removeAttribute('frozen');
		g.children[2].setAttribute('header', 'C1');
		await waitNextTask();
		expect(g.columns[0].header).equal('A');
		expect(g.columns[0].hidden).false;
		expect(g.columns[1].header).equal('B');
		expect(g.columns[1].frozen).false;
		expect(g.columns[2].header).equal('C1');
	});

	it('should reflect configuration from elements to grid configuration (sortable, resizable, selector)', async () => {
		const [g] = addElement(
			textToDomToParent(`
				<vwc-data-grid>
					<${COMPONENT_NAME} header="A" sortable></${COMPONENT_NAME}>
					<${COMPONENT_NAME} header="B" resizable></${COMPONENT_NAME}>
					<${COMPONENT_NAME} header="C"></${COMPONENT_NAME}>
				</vwc-data-grid>
			`)
		);
		await waitNextTask();
		expect(g.columns).exist;
		expect(g.columns.length).equal(3);
		expect(g.columns[0].sortable).true;
		expect(g.columns[1].resizable).true;
		expect(g.columns[2].selector).not.exist;

		g.children[0].removeAttribute('sortable');
		g.children[1].removeAttribute('resizable');
		g.children[2].setAttribute('selector', 'single');
		await waitNextTask();
		expect(g.columns[0].hidden).false;
		expect(g.columns[1].frozen).false;
		expect(g.columns[2].selector).equal('single');
	});

	it('should reflect tree column', async () => {
		const [g] = addElement(
			textToDomToParent(`
				<vwc-data-grid>
					<${COMPONENT_NAME} header="A" tree></${COMPONENT_NAME}>
					<${COMPONENT_NAME} header="B" resizable></${COMPONENT_NAME}>
					<${COMPONENT_NAME} header="C"></${COMPONENT_NAME}>
				</vwc-data-grid>
			`)
		);
		await waitNextTask();
		expect(g.columns).exist;
		expect(g.columns.length).equal(3);
		expect(g.columns[0].tree).true;
		expect(g.columns[1].resizable).true;
	});
});
