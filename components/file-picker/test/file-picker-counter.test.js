import '@vonage/vwc-file-picker';
import {
	isolatedElementsCreation,
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
	const addElements = isolatedElementsCreation();

	it('should have initial counter set to 0 and no badge rendered', async () => {
		const fp = await create();
		assertFilesCount(fp, 0, false);
	});

	it('should have counter set to number when valid choice', async () => {
		if (isSafari()) {
			return;
		}
		const fp = await create(true);
		const files = 4;
		await simulateFilesSelect(fp, files);

		assertFilesCount(fp, files, true);
	});

	it('should have counter set to number when valid drop', async () => {
		if (isSafari()) {
			return;
		}
		const fp = await create(true);
		const files = 4;
		await simulateFilesDrop(fp, files);

		assertFilesCount(fp, files, true);
	});

	it('should have counter reset to 0 and no badge rendered when invalid drop (multiple)', async () => {
		if (isSafari()) {
			return;
		}
		const fp = await create(false);

		await simulateFilesSelect(fp, 1);
		assertFilesCount(fp, 1, true);

		//	do invalid drop
		const files = 4;
		await simulateFilesDrop(fp, files);

		assertFilesCount(fp, 0, false);
	});

	async function create(mulitple) {
		const filePickerName = randomAlpha();
		const [fp] = addElements(textToDomToParent(`
			<${VWC_COMPONENT}>
				<input type="file" name="${filePickerName}" ${mulitple ? 'multiple' : ''}/>
			</${VWC_COMPONENT}>
		`));
		await waitNextTask();
		return fp;
	}
});
