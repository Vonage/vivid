import { TemplateResult, CSSResult } from 'lit-element';

export {
	VwcGrid,
	VwcGridColumn,
	VwcDataGridProvider
};

interface VwcGrid {
	multiSort: boolean;
	reordering: boolean;
	columns: VwcGridColumn[];
	rowDetailsRenderer?(container: HTMLElement): void;

	items?: unknown[];
	dataProvider?(params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;
}

interface VwcGridColumn {
	path: string;
	header: string;

	hidden?: boolean;
	frozen?: boolean;
	sortable?: boolean;
	resizable?: boolean;
	autoWidth?: boolean;
	width?: string;
	tree?: boolean;

	cellRenderer?(container: HTMLElement): void;
	headerRenderer?(container: HTMLElement): void;
	footerRenderer?(container: HTMLElement): void;
}

interface VwcDataGridProvider {
	render(configuration: VwcGrid): TemplateResult;
	getStylesOverlay(): CSSResult[];
}
