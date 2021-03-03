export interface VwcGridColumnConfiguration {
	path: string;
	header: string;
	sortable?: boolean;
	resizable?: boolean;
	footerRenderer?(): void;
}
