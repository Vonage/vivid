import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-badge';


export async function createElementVariations(wrapper) {
	const badgeElementWrapper = document.createElement('div');
	badgeElementWrapper.innerHTML =
		`
<vwc-badge connotation="cta" layout="filled">I'm a badge</vwc-badge>
<vwc-badge connotation="cta" layout="soft">I'm a badge</vwc-badge>
<vwc-badge layout="outlined">I'm a badge</vwc-badge>
<vwc-badge layout="filled" shape="pill">I'm a badge</vwc-badge>
<vwc-badge layout="filled" dense="">I'm a badge</vwc-badge>
<vwc-badge layout="filled" enlarged="">I'm a badge</vwc-badge>
`;
	wrapper.appendChild(badgeElementWrapper);

	await vvdCore.settled;
}


