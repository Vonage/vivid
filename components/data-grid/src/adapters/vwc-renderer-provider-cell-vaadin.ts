import '@vonage/vwc-checkbox';
import { CHECKBOX_COMPONENT, VWCCheckbox } from '@vonage/vwc-checkbox';
import { DataGridColumn, SELECTOR_SINGLE } from '../vwc-data-grid-column-api';
import { DataRenderer, DataRendererProvider, RendererConfiguration } from '../vwc-data-grid-render-provider-api';

export {
	cellRendererProvider
};

const cellRendererProvider: DataRendererProvider = (column: DataGridColumn): DataRenderer | undefined => {
	let result;
	if (column.cellRenderer) {
		result = column.cellRenderer;
	} else if (column.selector) {
		result = selectorRenderer;
	}
	return result;
};

function selectorRenderer(container: HTMLElement, configuration: RendererConfiguration, data: { item: unknown, selected: boolean }): void {
	let rs = container.querySelector(CHECKBOX_COMPONENT) as VWCCheckbox;
	if (!rs) {
		rs = document.createElement(CHECKBOX_COMPONENT);
		rs.classList.add('vvd-row-selector');
		rs.setAttribute('aria-label', 'Select Row');
		rs.addEventListener('change', (e) => {
			const cb = e.target as unknown as { checked: boolean, _data: { item: unknown }, _mode: string | undefined };
			if (cb.checked) {
				//	TODO: enhance select API to override instead of add, optionally
				if (cb._mode === SELECTOR_SINGLE) {
					configuration.grid.deselectAll();
				}
				configuration.grid.selectItem(cb._data.item);
			} else {
				configuration.grid.deselectItem(cb._data.item);
			}
		});
		container.appendChild(rs);
	}
	(rs as unknown as { _data: unknown })._data = data;
	(rs as unknown as { _mode: string | undefined })._mode = configuration.column.selector;
	rs.checked = Boolean(data?.selected);
}
