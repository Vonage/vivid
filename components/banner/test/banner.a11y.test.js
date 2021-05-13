import 'chai-a11y-axe';
import { html } from 'lit-html';
import { fixture } from '@open-wc/testing-helpers';

describe('banner a11y', function () {
	it('should adhere to accessibility guidelines', async function () {
		const bannerEl = await fixture(html`<vwc-banner></vwc-banner>`);
		await expect(bannerEl).shadowDom.to.be.accessible();
	});
});
