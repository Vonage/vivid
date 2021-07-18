import '@vonage/vwc-text';


export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-text font-face="body-1">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-1-bold">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-1-code">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-1-link">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2-bold">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2-code">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="body-2-link">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="button">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="button-dense">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="button-enlarge">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption-bold">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption-code">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="caption-link">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="headline-1">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="headline-2">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="subtitle-1">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="subtitle-2">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="title-1">The quick brown fox jumps over the lazy dog</vwc-text>
		<vwc-text font-face="title-2">The quick brown fox jumps over the lazy dog</vwc-text>
		`;
	wrapper.appendChild(textElementWrapper);
}


