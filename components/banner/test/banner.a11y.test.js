import 'chai-a11y-axe';
import { waitNextTask } from '../../../test/test-helpers.js';

describe('banner a11y', function () {
	let testedElement;
	before(() => {
		testedElement = document.createElement('vwc-banner');
		document.body.appendChild(testedElement);
	});
	after(function () {
		document.body.removeChild(testedElement);
	});
	it('should adhere to accessibility guidelines', async function () {
		await waitNextTask();
		await expect(testedElement).shadowDom.to.be.accessible();
	});
});
