import { once, always } from 'ramda';

export const init = once(function ():Promise<boolean> {
	return import('./vvd-fonts.css.js')
		.then(({ style: { cssText } }) => {
			document
				.querySelectorAll('head')
				.forEach((headEl) => {
					headEl.appendChild(
						(function () {
							const styleEl = document.createElement('style');
							styleEl.innerHTML = cssText;
							return styleEl;
						})()
					);
				});
		})
		.then(always(true));
});
