import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-badge';


export async function createElementVariations(wrapper) {
	const badgeElementWrapper = document.createElement('div');
	badgeElementWrapper.innerHTML = `
		<vwc-badge connotation="cta" layout="filled" text="my badge"></vwc-badge>
		<vwc-badge connotation="cta" layout="soft" text="my badge"></vwc-badge>
		<vwc-badge connotation="alert" layout="outlined" text="my badge"></vwc-badge>
		<vwc-badge connotation="alert" layout="filled" shape="pill" text="my badge"></vwc-badge>
		<vwc-badge connotation="success" layout="filled" dense text="my badge"></vwc-badge>
		<vwc-badge connotation="info" layout="filled" enlarged text="my badge"></vwc-badge>
		<vwc-badge connotation="primary" layout="soft" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-up-line"></vwc-badge>
		<vwc-badge connotation="warning" layout="outlined" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-up-line"></vwc-badge>
		<vwc-badge layout="outlined" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-up-line"></vwc-badge>
		<vwc-badge layout="filled" shape="pill" text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-up-line"></vwc-badge>
		<vwc-badge connotation="success" layout="soft" dense text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-up-line"></vwc-badge>
		<vwc-badge connotation="alert" layout="filled" enlarged text="my badge" icon="thumbs-down-line" iconTrailing="thumbs-up-line"></vwc-badge>
	`;
	wrapper.appendChild(badgeElementWrapper);

	await vvdCore.settled;
}


