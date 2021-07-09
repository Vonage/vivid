import '@vonage/vwc-text';


export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-text font-face="body-1">lorem ipsum</vwc-text>
		<vwc-text font-face="body-1-bold">lorem ipsum</vwc-text>
		<vwc-text font-face="body-1-code">lorem ipsum</vwc-text>
		<vwc-text font-face="body-1-link">lorem ipsum</vwc-text>
		<vwc-text font-face="body-2">lorem ipsum</vwc-text>
		<vwc-text font-face="body-2-bold">lorem ipsum</vwc-text>
		<vwc-text font-face="body-2-code">lorem ipsum</vwc-text>
		<vwc-text font-face="body-2-link">lorem ipsum</vwc-text>
		<vwc-text font-face="button">lorem ipsum</vwc-text>
		<vwc-text font-face="button-dense">lorem ipsum</vwc-text>
		<vwc-text font-face="button-enlarge">lorem ipsum</vwc-text>
		<vwc-text font-face="caption">lorem ipsum</vwc-text>
		<vwc-text font-face="caption-bold">lorem ipsum</vwc-text>
		<vwc-text font-face="caption-code">lorem ipsum</vwc-text>
		<vwc-text font-face="caption-link">lorem ipsum</vwc-text>
		<vwc-text font-face="headline-1">lorem ipsum</vwc-text>
		<vwc-text font-face="headline-2">lorem ipsum</vwc-text>
		<vwc-text font-face="subtitle-1">lorem ipsum</vwc-text>
		<vwc-text font-face="subtitle-2">lorem ipsum</vwc-text>
		<vwc-text font-face="title-1">lorem ipsum</vwc-text>
		<vwc-text font-face="title-2">lorem ipsum</vwc-text>
		`;
	wrapper.appendChild(textElementWrapper);
}


