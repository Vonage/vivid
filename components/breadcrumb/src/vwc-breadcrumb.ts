import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vivid/breadcrumb/index.js';

const style = document.createElement('style');
style.innerHTML = `
	vwc-breadcrumb {
		--icon-size: 12px;
	}
`;
document.head.appendChild(style);

