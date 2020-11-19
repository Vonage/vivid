import { VWCTextField } from './vwc-textfield';
import { VWCMenu } from '@vonage/vwc-menu';

export function listHandler(this: VWCTextField): void {
	if (this.list) {
		const menu = document.getElementById(this.list) as VWCMenu | undefined;
		// is vwc-menu
		if (menu && 'defaultFocus' in menu) {
			// prevent default focus & keep textfield focus
			menu.defaultFocus = 'NONE';
			menu.anchor = this;
			// menu.menuCorner = 'START';
			menu.corner = 'BOTTOM_START';
			menu.quick = true;

			const input = this.shadowRoot?.querySelector('input');
			input?.addEventListener('focus', onFocus.bind(null, menu));
			input?.addEventListener('blur', onBlur.bind(null, menu));
		}
		// eager lazy debounce
	}
}

function onFocus(menu: VWCMenu): void {
	document.body.addEventListener('click', preventMenuCloseByClick, {
		capture: true,
	});
	if (menu?.items?.length) {
		menu.show();
	}
}

function onBlur(menu: VWCMenu): void {
	document.body.removeEventListener('click', preventMenuCloseByClick);
	if (menu.open) {
		menu.close();
	}
}

function preventMenuCloseByClick(e: Event) {
	e.stopImmediatePropagation();
}
