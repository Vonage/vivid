import { waitNextTask } from '../../../test/test-helpers.js';

export {
	getInput,
	assertFilesCount,
	simulateFilesSelect,
	simulateFilesDrag,
	simulateFilesDrop,
	simulateFilesDragEnd,
	mockDataTransfer,
	simulateButtonSlotClick,
	simulateInputKeyTrigger
};

function getInput(filePicker) {
	return filePicker.querySelector('[type="file"]');
}

function getDropZone(filePicker) {
	return filePicker.shadowRoot.querySelector('.drop-zone');
}

function mockDataTransfer(total, nonFileOne = false) {
	const dt = new DataTransfer();
	for (let i = 0; i < total; i++) {
		if (nonFileOne && i === 0) {
			dt.items.add('string that will represent non-file data transfer item', 'text/plain');
		} else {
			const ni = new File(['file content'], `file-${i}.png`, { type: 'image/png' });
			dt.items.add(ni);
		}
	}
	return dt;
}

function assertFilesCount(filePicker, expectedNumber, expectedShown) {
	const fce = filePicker.shadowRoot.querySelector('.files-count');
	if (filePicker.filesCount !== expectedNumber) {
		throw new Error(`expected ${expectedNumber} files but 'filesCount' property says ${filePicker.filesCount}`);
	}
	if (Boolean(fce) ^ expectedShown) {
		throw new Error(
			`expected files count to be ${expectedShown ? 'shown' : 'hidden'
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

async function simulateFilesDrag(filePicker, total, nonFileOne = false) {
	const dz = getDropZone(filePicker);
	const ft = mockDataTransfer(total, nonFileOne);
	const de = new CustomEvent('dragenter', { bubbles: true });
	de.dataTransfer = ft;
	dz.dispatchEvent(de);
	await waitNextTask();
}

async function simulateFilesDrop(filePicker, total, nonFileOne = false) {
	const dz = getDropZone(filePicker);
	const ft = mockDataTransfer(total, nonFileOne);
	const de = new CustomEvent('drop', { bubbles: true });
	de.dataTransfer = ft;
	dz.dispatchEvent(de);
	await waitNextTask();
}

async function simulateFilesDragEnd(filePicker) {
	const dz = getDropZone(filePicker);
	const de = new CustomEvent('dragleave', { bubbles: true });
	dz.dispatchEvent(de);
	await waitNextTask();
}

async function simulateButtonSlotClick(filePicker) {
	const bs = filePicker.shadowRoot.querySelector('slot[name="button"]');
	bs.assignedElements()[0].click();
	await waitNextTask();
}

async function simulateInputKeyTrigger(filePicker, key) {
	const dz = getDropZone(filePicker);
	const ke = new KeyboardEvent('keypress', { bubbles: true, code: key });
	dz.dispatchEvent(ke);
	await waitNextTask();
}