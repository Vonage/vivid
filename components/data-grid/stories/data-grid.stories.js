import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

const defaultOptions = {
    suppressMovableColumns: true,
    "columnDefs": [
        { "headerName": "Maker", "field": "maker", sortable: true },
        { "headerName": "Model", "field": "model" },
        { "headerName": "Price", "field": "price", sortable: true, filter: 'agNumberColumnFilter' }
    ],
    "rowData": [
        { "maker": "Toyota", "model": "Celica", "price": 35000 },
        { "maker": "Ford", "model": "Mondeo", "price": 32000 },
        { "maker": "Porsche", "model": "Boxter", "price": 72000 },
        { "maker": "Toyota", "model": "Celica", "price": 35000 },
        { "maker": "Ford", "model": "Mondeo", "price": 32000 },
        { "maker": "Porsche", "model": "Boxter", "price": 72000 }]
}

export default {
    title: 'Components/Composite/DataGrid',
    component: 'vwc-data-grid'
};

const TemplatePlain = args => html`
    <div style='width: 600px; height: 300px'>
        <vwc-data-grid .options=${defaultOptions} ...=${spread(args)}>
        </vwc-data-grid>
    </div>
`;

export const Full = TemplatePlain.bind({});
Full.args = {};

export const ColumnsDefinitionsAsElements = () => {
    const options = {
        "rowData": [
            { "maker": "Toyota", "model": "Celica", "price": 35000 },
            { "maker": "Ford", "model": "Mondeo", "price": 32000 },
            { "maker": "Porsche", "model": "Boxter", "price": 72000 },
            { "maker": "Toyota", "model": "Celica", "price": 35000 },
            { "maker": "Ford", "model": "Mondeo", "price": 32000 },
            { "maker": "Porsche", "model": "Boxter", "price": 72000 }]
    }
    return html`
<div style='width: 600px; height: 300px'>
    <vwc-data-grid .options=${options}>
        <vwc-data-grid-column headerName="Maker" field="maker" sortable="true"></vwc-data-grid-column>
        <vwc-data-grid-column headerName="Model" field="model"></vwc-data-grid-column>
        <vwc-data-grid-column headerName="Price" field="price" sortable="true" filter="agNumberColumnFilter">
        </vwc-data-grid-column>
    </vwc-data-grid>
</div>
`};
