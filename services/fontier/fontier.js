export { prepareFont };

function prepareFont(options) {
	//	TODO: resolve custom fonts origin in the options
	const variantSupported = CSS.supports('font-variation-settings', '"wdth" 9');
	const ds = document.createElement('style');
	ds.type = 'text/css';
	ds.innerHTML = variantSupported ? variantFontsCSS : staticFontsCSS;
	document.body.appendChild(ds);
}

const variantFontsCSS = `
	@font-face {
		font-family: 'VonageMain';
		src:  url('fonts/variant/Spezia_Web_Complete_Upright_Trial.woff2') format('woff2-variations');
		font-style: normal;
		font-weight: 100 900;
	}

	@font-face {
		font-family: 'VonageMain';
		src:  url('fonts/variant/Spezia_Web_Complete_Italic_Trial.woff2') format('woff2-variations');
		font-style: italic;
		font-weight: 100 900;
	}
`;

const staticFontsCSS = `
	/*
		regular
	*/
	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-Regular.woff2') format('woff2');
		font-style: normal;
		font-weight: 400;
	}

	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-RegularItalic.woff2') format('woff2');
		font-style: italic;
		font-weight: 400;
	}

	/*
		light
	*/
	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-Light.woff2') format('woff2');
		font-style: normal;
		font-weight: 300;
	}

	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-LightItalic.woff2') format('woff2');
		font-style: italic;
		font-weight: 300;
	}

	/*
		extra light
	*/
	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-ExtraLight.woff2') format('woff2');
		font-style: normal;
		font-weight: 100;
	}

	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-ExtraLightItalic.woff2') format('woff2');
		font-style: italic;
		font-weight: 100;
	}

	/*
		bold
	*/
	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-Bold.woff2') format('woff2');
		font-style: normal;
		font-weight: 600;
	}

	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-BoldItalic.woff2') format('woff2');
		font-style: italic;
		font-weight: 600;
	}

	/*
		extra bold
	*/
	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-ExtraBold.woff2') format('woff2');
		font-style: normal;
		font-weight: 800;
	}

	@font-face {
		font-family: 'VonageMain';
		src: url('fonts/static/WorkSans-ExtraBoldItalic.woff2') format('woff2');
		font-style: italic;
		font-weight: 800;
	}
`;