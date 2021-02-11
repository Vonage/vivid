import '@vonage/vwc-data-grid';
import '@vonage/vwc-icon';
import { html } from 'lit-element';
import icons from "./icon-manifest.json";

export default {
    title: 'Components/Composite/DataGrid/UseCases',
    component: 'vwc-data-grid'
};

class IconsDataSource {
    getRows(params) {
      params.successCallback(icons.slice(params.startRow, params.endRow), icons.length);
    }
}

function IconCellRenderer () {
    // function to act as a class
}

// gets called once before the renderer is used
IconCellRenderer.prototype.init = function(params) {
    // create the cell
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `<vwc-icon type="${params.value}" size="medium"></vwc-icon>`;
};

// gets called once (assuming destroy hasn't been called first) when grid ready to insert the element
IconCellRenderer.prototype.getGui = function() {
    return this.eGui;
};

// gets called whenever the user gets the cell to refresh
IconCellRenderer.prototype.refresh = function(params) {
    // set value into cell again
    this.eGui.innerHTML = `<vwc-icon type="${params.value}" size="medium"></vwc-icon>`;
    // return true to tell the grid we refreshed successfully
    return true;
};

export const IconsRegistry = () => {
    const options = {
        rowModelType: 'infinite',
        datasource: new IconsDataSource()
    }
    return html`
<div style='width: 900px; height: 300px'>
    <vwc-data-grid .options=${options}>
        <vwc-data-grid-column headerName="Id" field="id" sortable="true"></vwc-data-grid-column>
        <vwc-data-grid-column headerName="Icon" field="id" width="65" .cellRenderer=${IconCellRenderer}></vwc-data-grid-column>
        <vwc-data-grid-column headerName="Keywords" field="keyword"></vwc-data-grid-column>
        <vwc-data-grid-column headerName="Tags" field="tag"></vwc-data-grid-column>
        <vwc-data-grid-column headerName="Alias" field="alias"></vwc-data-grid-column>
    </vwc-data-grid>
</div>
`};