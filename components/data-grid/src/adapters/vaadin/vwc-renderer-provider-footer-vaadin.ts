import { DataGridColumn } from '../../vwc-data-grid-column-api.js';
import { MetaRenderer, CellRendererConfiguration } from '../../vwc-data-grid-renderer-api.js';
import { MetaRendererProvider } from '../vwc-data-grid-render-provider-api.js';

export {
	footerRendererProvider
};

const footerRendererProvider: MetaRendererProvider = (column: DataGridColumn): MetaRenderer | undefined => {
	let result;
	if (column.footerRenderer) {
		result = column.footerRenderer;
	} else if (column.footer) {
		result = simpleRenderer;
	}
	return result;
};

function simpleRenderer(container: HTMLElement, configuration: CellRendererConfiguration): void {
	container.classList.add('vvd-grid-footer');
	container.textContent = configuration.column.footer;
}
