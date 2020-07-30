const tmpTemple = document.createElement('template');

export function textToDocumentFragment(html) {
	if (!html) {
		throw new Error(`html parameter MUST NOT be NULL nor EMPTY, got ${html}`);
	}
	tmpTemple.innerHTML = html;
	const result = tmpTemple.content.cloneNode(true);
	tmpTemple.innerHTML = '';
	return result;
}

export function textToDomToParent(html, parentNode = document.body) {
	const documentFragment = textToDocumentFragment(html);
	const result = Array.from(documentFragment.children);
	parentNode.appendChild(documentFragment);
	return result;
}

export async function waitNextTask() {
	return new Promise(resolve => setTimeout(resolve));
}

export async function waitInterval(millis) {
	await new Promise(resolve => setTimeout(resolve, millis));
}
