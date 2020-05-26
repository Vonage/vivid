async function resolveVariableFontsCSS(): Promise<string> {
  return (await import('./fonts-variable.css')).style.cssText;
}

async function resolveStaticFontsCSS(): Promise<string> {
  return (await import('./fonts-static.css')).style.cssText;
}

async function init(): Promise<void> {
  const st = performance.now();
	const variableSupported = CSS.supports && CSS.supports('font-variation-settings', '"wdth" 9');

  const cssText = await (variableSupported ? resolveVariableFontsCSS() : resolveStaticFontsCSS());
  const ds = document.createElement('style');
  ds.type = 'text/css';
  ds.innerHTML = cssText;
  document.body.appendChild(ds);
  console.info(
    `Vivid Fonts (${variableSupported ? 'variable' : 'static'}) initialization took ${Math.floor(
      performance.now() - st,
    )}ms`,
  );
}

export default Object.freeze({
  init: init,
});

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