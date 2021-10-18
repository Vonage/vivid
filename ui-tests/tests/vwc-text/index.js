import '@vonage/vwc-text';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-text font-face="body-1" connotation="primary">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-1-bold" connotation="cta">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-1-code" connotation="announcement">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-1-link" connotation="info">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2" connotation="success">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2-bold" connotation="alert">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2-code" connotation="primary">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2-link" connotation="cta">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="button" connotation="announcement">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="button-dense" connotation="info">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="button-enlarge" connotation="success">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption" connotation="alert">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption-bold" connotation="primary">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption-code" connotation="cta">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption-link" connotation="announcement">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="headline-1" connotation="info">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="headline-2" connotation="success">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="subtitle-1" connotation="alert">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="subtitle-2" connotation="primary">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="title-1" connotation="cta">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="title-2" connotation="announcement">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="headline-1" connotation="info"><h1>Headline-1 with H1 wrapping inside</h1></vwc-text>
		<vwc-text font-face="headline-2" connotation="success"><h2>Headline-2 with H2 wrapping inside</h2></vwc-text>
		<vwc-text font-face="headline-1" connotation="primary">Headline-1 with no wrapping inside</vwc-text>
		<vwc-text font-face="body-1" connotation="primary">
			<p>The quick brown fox <vwc-text font-face="body-1-link" connotation="info"><a>In a link</a></vwc-text> jumps over the lazy dog
			<vwc-text font-face="body-1-code" connotation="announcement">css is awesome</vwc-text> jumps over the lazy dog</p>
		</vwc-text>
		<vwc-text font-face="subtitle-1" connotation="alert"><h3>The quick brown fox jumps over the lazy dog</h3></vwc-text>
		`;
	wrapper.appendChild(textElementWrapper);
}
