export interface VwcGridAPI {
	multiSort: boolean;
	reordering: boolean;
	rowDetailsRenderer?(container: HTMLElement): void;
	columns: VwcGridColumnAPI[];
	items: unknown[];
	dataProvider?(params: unknown, callback: (pageItems: unknown[], treeLevelSize: number) => void): void;
}

export interface VwcGridColumnAPI {
	path: string;
	header: string;
	hidden?: boolean;
	sortable?: boolean;
	resizable?: boolean;
	tree?: boolean;
	cellRenderer?(container: HTMLElement): void;
	headerRenderer?(container: HTMLElement): void;
	footerRenderer?(container: HTMLElement): void;
}
