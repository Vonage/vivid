import { VWCTextField } from './vwc-textfield';
import { VWCMenu } from '@vonage/vwc-menu';
import { isEventMulti } from '@material/mwc-list';
import { SelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { VWCListItem } from '@vonage/vwc-list/vwc-list-item';
// import { pipe } from 'ramda';
import { fromEvent, merge } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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

	// const input = this.shadowRoot?.querySelector('input');
	// input?.addEventListener('focus', onFocus.bind(null, menu));
	// input?.addEventListener('blur', onBlur.bind(null, menu));

	// const textfieldFocuses$ = fromEvent(this, 'focus');
	// textfieldFocuses$.subscribe(console.log);

	// const menuOpened$ = fromEvent(menu, 'opened').pipe(
	// 	tap(() => console.log('menuOpened'))
	// );
	// const menuClosed$ = fromEvent(menu, 'closed');

	const textfieldBodyClicks$ = fromEvent(document.body, 'click', {
		capture: true,
	}).pipe(
		filter((e) => (e?.target as HTMLElement) === this),
		tap((e) => console.log('bodyClicks', e))
	);
	textfieldBodyClicks$.subscribe((e) => e.stopImmediatePropagation());

	// // textfieldFocuses$.subscribe(() => console.log('textfieldFocuses'));
	// const preventPrematureMenuClose$ = textfieldMousedowns$.pipe(
	// 	// textfieldFocuses$,
	// 	// switchMap(() => menuOpened$),
	// 	// tap(() => console.log(menu.open)),
	// 	switchMap(() =>
	// 		bodyClicks$.pipe(
	// 			tap(() => console.log('-- stopImmediatePropagation')),
	// 			tap((e) => e.stopImmediatePropagation()),
	// 			take(1)
	// 		)
	// 	)
	// );

	// preventPrematureMenuClose$.subscribe(() => {
	// 	console.log('--- PREVENT BODY CLICKS ---');
	// 	// e.stopImmediatePropagation();
	// });

	const textfieldMousedowns$ = fromEvent(this, 'mousedown').pipe(
		tap(() => console.log('textfieldMousedowns'))
	);
	const textfieldMousedownsWhileActive$ = textfieldMousedowns$.pipe(
		filter(() => this === document.activeElement)
	);

	const textfieldFocuses$ = fromEvent(this, 'focus').pipe(
		tap(() => console.log('textfieldFocuses'))
	);

	merge(textfieldFocuses$, textfieldMousedownsWhileActive$)
		.pipe(
			filter(Boolean.bind(menu?.items?.length)),
			filter(() => !menu.open)
		)
		.subscribe(() => menu.show());

	const textfieldBlurs$ = fromEvent(this, 'blur').pipe(
		tap(() => console.log('textfieldBlurs'))
	);
	textfieldBlurs$.pipe(filter(() => menu.open)).subscribe(() => menu.close());

	// const preventPrematureClickClose = (e: MouseEvent) => {
	// 	console.log('MUAA');
	// 	if (menu.open) {
	// 		e.stopImmediatePropagation();
	// 	}
	// };

	// document.body.addEventListener('click', preventPrematureClickClose, {
	// 	capture: true,
	// 	once: true,
	// });

	const menuMousedowns$ = fromEvent(menu, 'mousedown');
	// prevent blur of textfield on menu mousedown
	menuMousedowns$.subscribe((e) => {
		console.log('mousedown prevent blur of textfield on menu mousedown');
		e.preventDefault();
	});

	const menuSelections$ = fromEvent<SelectedEvent>(menu, 'selected');
	const menuSelectedItem$ = menuSelections$.pipe(
		tap(() => console.log('menu select value')),
		filter(pipe(isEventMulti, not)),
		tap(console.log),
		map(({ target, detail: { index } }) => (target as VWCMenu)?.items[index])
	);
	menuSelectedItem$.subscribe(({ value, textContent }: VWCListItem) => {
		// TODO conditionally fallbacks to textContent - should be unit tested
		value ||= textContent || '';
		this.value = value;
	});

	// menuOpened$
	// 	.pipe(switchMapTo(menuMousedowns$), takeUntil(menuClosed$))
	// 	.subscribe(() => console.log('menuOpened and mouse down'));

	// this.addEventListener('focus', openList.bind(null, menu));

	// // prevent blur of textfield on menu mousedown
	// // menu?.addEventListener(
	// // 	'mousedown',
	// // 	(e: MouseEvent) => {
	// // 		console.log('ARGGG');
	// // 		e.preventDefault();
	// // 	},
	// // 	{
	// // 		capture: true,
	// // 	}
	// // );

	// // this.addEventListener('blur', onBlur.bind(null, menu));

	// (menu as any).addEventListener(
	// 	'selected',
	// 	pipe(onSelected, (value) => {
	// 		this.value = value || '';
	// 		menu.close();
	// 	})
	// );
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
	menu.quick = true;
}

// function openList(menu: VWCMenu): void {
// 	if (!menu?.items?.length) {
// 		return;
// 	}

// 	const preventPrematureClickClose = (e: MouseEvent) => {
// 		console.log('MUAA');
// 		if (menu.open) {
// 			e.stopImmediatePropagation();
// 		}
// 	};

// 	document.body.addEventListener('click', preventPrematureClickClose, {
// 		capture: true,
// 		once: true,
// 	});

// 	// menu.addEventListener(
// 	// 	'closed',
// 	// 	() => {
// 	// 		document.body.removeEventListener('click', preventPrematureClickClose);
// 	// 	},
// 	// 	{ once: true }
// 	// );

// 	// setTimeout(() => {
// 	menu.show();
// 	// }, 500);
// }

// function preventSomething(): (this: HTMLElement, ev: MouseEvent) => any {
// 	return (e) => e.stopImmediatePropagation();
// }

// function onBlur(menu: VWCMenu): void {
// 	document.body.removeEventListener('click', preventMenuCloseByClick);
// 	if (menu.open) {
// 		menu.close();
// 	}
// }

// function preventMenuCloseByClick(e: Event) {
// 	e.stopImmediatePropagation();
// }

// function onSelected(e: SelectedEvent): string | undefined {
// 	e.preventDefault();
// 	if (isEventMulti(e)) {
// 		// Typescript will infer evt as {index: Set<number>, diff: IndexDiff}
// 		console.warn("multi property isn't supported for autocomplete");
// 		return;
// 	}
// 	// Typescript will infer evt as {index: number, diff: undefined}
// 	const {
// 		target,
// 		detail: { index },
// 	} = e;
// 	const { value } = (target as VWCMenu)?.items[index];
// 	return value;
// }
