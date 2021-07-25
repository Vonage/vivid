import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-badge';


export async function createElementVariations(wrapper) {
	const badgeElementWrapper = document.createElement('div');
	badgeElementWrapper.innerHTML = `
		<vwc-badge connotation="cta" layout="filled" text="my badge"></vwc-badge>
		<vwc-badge connotation="cta" layout="soft" text="my badge"></vwc-badge>
		<vwc-badge layout="outlined" text="my badge"></vwc-badge>
		<vwc-badge layout="filled" shape="pill" text="my badge"></vwc-badge>
		<vwc-badge layout="filled" dense text="my badge"></vwc-badge>
		<vwc-badge layout="filled" enlarged text="my badge"></vwc-badge>
		<vwc-badge connotation="cta" layout="filled" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-down-line"></vwc-badge>
		<vwc-badge connotation="cta" layout="soft" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-down-line"></vwc-badge>
		<vwc-badge layout="outlined" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-down-line"></vwc-badge>
		<vwc-badge layout="filled" shape="pill" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-down-line"></vwc-badge>
		<vwc-badge layout="filled" dense text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-down-line"></vwc-badge>
		<vwc-badge layout="filled" enlarged text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-down-line"></vwc-badge>
	`;
	wrapper.appendChild(badgeElementWrapper);

	await vvdCore.settled;
}


