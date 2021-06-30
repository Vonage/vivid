import { VWCCalendar } from './vwc-calendar';


export const ARROW_UP = 'ArrowUp';
export const ARROW_RIGHT = 'ArrowRight';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';

export function isCellOrHeader(el: unknown): el is HTMLElement {
	return el instanceof HTMLElement
	&& (
		el.matches('[role="gridcell"i]')
		|| el.matches('[role="columnheader"i]')
	);
}

export function nextCellOrHeader(this: VWCCalendar, key: string, activeElement: HTMLElement): Element | null | undefined {
	const toggleRowQuery = (f: HTMLElement) => (f.matches('[role="columnheader"i]')
		? '[role="gridcell"i]'
		: '[role="columnheader"i]');

	switch (key) {
	case 'ArrowRight':
		return activeElement.nextElementSibling || activeElement.parentNode?.firstElementChild;
	case 'ArrowLeft':
		return activeElement.previousElementSibling || activeElement.parentElement?.lastElementChild;
	case 'ArrowUp':
	case 'ArrowDown': {
		const { children } = activeElement?.parentElement as HTMLElement;
		const i = Array.from(children).indexOf(activeElement);
		return this.shadowRoot?.querySelector(`${toggleRowQuery(activeElement as HTMLElement)}:nth-child(${i + 1})`);
	}
	default:
		return null;
	}
}

export function getSameBlockGridCell(this: VWCCalendar, key: string, activeElement: HTMLElement): Element | null | undefined {
	if (key === ARROW_DOWN) {
		const header = activeElement.closest('[role="columnheader"i]');
		const columnHeaders = this.shadowRoot?.querySelectorAll('[role="columnheader"i]');
		const i = (columnHeaders && header && Array.from(columnHeaders).indexOf(header)) || 0;
		return this.shadowRoot?.querySelector(`[role="gridcell"i]:nth-child(${i + 1})`);
	}
	return undefined;
}

interface CalendarEventContext {
	day: number;
	time: number;
}

export function getEventContext(e: Event): CalendarEventContext {
	const path = e.composedPath();
	const [firstEl] = path;
	if (firstEl instanceof HTMLElement) {
		const cellOrHeader = firstEl.closest('[role="gridcell"i]') || firstEl.closest('[role="columnheader"i]');
		console.log(cellOrHeader);
	}

	return {
		day: 2,
		time: 3
	};
}
