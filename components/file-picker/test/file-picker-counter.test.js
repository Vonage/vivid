import '@vonage/vwc-file-picker';
import {
	waitNextTask,
	textToDomToParent,
	randomAlpha,
	isSafari,
} from '../../../test/test-helpers.js';
import {
	getFilesCount,
	simulateChoseFiles,
	simulateDropFiles,
} from './file-picker-utils.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const VWC_COMPONENT = 'vwc-file-picker';

describe('file picker - count files hint', () => {
	let addedElements = [];

	afterEach(() => {
		addedElements.forEach((elm) => elm.remove());
	});

	it('should have initial counter show 0', async () => {
		addedElements = await create();
		const filesCount = getFilesCount(addedElements[0]);
		expect(filesCount).equal(0);
	});

	it('should have counter set to number when valid choice', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await create(true);
		const files = 4;
		await simulateChoseFiles(addedElements[0], files);

		const filesCount = getFilesCount(addedElements[0]);
		expect(filesCount).equal(files);
	});

	it('should have counter set to number when valid drop', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await create(true);
		const files = 4;
		await simulateDropFiles(addedElements[0], files);

		const filesCount = getFilesCount(addedElements[0]);
		expect(filesCount).equal(files);
	});

	it('should have counter reset to 0 when invalid drop (multiple)', async () => {
		if (isSafari()) {
			return;
		}
		addedElements = await create(false);

		await simulateChoseFiles(addedElements[0], 1);
		const filesCount1 = getFilesCount(addedElements[0]);
		expect(filesCount1).equal(1);

		//	do invalid drop
		const files = 4;
		await simulateDropFiles(addedElements[0], files);

		const filesCount2 = getFilesCount(addedElements[0]);
		expect(filesCount2).equal(0);
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
