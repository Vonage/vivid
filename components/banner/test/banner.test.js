import '@vonage/vwc-banner';
import 'chai-dom';
import { waitNextTask, waitInterval } from '../../../test/test-helpers.js';

describe('banner', async function () {
	let bannerEl;

	beforeEach(async function () {
		bannerEl = document.createElement('vwc-banner');
		document.body.appendChild(bannerEl);
		await waitNextTask();
	});

	afterEach(function () {
		document.body.removeChild(bannerEl);
	});

	it('should match icon', async function () {
		bannerEl.icon = "ambulance";
		await waitNextTask();
		expect(bannerEl.shadowRoot.querySelector('vwc-icon:first-child')).to.have.attribute('type', 'ambulance');
	});

	it('should send "close" events upon dismissal', async function () {
		const TRANSITION_TIME = 200; // 200ms
		const closingHandler = chai.spy();
		const closedHandler = chai.spy();
		bannerEl.addEventListener('closed', closedHandler);
		bannerEl.addEventListener('closing', closingHandler);
		bannerEl.setAttribute('dismissible', '');
		bannerEl.setAttribute('message', 'Hello');
		bannerEl.setAttribute('open', '');
		await waitNextTask();
		bannerEl.shadowRoot.querySelector('vwc-icon-button')?.click();
		await waitInterval(TRANSITION_TIME * 1.1); // additional 10% for good measure ;)
		closingHandler.should.have.been.called();
		closedHandler.should.have.been.called();
	});

	it('should close banner upon "Escape" key', async function () {
		const TRANSITION_TIME = 200;
		const closingHandler = chai.spy();
		const closedHandler = chai.spy();
		bannerEl.addEventListener('closed', closedHandler);
		bannerEl.addEventListener('closing', closingHandler);
		bannerEl.addEventListener('closing', closingHandler);
		bannerEl.setAttribute('dismissible', '');
		bannerEl.setAttribute('message', 'Hello');
		bannerEl.setAttribute('open', '');
		bannerEl.shadowRoot.querySelector('div:first-child').dispatchEvent(new KeyboardEvent('keydown', { key: "Escape" }));
		await waitInterval(TRANSITION_TIME * 1.1); // additional 10% for good measure ;)
		closingHandler.should.have.been.called();
		closedHandler.should.have.been.called();
	});
});
