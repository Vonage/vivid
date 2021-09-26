import '../vwc-helper-message.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-helper-message';

describe('helper message', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-helper-message is defined as a custom element', async () => {
		assert.exists(
			customElements.get(
				COMPONENT_NAME,
				'vwc-helper-message element is not defined'
			)
		);
	});

	it(`should have correct internal contents when 'is-error' absent`, async () => {
		const [e] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME}>Message text</${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
		const icon = e.shadowRoot.querySelector('.helper-icon');
		expect(icon).exist;
		assertComputedStyle(icon, { display: 'none' });
	});

	it(`should have correct internal contents when 'is-error' present'`, async () => {
		const [e] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} is-error>Message text</${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
		const icon = e.shadowRoot.querySelector('.helper-icon');
		expect(icon).exist;
		assertComputedStyle(icon, { display: 'flex', color: 'rgb(230,29,29)' });
	});

	describe('sizing', () => {
		it(`should have correct sizing when 'is-error=false'`, async () => {
			const [e] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} is-error="false">Message text</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			assertComputedStyle(e, { height: '16px', marginBlockStart: '4px' });
		});

		it(`should have correct sizing when 'is-error=true'`, async () => {
			const [e] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} is-error="true">Message text</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			assertComputedStyle(e, { height: '16px', marginBlockStart: '4px' });
		});
	});
});
