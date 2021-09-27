import { DataGrid } from '../vwc-data-grid-api';
import { DataGridColumn } from '../vwc-data-grid-column-api';
import { MetaRenderer, DataRenderer, RowDetailsRenderer } from '../vwc-data-grid-renderer-api';

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
