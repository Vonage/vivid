import '@vonage/vwc-data-grid';
import { html } from 'lit-element';

export default {
    title: 'Components/Composite/DataGrid/Options/Columns Definitions',
    component: 'vwc-data-grid'
};

export const AsPlainOptions = () => {
    const options = {
        columnDefs: [
            { headerName: "Maker", field: "maker", sortable: true },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price", sortable: true, filter: "agNumberColumnFilter" }
        ],
        rowData: [
            { "maker": "Toyota", "model": "Celica", "price": 35000 },
            { "maker": "Ford", "model": "Mondeo", "price": 32000 },
            { "maker": "Porsche", "model": "Boxter", "price": 72000 },
        ]
    }
    return html`
<div style='width: 600px; height: 300px'>
    <vwc-data-grid .options=${options}>
    </vwc-data-grid>
</div>
`};

export const AsDeclarativeInlineElements = () => {
    const options = {
        rowData: [
            { "maker": "Toyota", "model": "Celica", "price": 35000 },
            { "maker": "Ford", "model": "Mondeo", "price": 32000 },
            { "maker": "Porsche", "model": "Boxter", "price": 72000 }
        ]
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
