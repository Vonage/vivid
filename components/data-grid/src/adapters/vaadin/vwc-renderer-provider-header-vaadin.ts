import '@vonage/vwc-checkbox';
import { CHECKBOX_COMPONENT, VWCCheckbox } from '@vonage/vwc-checkbox';
import { GRID_HEADER_COMPONENT } from '../../vwc-data-grid-api';
import { DataGridColumn, SELECTOR_MULTI, SELECTOR_SINGLE } from '../../vwc-data-grid-column-api';
import { MetaRendererProvider } from '../vwc-data-grid-render-provider-api';
import { MetaRenderer, RendererConfiguration } from '../../vwc-data-grid-renderer-api';

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

function simpleRenderer(container: HTMLElement, configuration: RendererConfiguration): void {
	const gh = ensureHeaderIn(container);
	gh.sortable = false;
	gh.path = configuration.column.path;
	gh.textContent = configuration.column.header || '';
}

function selectorRenderer(container: HTMLElement, configuration: RendererConfiguration): void {
	const grid = configuration.grid;
	let sh = container.querySelector(CHECKBOX_COMPONENT) as VWCCheckbox;
	if (!sh && configuration.column.selector === SELECTOR_MULTI && !configuration.grid.dataProvider) {
		sh = document.createElement(CHECKBOX_COMPONENT);
		sh.classList.add('vvd-all-selector');
		sh.setAttribute('aria-label', 'Select All');
		sh.addEventListener('change', ({ target }) => {
			const toSelectAll = (target as VWCCheckbox).checked;
			if (toSelectAll) {
				grid.selectAll();
			} else {
				grid.deselectAll();
			}
		});
		grid.addEventListener('selected-items-changed', () => {
			const totalSelected = grid.selectedItems?.length || 0;
			if (totalSelected === 0) {
				sh.indeterminate = sh.checked = false;
			} else if (totalSelected === grid.items?.length) {
				sh.checked = true;
				sh.indeterminate = false;
			} else {
				sh.checked = true;
				sh.indeterminate = true;
			}
		});
		container.appendChild(sh);
	} else if (sh && configuration.column.selector === SELECTOR_SINGLE && configuration.grid.dataProvider) {
		sh.remove();
	}
}

function sorterRenderer(container: HTMLElement, configuration: RendererConfiguration): void {
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
