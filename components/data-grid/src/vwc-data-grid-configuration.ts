export interface VwcGridColumnConfiguration {
	path: string;
	header: string;
	hidden?: boolean;
	sortable?: boolean;
	resizable?: boolean;
	cellRenderer?(container: HTMLElement): void;
	headerRenderer?(container: HTMLElement): void;
	footerRenderer?(container: HTMLElement): void;
}
