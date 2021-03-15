import '@vonage/vwc-checkbox';
import { CHECKBOX_COMPONENT, VWCCheckbox } from '@vonage/vwc-checkbox';
import { DataGridColumn, SELECTOR_SINGLE } from '../../vwc-data-grid-column-api';
import { DataRenderer, RendererConfiguration } from '../../vwc-data-grid-renderer-api';
import { DataRendererProvider } from '../vwc-data-grid-render-provider-api';

export {
	cellRendererProvider
};

interface VVDSelector {
	_data: { item: unknown };
	_mode: string | undefined;
}

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
	let rs = container.querySelector(CHECKBOX_COMPONENT) as VWCCheckbox & VVDSelector;
	if (!rs) {
		rs = document.createElement(CHECKBOX_COMPONENT) as VWCCheckbox & VVDSelector;
		rs.classList.add('vvd-row-selector');
		rs.setAttribute('aria-label', 'Select Row');
		rs.addEventListener('change', (e) => {
			const cb = e.target as VWCCheckbox & VVDSelector;
			if (cb.checked) {
				configuration.grid.selectItem(cb._data.item, cb._mode === SELECTOR_SINGLE);
			} else {
				configuration.grid.deselectItem(cb._data.item);
			}
		});
		container.appendChild(rs);
	}
	rs._data = data;
	rs._mode = configuration.column.selector;
	rs.checked = Boolean(data?.selected);
}
