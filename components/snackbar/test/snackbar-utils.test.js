export {
	showAndWait
};

async function showAndWait(snackbar) {
	return new Promise((r) => {
		snackbar.addEventListener('opened', r);
		snackbar.show();
	});
}
