export interface VwcGridAPI {
	multiSort: boolean;
	reordering: boolean;
	rowDetailsRenderer?(container: HTMLElement): void;
	columns: VwcGridColumnAPI[];
	items: unknown[];
}

export interface VwcGridColumnAPI {
	path: string;
	header: string;
	hidden?: boolean;
	sortable?: boolean;
	resizable?: boolean;
	cellRenderer?(container: HTMLElement): void;
	headerRenderer?(container: HTMLElement): void;
	footerRenderer?(container: HTMLElement): void;
}
