import '@vonage/vwc-data-grid/index';
import { waitNextTask } from '../../../test/test-helpers';
import { html } from 'lit-element';
import { renderGridElement } from './helpers';

describe('vwc-data-grid', () => {
	const gridOptions = {
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

	it('vwc-data-grid-column is defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				'vwc-data-grid-column',
				'vwc-data-grid-column element is not defined'
			)
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

	it('columns definitions can be given as a child vwc-data-grid-column elements', async () => {
		const gridElement = renderGridElement(
			html`<vwc-data-grid>
				<vwc-data-grid-column headerName="A"></vwc-data-grid-column>
				<vwc-data-grid-column headerName="B"></vwc-data-grid-column>
			</vwc-data-grid>`
		);
		await waitNextTask();
	});
});
