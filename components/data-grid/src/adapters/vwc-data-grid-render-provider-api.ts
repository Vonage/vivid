import { DataGridColumn } from '../vwc-data-grid-column-api';
import { DataRenderer, MetaRenderer } from '../vwc-data-grid-renderer-api';

export {
	MetaRendererProvider,
	DataRendererProvider
};

interface MetaRendererProvider {
	(column: DataGridColumn): MetaRenderer | undefined;
}

interface DataRendererProvider {
	(column: DataGridColumn): DataRenderer | undefined;
}
