import '@vonage/vwc-banner';
import 'chai-dom';
import { html } from 'lit-html';
import {
	fixture, elementUpdated, aTimeout, nextFrame
} from '@open-wc/testing-helpers';

describe('banner', function () {
	it('should match icon', async function () {
		const bannerEl = await fixture(html`<vwc-banner icon="ambulance"></vwc-banner>`);
		expect(bannerEl.shadowRoot.querySelector('vwc-icon:first-child')).to.have.attribute('type', 'ambulance');
	});

	it('should send "close" events upon dismissal', async function () {
		const closingHandler = chai.spy();
		const closedHandler = chai.spy();
		const bannerEl = await fixture(html`<vwc-banner message="Hello" open @closed=${closedHandler} @closing=${closingHandler} dismissible></vwc-banner>`);
		bannerEl.shadowRoot.querySelector('vwc-icon-button')?.click();
		await aTimeout(200);
		closingHandler.should.have.been.called();
		closedHandler.should.have.been.called();
	});
});
