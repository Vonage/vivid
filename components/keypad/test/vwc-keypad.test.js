import '../vwc-keypad.js';
import { textToDomToParent, waitNextTask } from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

describe('VwcKeypad', () => {
	it('has a default no-asterisk false, no-hash false, no-display false, actionText "Enter", cancelText "Cancel"', async () => {
		const els = await textToDomToParent('<vwc-keypad></vwc-keypad>');
		const el = els[0];

		expect(el.noAsterisk).to.equal(false);
		expect(el.noHash).to.equal(false);
		expect(el.noDisplay).to.equal(false);
		expect(el.actionText).to.equal('Enter');
		expect(el.cancelText).to.equal('Cancel');

		el.remove();
	});

	it('keypad buttons clicks add digits to display', async () => {
		const els = await textToDomToParent('<vwc-keypad></vwc-keypad>');
		const el = els[0];

		const digit1 = el.shadowRoot.getElementById('1-digit');
		const digit2 = el.shadowRoot.getElementById('2-digit');
		const digit3 = el.shadowRoot.getElementById('3-digit');
		const digit4 = el.shadowRoot.getElementById('4-digit');
		const digit5 = el.shadowRoot.getElementById('5-digit');
		const digit6 = el.shadowRoot.getElementById('6-digit');
		const digit7 = el.shadowRoot.getElementById('7-digit');
		const digit8 = el.shadowRoot.getElementById('8-digit');
		const digit9 = el.shadowRoot.getElementById('9-digit');
		const digit0 = el.shadowRoot.getElementById('0-digit');
		const digitAsterisk = el.shadowRoot.getElementById('asterisk-digit');
		const digitHash = el.shadowRoot.getElementById('hash-digit');
		digit1.click();
		digit2.click();
		digit3.click();
		digit4.click();
		digit5.click();
		digit6.click();
		digit7.click();
		digit8.click();
		digit9.click();
		digit0.click();
		digitAsterisk.click();
		digitHash.click();

		expect(el.digits).to.equal('1234567890*#');

		el.remove();
	});

	it('no-asterisk attribute removes * button', async () => {
		const els = await textToDomToParent('<vwc-keypad no-asterisk></vwc-keypad>');
		const el = els[0];
		const asteriskButton = el.shadowRoot.querySelector('#asterisk-digit');

		expect(el.noAsterisk).to.equal(true);
		expect(asteriskButton).to.equal(null);
	});

	it('no-hash attribute removes # button', async () => {
		const els = await textToDomToParent('<vwc-keypad no-hash></vwc-keypad>');
		const el = els[0];
		const hashButton = el.shadowRoot.querySelector('#hash-digit');

		expect(el.noHash).to.equal(true);
		expect(hashButton).to.equal(null);
	});

	it('no-display attribute removes display input', async () => {
		const els = await textToDomToParent('<vwc-keypad no-display></vwc-keypad>');
		const el = els[0];
		const digitsDisplay = el.shadowRoot.querySelector('#digits-display');

		expect(el.noDisplay).to.equal(true);
		expect(digitsDisplay).to.equal(null);
	});

	it('called createAction method sets actionStarted to true', async () => {
		const els = await textToDomToParent('<vwc-keypad></vwc-keypad>');
		const el = els[0];

		el.createAction();
		expect(el.actionStarted).to.equal(true);
	});

	it('end action and clear digits on cancel button click', async () => {
		const els = await textToDomToParent('<vwc-keypad></vwc-keypad>');
		const el = els[0];

		const digit1 = el.shadowRoot.getElementById('1-digit');
		const digit2 = el.shadowRoot.getElementById('2-digit');
		const digit3 = el.shadowRoot.getElementById('3-digit');
		digit1.click();
		digit2.click();
		digit3.click();

		const actionButton = el.shadowRoot.getElementById('action-button');
		actionButton.click();

		el.createAction();
		await waitNextTask();
		const cancelButton = el.shadowRoot.getElementById('cancel-button');
		cancelButton.click();

		expect(el.digits).to.equal('');
		expect(el.actionStarted).to.equal(false);
	});

	it('can change Action button text via attribute', async () => {
		const els = await textToDomToParent(
			'<vwc-keypad actionText="Start"></vwc-keypad>'
		);

		expect(els[0].actionText).to.equal('Start');
	});

	it('can change Cancel button text via attribute', async () => {
		const els = await textToDomToParent(
			'<vwc-keypad cancelText="Stop"></vwc-keypad>'
		);

		expect(els[0].cancelText).to.equal('Stop');
	});

	it('maintains cursor position', async () => {
		const els = await textToDomToParent('<vwc-keypad></vwc-keypad>');
		const el = els[0];

		const digit1 = el.shadowRoot.getElementById('1-digit');
		const digit2 = el.shadowRoot.getElementById('2-digit');
		const digit3 = el.shadowRoot.getElementById('3-digit');
		const digit4 = el.shadowRoot.getElementById('4-digit');
		const digit5 = el.shadowRoot.getElementById('5-digit');
		const digit6 = el.shadowRoot.getElementById('6-digit');
		const digit7 = el.shadowRoot.getElementById('7-digit');
		const digitsDisplay = el.shadowRoot.getElementById('digits-display');
		digit1.click();
		digit2.click();
		digit3.click();
		digit4.click();
		await waitNextTask();
		digitsDisplay.setSelectionRange(2, 2);
		el.displayBlur();
		await waitNextTask();

		expect(digitsDisplay.selectionStart).to.equal(2);
		digit5.click();
		digit6.click();
		digit7.click();
		await waitNextTask();

		expect(el.digits).to.equal('1256734');
	});

	it('passes the a11y audit', async () => {
		const els = await textToDomToParent('<vwc-keypad></vwc-keypad>');

		await waitNextTask();
		expect(els[0]).shadowDom.to.be.accessible();
	});
});
