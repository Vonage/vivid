import 'chai-a11y-axe';
import { html } from 'lit-html';
import { fixture } from '@open-wc/testing-helpers';

describe('banner a11y', function () {
	it('should adhere to accessibility guidelines', async function () {
		const bannerEl = await fixture(html`<vwc-banner></vwc-banner>`);
		await expect(bannerEl).shadowDom.to.be.accessible();
	});
	it('should be with default role and aria-live values', async function () {
		const bannerEl = await fixture(html`<vwc-banner></vwc-banner>`);
		expect(bannerEl).to.have.attribute('role', 'status');
		expect(bannerEl).to.have.attribute('aria-live', 'polite');
	});
	it('should be with reflected role and aria-live values', async function () {
		const bannerEl = await fixture(html`<vwc-banner role="alert" aria-live="assertive"></vwc-banner>`);
		expect(bannerEl).to.have.attribute('role', 'alert');
		expect(bannerEl).to.have.attribute('aria-live', 'assertive');	
	});
});

