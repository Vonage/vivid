import { DataGrid } from '../../vwc-data-grid-api';
import { RowDetailsRenderer } from '../../vwc-data-grid-renderer-api';
import { RowDetailsRendererProvider } from '../vwc-data-grid-render-provider-api';

export {
	rowDetailsRendererProvider
};

const rowDetailsRendererProvider: RowDetailsRendererProvider = (grid: DataGrid): RowDetailsRenderer | undefined => {
	return grid.rowDetailsRenderer;
};
