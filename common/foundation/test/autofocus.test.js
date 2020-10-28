import { handleAutofocus } from '@vonage/vvd-foundation/general-utils.js';

describe('autofocus', () => {
	it('should NOT throw on invalid input', async () => {
		handleAutofocus();
		handleAutofocus(null);
		handleAutofocus('some');
	});

	it('should focus on target if none other focused in parent', () => {});

	it('should NOT "steal" focus from already focused element in parent in any', () => {});
});
