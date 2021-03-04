import { TemplateResult, CSSResult } from 'lit-element';

export {
	DataGrid,
	DataGridColumn,
	DataGridProvider
};

interface DataGrid {
	multiSort: boolean;
	reordering: boolean;
	columns: DataGridColumn[];
	rowDetailsRenderer?(container: HTMLElement): void;

	items?: unknown[];
	dataProvider?(params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;
}

interface DataGridColumn {
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

interface DataGridProvider {
	render(configuration: DataGrid): TemplateResult;
	getStylesOverlay(): CSSResult[];
}
