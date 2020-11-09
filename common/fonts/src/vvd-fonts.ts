export default Object.freeze({
	init: init,
});

const FONTS_BASE_URL_TOKEN = 'FONTS_BASE_URL',
	CDN_BASE_URL = '//dpnf5z0hinc7q.cloudfront.net/fonts/v1';

let INIT_PROMISE: Promise<Record<string, unknown>> | null = null;

async function init(): Promise<Record<string, unknown>> {
	if (!INIT_PROMISE) {
		INIT_PROMISE = new Promise((resolve, reject) => {
			// console.info('Vivid Fonts initialization start...');
			// const st = performance.now();

			const testElement = setupInitTestElement();
			const initialWidth = testElement.offsetWidth;

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
					return ensureInit(testElement, initialWidth);
				})
				.then(resolve)
				.catch(reject)
				.finally(() => {
					cleanInitTestElement(testElement);
					// console.info(
					// 	`Vivid Fonts initialization took ${Math.floor(performance.now() - st)}ms`
					// );
				});
		});
	}

	return INIT_PROMISE;
}

function setupInitTestElement(): HTMLElement {
	const result = document.createElement('span');
	result.textContent = 'wwwwwiiiii';
	result.style.cssText =
		'position:absolute;top:-999px;font-family:var(--vvd-font-family-spezia,monospace)';
	if (document.body) {
		document.body.appendChild(result);
	} else {
		document.addEventListener('DOMContentLoaded', () =>
			document.body.appendChild(result)
		);
	}
	return result;
}

async function ensureInit(
	testElement: HTMLElement,
	initialWidth: number
): Promise<Record<string, unknown>> {
	return new Promise((resolve) => {
		function innerTest() {
			if (testElement.offsetWidth === initialWidth) {
				setTimeout(innerTest, 25);
			} else {
				resolve({});
			}
		}
		innerTest();
	});
}

function cleanInitTestElement(testElement: HTMLElement): void {
	testElement.remove();
}

// !TODO when moving to cdn consider using the following
// <link rel="preconnect"
//       href="https://fonts.gstatic.com"
//       crossorigin />
// Then preloading the fonts and setting it to use display: swap:

// <link rel="preload"
//       as="style"
//       href="$CSS&display=swap" />
// ($CSS is the URL that Google gives you after you’ve selected which font you want).

// And finally we need to use a rather clever trick with the stylesheet:

// <link rel="stylesheet"
//       href="$CSS&display=swap"
//       media="print" onload="this.media='all'" />
