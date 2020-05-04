export {
	prepareFont,
	InitOptions
}

interface InitOptions {

}

async function resolveFontResources(variant: boolean): Promise<string> {
	let css;
	if (variant) {
		css = await import('./vari-fonts.css');
	} else {
		css = await import('./stat-fonts.css');
	}
	return css.style.cssText;
}

async function prepareFont(options: InitOptions): Promise<void> {
	if (options) {
		//	TODO: resolve custom fonts origins / binary in the options
	}
	const variantSupported = CSS.supports && CSS.supports('font-variation-settings', '"wdth" 9');
	const css = await resolveFontResources(variantSupported);
	const ds = document.createElement('style');
	ds.type = 'text/css';
	ds.innerHTML = css;
	document.body.appendChild(ds);
}
