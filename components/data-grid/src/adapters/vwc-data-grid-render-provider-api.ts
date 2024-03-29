import type { DataGrid } from '../vwc-data-grid-api.js';
import type { DataGridColumn } from '../vwc-data-grid-column-api.js';
import type { MetaRenderer, DataRenderer, RowDetailsRenderer } from '../vwc-data-grid-renderer-api.js';

export {
	MetaRendererProvider,
	DataRendererProvider,
	RowDetailsRendererProvider
};

interface MetaRendererProvider {
	(column: DataGridColumn): MetaRenderer | undefined;
}

interface DataRendererProvider {
	(column: DataGridColumn): DataRenderer | undefined;
}

interface RowDetailsRendererProvider {
	(grid: DataGrid): RowDetailsRenderer | undefined;
}
