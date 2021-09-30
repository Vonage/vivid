import type { DataGrid } from '../../vwc-data-grid-api.js';
import type { RowDetailsRenderer } from '../../vwc-data-grid-renderer-api.js';
import type { RowDetailsRendererProvider } from '../vwc-data-grid-render-provider-api.js';

export {
	rowDetailsRendererProvider
};

const rowDetailsRendererProvider: RowDetailsRendererProvider = (grid: DataGrid): RowDetailsRenderer | undefined => {
	return grid.rowDetailsRenderer;
};
