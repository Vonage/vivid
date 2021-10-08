import { VWCCheckbox, COMPONENT_NAME as CHECKBOX_COMPONENT } from '@vonage/vwc-checkbox';
import { DataGrid, GRID_HEADER_COMPONENT } from '../../vwc-data-grid-api.js';
import { DataGridColumn, SELECTOR_MULTI, SELECTOR_SINGLE } from '../../vwc-data-grid-column-api.js';
import type { MetaRendererProvider } from '../vwc-data-grid-render-provider-api.js';
import type { MetaRenderer, CellRendererConfiguration } from '../../vwc-data-grid-renderer-api.js';

export {
	headerRendererProvider
};

const headerRendererProvider: MetaRendererProvider = (column: DataGridColumn): MetaRenderer => {
	let result = simpleRenderer;
	if (column.headerRenderer) {
		result = column.headerRenderer;
	} else if (column.selector) {
		result = selectorRenderer;
	} else if (column.sortable) {
		result = sorterRenderer;
	}
	return result;
};

function simpleRenderer(container: HTMLElement, configuration: CellRendererConfiguration): void {
	const genericHeader = ensureHeaderIn(container);
	genericHeader.sortable = false;
	genericHeader.path = configuration.column.path;
	genericHeader.textContent = configuration.column.header || '';
}

function selectorRenderer(container: HTMLElement, configuration: CellRendererConfiguration): void {
	const grid = configuration.grid;
	let selectHeader = container.querySelector(CHECKBOX_COMPONENT) as VWCCheckbox;
	if (!selectHeader && configuration.column.selector === SELECTOR_MULTI && !configuration.grid.dataProvider) {
		selectHeader = document.createElement(CHECKBOX_COMPONENT);
		selectHeader.classList.add('vvd-all-selector');
		selectHeader.setAttribute('aria-label', 'Select All');
		selectHeader.addEventListener('change', ({ target }) => {
			const toSelectAll = (target as VWCCheckbox).checked;
			if (toSelectAll) {
				grid.selectAll();
			} else {
				grid.deselectAll();
			}
		});
		grid.addEventListener('selected-items-changed', () => {
			setSelectAllState(grid, selectHeader);
		});
		setSelectAllState(grid, selectHeader);
		container.appendChild(selectHeader);
	} else if (selectHeader && (configuration.column.selector === SELECTOR_SINGLE || configuration.grid.dataProvider)) {
		selectHeader.remove();
	}
}

function sorterRenderer(container: HTMLElement, configuration: CellRendererConfiguration): void {
	const gh = ensureHeaderIn(container);
	gh.sortable = true;
	gh.path = configuration.column.path;
	gh.textContent = configuration.column.header || '';
}

function ensureHeaderIn(container: HTMLElement) {
	let result = container.querySelector(GRID_HEADER_COMPONENT);
	if (!result) {
		result = document.createElement(GRID_HEADER_COMPONENT);
		container.appendChild(result);
	}
	return result;
}

function setSelectAllState(grid: DataGrid, selectAllHeader: VWCCheckbox) {
	const totalSelected = grid.selectedItems?.length || 0;
	if (totalSelected === 0) {
		selectAllHeader.indeterminate = selectAllHeader.checked = false;
	} else if (totalSelected === grid.items?.length) {
		selectAllHeader.checked = true;
		selectAllHeader.indeterminate = false;
	} else {
		selectAllHeader.checked = true;
		selectAllHeader.indeterminate = true;
	}
}
