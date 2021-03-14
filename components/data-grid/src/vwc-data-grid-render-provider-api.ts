import { DataGrid } from './vwc-data-grid-api';
import { DataGridColumn } from './vwc-data-grid-column-api';

export {
	RendererConfiguration,
	MetaRenderer,
	DataRenderer,
	MetaRendererProvider,
	DataRendererProvider
};

interface RendererConfiguration {
	grid: DataGrid,
	column: DataGridColumn
}

interface MetaRenderer {
	(container: HTMLElement, configuration: RendererConfiguration): void;
}

interface DataRenderer {
	(container: HTMLElement, configuration: RendererConfiguration, data: { item: unknown, selected: boolean }): void;
}

interface MetaRendererProvider {
	(column: DataGridColumn): MetaRenderer | undefined;
}

interface DataRendererProvider {
	(column: DataGridColumn): DataRenderer | undefined;
}
