import { DataGrid } from './vwc-data-grid-api';
import { DataGridColumn } from './vwc-data-grid-column-api';

export {
	RendererConfiguration,
	MetaRenderer,
	DataRenderer
};

/**
 * Configuration structure supplied to the various grid renderers
 */
interface RendererConfiguration {

	/**
	 * `grid` component, the renderer is belonging to
	 */
	grid: DataGrid,

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
	(container: HTMLElement, configuration: RendererConfiguration): void;
}

/**
 * Renderer of data cells
 * - renderer should perform the rendering of the content into the `container` element provided
 * - relevant configuration supplied
 * - relevant data item supplied
 * - attention: the renderer MAY run multiple times, so it is it's own responsibility ot ensure idempotency of the rendered content
 */
interface DataRenderer {
	(container: HTMLElement, configuration: RendererConfiguration, data: { item: unknown, selected: boolean }): void;
}
