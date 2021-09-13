import '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import { snapshotTheWholePage } from '../../utils/testPageUtils';


function element(strings) {
	const heading = 'New version available!';
	const message = 'There is something we wanna let you know ';

	return `
			<vwc-snackbar timeoutMs="-1" open message="${message}" header="${heading}" ${strings[0]}">
				<vwc-button layout="outlined" shape="pill" slot="action">Action</vwc-button>
			</vwc-snackbar>
		`;
}

export async function createElementVariations(wrapper) {
	snapshotTheWholePage(wrapper);
	wrapper.innerHTML = `
		${element`connotation="alert" position="TOP-START" icon="error-solid"`}
		${element`connotation="announcement" position="TOP-CENTER" icon="megaphone-solid"`}
		${element`connotation="info" position="TOP-END" dismissible icon="help-solid"`}
		${element`connotation="success" position="BOTTOM-START" legacy icon="check-solid"`}
		${element`connotation="warning" position="BOTTOM-CENTER" legacy dismissible icon="warning-solid"`}
		${element`connotation="info" position="BOTTOM-END" legacy dismissible icon="megaphone-solid"`}
	`;

	const snackbars = wrapper.querySelectorAll('vwc-snackbar');
	const snackbarsOpened = Array.from(snackbars).map(snackbar => new Promise(resolve => snackbar.addEventListener('opened', resolve)));
	await Promise.all(snackbarsOpened);
}
