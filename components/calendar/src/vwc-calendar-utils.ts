import { VWCCalendar } from './vwc-calendar';


export const TotalHours = 24;

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
	day?: number;
	hour?: number;
}

function getDay(e: Event): number | undefined {
	const path = e.composedPath();
	const [el] = path;
	if (!(el instanceof HTMLElement)) {
		return undefined;
	}

	const query = {
		cell: '[role="gridcell"i]',
		header: '[role="columnheader"i]',
	};

	const cellOrHeader = el.closest(query.cell) || el.closest(query.header);
	if (cellOrHeader?.matches(query.cell) || cellOrHeader?.matches(query.header)) {
		const { parentElement } = cellOrHeader;
		return parentElement?.children && Array.from(parentElement.children).indexOf(cellOrHeader);
	}

	return undefined;
}

function getHour(e: Event): number | undefined {
	if (!(e instanceof MouseEvent)) {
		return undefined;
	}

	const path = e.composedPath();
	const [el] = path;

	if (!(el instanceof HTMLElement)) {
		return undefined;
	}

	const rowHeaderOrCell = el.closest('.row-headers') || el.closest('[role="gridcell"i]');
	const boundingClientRect = rowHeaderOrCell?.getBoundingClientRect();

	if (!boundingClientRect?.y) {
		return undefined;
	}

	const offsetY = e.clientY - boundingClientRect.y;
	const hourHeight = boundingClientRect.height / TotalHours;
	const hour = offsetY / hourHeight;

	return Math.round((hour + Number.EPSILON) * 100) / 100;
}

const isEmptyObject = (obj: Record<string, unknown>): obj is Record<string, never> => Object.keys(obj).length === 0 && obj.constructor === Object;

export function getEventContext(e: Event): CalendarEventContext | null {
	const day = getDay(e);
	const hour = getHour(e);


	const context = {
		...(day != undefined && { day }),
		...(hour != undefined && { hour }),
	};

	return (!isEmptyObject(context) && context) || null;
}
