import { VWCTextField } from './vwc-textfield';
import { VWCMenu } from '@vonage/vwc-menu';

export function listHandler(this: VWCTextField): void {
	if (this.list) {
		const menu = document.getElementById(this.list) as VWCMenu | undefined;
		// is vwc-menu
		if (menu && 'defaultFocus' in menu) {
			// prevent default focus & keep textfield focus
			menu.defaultFocus = 'NONE';

			const input = this.shadowRoot?.querySelector('input');
			input?.addEventListener('focus', function () {
				menu?.show();
			});
			input?.addEventListener('blur', function () {
				menu?.close();
			});
		}
		// eager lazy debounce
	}
}
