import 'chai-a11y-axe';
import { html } from 'lit-html';
import { fixture, aTimeout } from '@open-wc/testing-helpers';

describe('banner a11y', function () {
	const TRANSITION_TIME = 200;
	it('should adhere to accessibility guidelines', async function () {
		const bannerEl = await fixture(html`<vwc-banner message="Hello" open></vwc-banner>`);
		await expect(bannerEl).shadowDom.to.be.accessible();
	});
	it('should be with default role and aria-live values', async function () {
		const bannerEl = await fixture(html`<vwc-banner message="Hello" open></vwc-banner>`);
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.have.attribute('role', 'status');
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.have.attribute('aria-live', 'polite');
	});
	it('should be with reflected role and aria-live values', async function () {
		const bannerEl = await fixture(html`<vwc-banner message="Hello" open role="alert" aria-live="assertive" dismissible></vwc-banner>`);
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.have.attribute('role', 'alert');
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.have.attribute('aria-live', 'assertive');
		bannerEl.shadowRoot.querySelector('vwc-icon-button')?.click();
		await aTimeout(TRANSITION_TIME * 1.1);
		bannerEl.setAttribute('open', 'true');
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.equal(null);
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.equal(null);
	});
	it('should be without role and aria-live values when closed', async function () {
		const bannerEl = await fixture(html`<vwc-banner message="Hello"></vwc-banner>`);
		expect(bannerEl.shadowRoot.querySelector('.banner--message')).to.equal(null);
	});
});
