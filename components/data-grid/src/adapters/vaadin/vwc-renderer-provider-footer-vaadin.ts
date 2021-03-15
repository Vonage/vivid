import { DataGridColumn } from '../../vwc-data-grid-column-api';
import { MetaRenderer, RendererConfiguration } from '../../vwc-data-grid-renderer-api';
import { MetaRendererProvider } from '../vwc-data-grid-render-provider-api';

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

function simpleRenderer(container: HTMLElement, configuration: RendererConfiguration): void {
	container.classList.add('vvd-grid-footer');
	container.textContent = configuration.column.footer;
}
