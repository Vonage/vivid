import '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import { snapshotTheWholePage } from '../../utils/testPageUtils';


const message = 'Pascal argues that a rational person should live as though God exists and seek to believe in God.';

export async function createElementVariations(wrapper) {
	snapshotTheWholePage(wrapper);
	wrapper.innerHTML = `
		<vwc-snackbar dismissible connotation="info" icon="megaphone-solid" message="${message}">
			<vwc-button slot="action">Action</vwc-button>
		</vwc-snackbar>
	`;

	await new Promise((resolve) => {
		const snackbar = wrapper.querySelector('vwc-snackbar');
		snackbar.addEventListener('opened', resolve);
		snackbar.timeoutMs = -1;
		snackbar.show();
	});
}
