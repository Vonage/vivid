import '@vonage/vwc-text';
import * as stories from '@vonage/vwc-textfield/stories/textfield-all.stories';


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
		`;
	wrapper.appendChild(textElementWrapper);
}


