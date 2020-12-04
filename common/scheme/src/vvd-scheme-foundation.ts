/* eslint-disable no-shadow */
export enum PredefinedScheme {
	LIGHT = 'light',
	DARK = 'dark',
}

export enum AutoScheme {
	SYNC_WITH_OS_SETTINGS = 'syncWithOsSettings',
}

export type SchemeOption = PredefinedScheme | AutoScheme;

export interface SelectedDetail {
	scheme: SchemeOption;
}
