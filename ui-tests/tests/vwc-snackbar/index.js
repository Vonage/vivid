import '@vonage/vwc-snackbar';


const message = 'Pascal argues that a rational person should live as though God exists and seek to believe in God.';

export async function createElementVariations(wrapper) {
	const badgeElementWrapper = document.createElement('div');
	badgeElementWrapper.innerHTML =
		`
<vwc-snackbar connotation="cta" icon="megaphone-solid" message="${message}">
	<vwc-button slot="action">Action</vwc-button>
</vwc-snackbar>
`;
	wrapper.appendChild(badgeElementWrapper);
}


