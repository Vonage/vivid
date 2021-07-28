import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-badge';
import '@vonage/vwc-snackbar';
import '@vonage/vwc-button';


const message = 'Pascal argues that a rational person should live as though God exists and seek to believe in God.';

export async function createElementVariations(wrapper) {
	wrapper.innerHTML = `
		<vwc-snackbar dismissible connotation="cta" icon="megaphone-solid" message="${message}">
			<vwc-button slot="action">Action</vwc-button>
		</vwc-snackbar>
	`;

	await new Promise((resolve) => {
		const snackbar = wrapper.querySelector('vwc-snackbar');
		snackbar.addEventListener('opened', resolve);
		snackbar.show();
	});
	await vvdCore.settled;
}
