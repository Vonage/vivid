export {
	getEventsCollector,
	getInnerInput,
	notifyInput
};

function getEventsCollector(eventType, textfield) {
	const result = [];
	textfield.addEventListener(eventType, e => result.push(e));
	return result;
}

function getInnerInput(textfield) {
	const result = textfield.querySelector('input');
	if (!result) {
		throw new Error('failed to obtain inner input from textfield, not yet fully initialized?');
	}
	return result;
}

function notifyInput(texfield) {
	const innerInput = getInnerInput(texfield);
	innerInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
}
