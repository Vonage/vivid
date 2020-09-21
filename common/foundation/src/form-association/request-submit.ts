export function requestSubmit(form: HTMLFormElement) {
	if (form.requestSubmit) {
		form.requestSubmit();
		return;
	}
	const fakeButton = document.createElement('button');
	fakeButton.style.display = 'none';
	form.appendChild(fakeButton);
	fakeButton.click();
	fakeButton.remove();
}
