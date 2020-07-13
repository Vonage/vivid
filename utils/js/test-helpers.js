const tmpTemple = document.createElement('template');

export function htmlToDom(html) {
	if (!html) {
		throw new Error(`html parameter MUST NOT be NULL nor EMPTY, got ${html}`);
	}
	tmpTemple.innerHTML = html;
	const result = tmpTemple.content.cloneNode(true);
	tmpTemple.innerHTML = '';
	return result;
}

export async function waitNextTask() {
	return new Promise(resolve => setTimeout(resolve));
}

export async function activateComponent(elementTemplate) {
	const docFragContainer = htmlToDom(elementTemplate);
	const actualElement = docFragContainer.firstElementChild;
	document.body.appendChild(docFragContainer);
	await waitNextTask();
	return actualElement;
}
