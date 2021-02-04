import '@vonage/vwc-data-grid/vwc-data-grid.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
// import { argTypes } from './arg-types.js';

export const defaultOptions = {
    suppressMovableColumns: true,
    "columnDefs": [
        { "headerName": "Make", "field": "make", sortable: true },
        { "headerName": "Model", "field": "model" },
        { "headerName": "Price", "field": "price", sortable: true, filter: 'agNumberColumnFilter' }
    ],
    "rowData": [
        { "make": "Toyota", "model": "Celica", "price": 35000 },
        { "make": "Ford", "model": "Mondeo", "price": 32000 },
        { "make": "Porsche", "model": "Boxter", "price": 72000 }
    ]
}

export default {
	title: 'Components/Composite/DataGrid',
	component: 'vwc-data-grid',
	// argTypes
};

const TemplatePlain = args => html`
    <div style='width: 600px; height: 300px'>
	   <vwc-data-grid .options=${defaultOptions} ...=${spread(args)}>
	   </vwc-data-grid>
	</div>
`;

export const Full = TemplatePlain.bind({});
Full.args = { };
