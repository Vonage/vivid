export interface VwcGridColumnConfiguration {
	key?: string,
	path: string,
	header: string;
	sortable?: boolean;
}

export interface VwcGridConfiguration {
	columns: VwcGridColumnConfiguration[];
}
