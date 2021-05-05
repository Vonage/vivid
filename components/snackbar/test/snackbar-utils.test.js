export {
	showAndWait,
	assertEventWithReason
};

async function showAndWait(snackbar) {
	return new Promise((r) => {
		snackbar.addEventListener('opened', r);
		snackbar.show();
	});
}

function assertEventWithReason(event, eventType, reason) {
	expect(event).exist;
	expect(event.type).equal(eventType);
	expect(event.detail).exist;
	expect(event.detail.reason).equal(reason);
}
