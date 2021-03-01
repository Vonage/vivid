import { waitNextTask } from '../../../test/test-helpers.js';

export {
	getInput, assertFilesCount, simulateFilesSelect, simulateFilesDrop
};

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

function assertFilesCount(filePicker, expectedNumber, expectedShown) {
	const fce = filePicker.shadowRoot.querySelector('.files-count');
	if (Boolean(fce) ^ expectedShown) {
		throw new Error(
			`expected files count to be ${
				expectedShown ? 'shown' : 'hidden'
			}, but found ${fce ? 'shown' : 'hidden'}`
		);
	}

	if (fce) {
		const fcNumber = parseInt(fce.textContent);
		if (fcNumber !== expectedNumber) {
			throw new Error(
				`expected for ${expectedNumber} files, but found ${fcNumber}`
			);
		}
	}
}

async function simulateFilesSelect(filePicker, total) {
	const fi = getInput(filePicker);
	const ft = mockDataTransfer(total);
	fi.files = ft.files;
	fi.dispatchEvent(new Event('change', { bubbles: true }));
	await waitNextTask();
}

async function simulateFilesDrop(filePicker, total) {
	const dz = getDropZone(filePicker);
	const ft = mockDataTransfer(total);
	const de = new CustomEvent('drop', { bubbles: true });
	de.dataTransfer = ft;
	dz.dispatchEvent(de);
	await waitNextTask();
}
