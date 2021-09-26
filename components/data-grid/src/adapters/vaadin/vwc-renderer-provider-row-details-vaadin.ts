import { DataGrid } from '../../vwc-data-grid-api.js';
import { RowDetailsRenderer } from '../../vwc-data-grid-renderer-api.js';
import { RowDetailsRendererProvider } from '../vwc-data-grid-render-provider-api.js';

export {
	rowDetailsRendererProvider
};

const rowDetailsRendererProvider: RowDetailsRendererProvider = (grid: DataGrid): RowDetailsRenderer | undefined => {
	return grid.rowDetailsRenderer;
};
