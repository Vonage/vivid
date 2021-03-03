import '@vonage/vwc-file-picker';
import {
	isolatedElementsCreation,
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';

const VWC_COMPONENT = 'vwc-file-picker';

describe('file picker - negative cases', () => {
	let addElements = isolatedElementsCreation();

	it('should alert on mulitple elements slotted', async () => {
		const oce = console.error;
		let eMessage = null;
		console.error = (m) => {
			eMessage = m;
		};
		addElements(textToDomToParent(`<${VWC_COMPONENT}><input/><input/></${VWC_COMPONENT}>`));
		await waitNextTask();
		expect(eMessage).equal(`only an INPUT of type 'file' expected; found 'null'`);
		console.error = oce;
	});

	it('should alert on non-input slotted', async () => {
		const oce = console.error;
		let eMessage = null;
		console.error = (m) => {
			eMessage = m;
		};
		addElements(textToDomToParent(`<${VWC_COMPONENT}><div></div></${VWC_COMPONENT}>`));
		await waitNextTask();
		expect(eMessage).equal(`only an INPUT of type 'file' expected; found 'null'`);
		console.error = oce;
	});

	it('should alert on non-file input slotted', async () => {
		const oce = console.error;
		let eMessage = null;
		console.error = (m) => {
			eMessage = m;
		};
		addElements(textToDomToParent(`<${VWC_COMPONENT}><input/></${VWC_COMPONENT}>`));
		await waitNextTask();
		expect(eMessage).equal(`only an INPUT of type 'file' expected; found 'null'`);
		console.error = oce;
	});
});
