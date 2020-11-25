import { VWCTextField } from './vwc-textfield';
import { VWCMenu } from '@vonage/vwc-menu';
import { isEventMulti } from '@material/mwc-list';
import { SelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { VWCListItem } from '@vonage/vwc-list/vwc-list-item';
import { fromEvent, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { not, pipe } from 'ramda';

// TODO support for eager, lazy, debounce

export function handleList(this: VWCTextField): void {
	// TODO (Weakrefs) cleanup all listeners on handleList if already initialized - if subscriptions, use array if subscriptions with a hook on observables...

	if (!this.list) {
		return;
	}

	const menu = getMenu(this.list);

	// is valid vwc-menu component
	if (!menu || !(menu instanceof VWCMenu)) {
		return;
	}

	configureMenuSettings(menu, this);

	// #region EVENT OBSERVABLES
	const textfieldMousedowns$ = fromEvent(this, 'mousedown');
	const textfieldFocuses$ = fromEvent(this, 'focus');
	const textfieldBlurs$ = fromEvent(this, 'blur');
	const textfieldBodyClicks$ = fromEvent(document.body, 'click', {
		capture: true,
	}).pipe(filter((e) => (e?.target as HTMLElement) === this));
	const menuMousedowns$ = fromEvent(menu, 'mousedown');
	const menuSelections$ = fromEvent<SelectedEvent>(menu, 'selected');
	// #endregion

	// #region COMPOSITE OBSERVABLES
	const textfieldMousedownsWhileActive$ = textfieldMousedowns$.pipe(
		filter(() => this === document.activeElement)
	);

	const menuOpenTriggers$ = merge(
		textfieldFocuses$,
		textfieldMousedownsWhileActive$
	).pipe(
		filter(Boolean.bind(menu?.items?.length)),
		filter(() => !menu.open)
	);

	const menuSelectedItem$ = menuSelections$.pipe(
		filter(pipe(isEventMulti, not)),
		map(
			({ target, detail: { index } }) =>
				(target as VWCMenu)?.items[index as number]
		)
	);

	// #endregion

	// #region SUBSCRIPTIONS
	textfieldBodyClicks$.subscribe((e) => e.stopImmediatePropagation());
	menuOpenTriggers$.subscribe(() => menu.show());
	textfieldBlurs$.pipe(filter(() => menu.open)).subscribe(() => menu.close());

	// prevent blur of textfield on menu mousedown
	menuMousedowns$.subscribe((e) => e.preventDefault());
	menuSelectedItem$.subscribe(({ value, textContent }: VWCListItem) => {
		// TODO conditionally fallbacks to textContent - should be unit tested
		value ||= textContent || '';
		this.value = value;
	});

	// #endregion
}

// FUNCTIONS
////////////
function getMenu(id: string) {
	return document.getElementById(id) as VWCMenu | undefined;
}

function configureMenuSettings(menu: VWCMenu, anchor: HTMLElement) {
	menu.anchor = anchor;
	menu.defaultFocus = 'NONE';
	menu.corner = 'BOTTOM_START';
	menu.multi = false;
	// menu.quick = true;
}
