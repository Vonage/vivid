import '@vonage/vwc-banner';
import 'chai-dom';
import { html } from 'lit-html';
import { fixture } from '@open-wc/testing-helpers';

describe('banner', function () {
	it('should match icon', async function () {
		const bannerEl = await fixture(html`<vwc-banner icon="ambulance"></vwc-banner>`);
		expect(bannerEl.shadowRoot.querySelector('vwc-icon:first-child')).to.have.attribute('type', 'ambulance');
	});

	it('should send "close" event upon dismissal', async function () {
		const closeHandler = chai.spy();
		const bannerEl = await fixture(html`<vwc-banner @close=${closeHandler} dismissible></vwc-banner>`);
		bannerEl.shadowRoot.querySelector('vwc-icon-button')?.click();
		closeHandler.should.have.been.called();
	});
});
