import type { DataGrid } from './vwc-data-grid-api.js';
import type { DataGridColumn } from './vwc-data-grid-column-api.js';

export {
	RowRendererConfiguration,
	CellRendererConfiguration,
	MetaRenderer,
	DataRenderer,
	RowDetailsRenderer
};

/**
 * Configuration structure supplied to the whole-row kind renderers
 */
 interface RowRendererConfiguration {

	/**
	 * `grid` component, the renderer is belonging to
	 */
	grid: DataGrid,
}

/**
 * Configuration structure supplied to the various grid renderers
 */
interface CellRendererConfiguration extends RowRendererConfiguration {

	/**
	 * column configuration, the renderer is belonging to
	 */
	column: DataGridColumn
}

/**
 * Renderer of meta elements like 'footer', 'header' etc
 * - renderer should perform the rendering of the content into the `container` element provided
 * - relevant configuration supplied
 * - attention: the renderer MAY run multiple times, so it is it's own responsibility ot ensure idempotency of the rendered content
 */
interface MetaRenderer {
	(container: HTMLElement, configuration: CellRendererConfiguration): void;
}

/**
 * Renderer of data cells
 * - renderer should perform the rendering of the content into the `container` element provided
 * - relevant configuration supplied
 * - relevant data item supplied
 * - attention: the renderer MAY run multiple times, so it is it's own responsibility ot ensure idempotency of the rendered content
 */
interface DataRenderer {
	(container: HTMLElement, configuration: CellRendererConfiguration, data: { item: unknown, selected: boolean }): void;
}

/**
 * Renderer of row details
 * - renderer should perform the rendering of the content into the `container` element provided
 * - relevant configuration supplied
 * - relevant data item supplied
 * - attention: the renderer MAY run multiple times, so it is it's own responsibility ot ensure idempotency of the rendered content
 */
 interface RowDetailsRenderer {
	(container: HTMLElement, configuration: RowRendererConfiguration, data: { item: unknown, selected: boolean }): void;
}
