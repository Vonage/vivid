import { waitNextTask } from '../../../test/test-helpers.js';

export { getInput, getFilesCount, simulateChoseFiles, simulateDropFiles };

function getInput(filePicker) {
	return filePicker.querySelector('[type="file"]');
}

function getDropZone(filePicker) {
	return filePicker.shadowRoot.querySelector('.drop-zone');
}

function mockDataTransfer(total) {
	const dt = new DataTransfer();
	for (let i = 0; i < total; i++) {
		dt.items.add(
			new File(['file content'], `file-${i}.png`, { type: 'image/png' })
		);
	}
	return dt;
}

function getFilesCount(filePicker) {
	return parseInt(
		filePicker.shadowRoot.querySelector('.files-count').textContent
	);
}

async function simulateChoseFiles(filePicker, total) {
	const fi = getInput(filePicker);
	const ft = mockDataTransfer(total);
	fi.files = ft.files;
	fi.dispatchEvent(new Event('change', { bubbles: true }));
	await waitNextTask();
}

async function simulateDropFiles(filePicker, total) {
	const dz = getDropZone(filePicker);
	const ft = mockDataTransfer(total);
	const de = new CustomEvent('drop', { bubbles: true });
	de.dataTransfer = ft;
	dz.dispatchEvent(de);
	await waitNextTask();
}
