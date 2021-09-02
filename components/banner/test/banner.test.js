import '@vonage/vwc-banner';
import 'chai-dom';
import { html } from 'lit-html';
import {
	fixture, aTimeout
} from '@open-wc/testing-helpers';

describe('banner', function () {
	it('should match icon', async function () {
		const bannerEl = await fixture(html`<vwc-banner icon="ambulance"></vwc-banner>`);
		expect(bannerEl.shadowRoot.querySelector('vwc-icon:first-child')).to.have.attribute('type', 'ambulance');
	});

	it('should send "close" events upon dismissal', async function () {
		const TRANSITION_TIME = 200; // 200ms
		const closingHandler = chai.spy();
		const closedHandler = chai.spy();
		const bannerEl = await fixture(html`<vwc-banner message="Hello" open @closed=${closedHandler} @closing=${closingHandler} dismissible></vwc-banner>`);
		bannerEl.shadowRoot.querySelector('vwc-icon-button')?.click();
		await aTimeout(TRANSITION_TIME * 1.1); // additional 10% for good measure ;)
		closingHandler.should.have.been.called();
		closedHandler.should.have.been.called();
	});

	it('should close banner upon "Escape" key', async function () {
		const RESPONSE_TIME = 200;
		const closedHandler = chai.spy();
		const bannerEl = await fixture(html`<vwc-banner message="Hello" open @closed=${closedHandler}></vwc-banner>`);
		window.dispatchEvent(new KeyboardEvent('keydown', { key: "Escape" }));
		await aTimeout(RESPONSE_TIME);
		closedHandler.should.have.been.called();
	});
});
