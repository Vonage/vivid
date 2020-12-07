export default Object.freeze({
	init: init,
});

const READY_PROMISE_TIMEOUT = 12000,
	FONTS_BASE_URL_TOKEN = 'FONTS_BASE_URL',
	CDN_BASE_URL = '//assets.vivid.vonage.com/fonts/v1';

let INIT_PROMISE: Promise<Record<string, unknown>> | null = null;

async function init(): Promise<Record<string, unknown>> {
	if (!INIT_PROMISE) {
		INIT_PROMISE = new Promise((resolve, reject) => {
			// console.info('Vivid Fonts initialization start...');
			// const st = performance.now();

			const testElements = setupInitTestElements();

			import('./vvd-fonts.css.js')
				.then((cssDefs) => {
					const cssText = cssDefs.style.cssText;
					const finalCSS = cssText.replace(
						new RegExp(FONTS_BASE_URL_TOKEN, 'g'),
						CDN_BASE_URL
					);
					const ds = document.createElement('style');
					ds.innerHTML = finalCSS;
					document.head.appendChild(ds);
					return ensureInit(testElements);
				})
				.then(resolve)
				.catch(reject)
				.finally(() => {
					cleanInitTestElements(testElements);
					// console.info(
					// 	`Vivid Fonts initialization took ${Math.floor(performance.now() - st)}ms`
					// );
				});
		});
	}

	return INIT_PROMISE;
}

function setupInitTestElements(): HTMLElement[] {
	const result = ['var(--vvd-font-family-spezia)', 'initial'].map((ff) => {
		const e = document.createElement('span');
		e.textContent = 'testing text to measure font appliance';
		e.style.cssText = `position:absolute;top:-999px;font-family:${ff}`;
		return e;
	});
	if (document.body) {
		result.forEach((e) => document.body.appendChild(e));
	} else {
		document.addEventListener(
			'DOMContentLoaded',
			() => result.forEach((e) => document.body.appendChild(e)),
			{ once: true }
		);
	}
	return result;
}

async function ensureInit(
	testElements: HTMLElement[]
): Promise<Record<string, unknown>> {
	return new Promise((resolve, reject) => {
		const pollStart = Date.now();
		let pollDuration;
		function innerTest() {
			if (testElements[0].offsetWidth !== testElements[1].offsetWidth) {
				resolve({});
			} else if ((pollDuration = Date.now() - pollStart) > READY_PROMISE_TIMEOUT) {
				reject(new Error(`fonts init timed out after ${pollDuration}ms`));
			} else {
				setTimeout(innerTest, 25);
			}
		}
		innerTest();
	});
}

function cleanInitTestElements(testElements: HTMLElement[]): void {
	testElements.forEach((e) => e.remove());
}
