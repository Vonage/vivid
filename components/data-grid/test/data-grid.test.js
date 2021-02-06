import '@vonage/vwc-data-grid';
import {
	isolatedElementsCreation,
	textToDomToParent,
	waitInterval,
	waitNextTask,
} from '../../../test/test-helpers';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { html } from 'lit-element';
import { render } from 'lit-html';

chai.use(chaiDomDiff);

describe('vwc-data-grid', () => {
	const renderGridElement = (gridHtml) => {
		const [container] = addElement(textToDomToParent('<div></div>'));
		render(gridHtml, container);
		return container.querySelector('vwc-data-grid');
	};
	const addElement = isolatedElementsCreation();
	const gridOptions = {
		onGridReady: (x) => console.log('Grid Ready', x),
		columnDefs: [
			{ headerName: 'Maker', field: 'maker', sortable: true },
			{ headerName: 'Model', field: 'model' },
			{
				headerName: 'Price',
				field: 'price',
				sortable: true,
				filter: 'agNumberColumnFilter',
			},
		],
		rowData: [
			{ maker: 'Toyota', model: 'Celica', price: 35000 },
			{ maker: 'Ford', model: 'Mondeo', price: 32000 },
			{ maker: 'Porsche', model: 'Boxter', price: 72000 },
			{ maker: 'Porsche', model: 'Boxter', price: 72000 },
		],
	};

	it('vwc-data-grid is defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-data-grid', 'vwc-data-grid element is not defined')
		);
	});

	it('validates "options" property could not be set AFTER element initialization', async () => {
		const gridElement = renderGridElement(html`<vwc-data-grid></vwc-data-grid>`);
		await waitNextTask();

		assert.throws(
			() => (gridElement.options = {}),
			'Grid already instantiated, please use "element.api" directly to mutate options in runtime'
		);
	});

	it('validates "gridReady" event is dispatched after initialization', async () => {
		const options = {
			onGridReady: () => console.log('Grid ready'),
		};
		const gridElement = renderGridElement(
			html`<vwc-data-grid .options=${options}></vwc-data-grid>`
		);
		await waitNextTask();
	});
});
