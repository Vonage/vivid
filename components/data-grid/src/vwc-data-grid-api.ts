export interface VwcGridAPI {
	multiSort: boolean;
	reordering: boolean;
	columns: VwcGridColumnAPI[];
	rowDetailsRenderer?(container: HTMLElement): void;

	items?: unknown[];
	dataProvider?(params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;
}

export interface VwcGridColumnAPI {
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
