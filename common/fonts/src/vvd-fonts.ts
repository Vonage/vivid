async function resolveVariableFontsCSS(): Promise<string> {
	return (await import('./vari-fonts.css')).style.cssText;
}

async function resolveStaticFontsCSS(): Promise<string> {
	return (await import('./stat-fonts.css')).style.cssText;
}

async function prepareFonts() {
	const st = performance.now();
	const variableSupported = CSS.supports && CSS.supports('font-variation-settings', '"wdth" 9');
	const cssText = await (variableSupported ? resolveVariableFontsCSS() : resolveStaticFontsCSS());
	const ds = document.createElement('style');
	ds.type = 'text/css';
	ds.innerHTML = cssText;
	document.body.appendChild(ds);
	console.info(`Vivid Fonts (${variableSupported ? 'variable' : 'static'}) initialization took ${Math.floor(performance.now() - st)}ms`);
}

prepareFonts();