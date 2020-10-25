import '@vonage/vwc-file-picker';
import { isSafari } from '../../../test/test-helpers.js';
import {
	createWithInput,
	getInput,
	simulatePasteFiles,
} from './file-picker-utils.test.js';

describe('file picker - clipboard paste event', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('should have correct files when paste succeeds', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await createWithInput(true);
		const fi = getInput(addedElements[0]);
		const files = 4;
		await simulatePasteFiles(addedElements[0], files);

		expect(fi.files.length).equal(files);
	});

	it('should have 0 files when paste is invalid (many for singular)', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await createWithInput(false);
		const fi = getInput(addedElements[0]);
		const files = 4;
		await simulatePasteFiles(addedElements[0], files);

		expect(fi.files.length).equal(0);
	});
});
