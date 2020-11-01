import '@vonage/vwc-file-picker';
import {
	waitNextTask,
	textToDomToParent,
	randomAlpha,
	isSafari,
} from '../../../test/test-helpers.js';
import {
	assertFilesCount,
	simulateFilesSelect,
	simulateFilesDrop,
} from './file-picker-utils.test.js';

const VWC_COMPONENT = 'vwc-file-picker';

describe('file picker - count files hint', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('should have initial counter set to 0 and no badge rendered', async () => {
		addedElements = await create();
		assertFilesCount(addedElements[0], 0, false);
	});

	it('should have counter set to number when valid choice', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await create(true);
		const files = 4;
		await simulateFilesSelect(addedElements[0], files);

		assertFilesCount(addedElements[0], files, true);
	});

	it('should have counter set to number when valid drop', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await create(true);
		const files = 4;
		await simulateFilesDrop(addedElements[0], files);

		assertFilesCount(addedElements[0], files, true);
	});

	it('should have counter reset to 0 and no badge rendered when invalid drop (multiple)', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await create(false);

		await simulateFilesSelect(addedElements[0], 1);
		assertFilesCount(addedElements[0], 1, true);

		//	do invalid drop
		const files = 4;
		await simulateFilesDrop(addedElements[0], files);

		assertFilesCount(addedElements[0], 0, false);
	});
});

async function create(mulitple) {
	const filePickerName = randomAlpha();
	const addedElements = textToDomToParent(`
		<${VWC_COMPONENT}>
			<input type="file" name="${filePickerName}" ${mulitple ? 'multiple' : ''}/>
		</${VWC_COMPONENT}>
	`);
	await waitNextTask();
	return addedElements;
}
