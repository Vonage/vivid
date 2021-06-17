import { COMPONENT_NAME } from '@vonage/vwc-snackbar';
import '@vonage/vwc-button';
import {
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

describe('snackbar', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-snackbar is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-snackbar element is not defined')
		);
	});

	for (const flavor of ['', 'legacy']) {
		it(`should have internal contents - flavor = '${flavor}'`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} ${flavor}></${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it(`should have internal contents (header) - flavor = '${flavor}'`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} header="Header" ${flavor}></${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it(`should have internal contents (message) - flavor = '${flavor}'`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} message="Message" ${flavor}></${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it(`should have internal contents (icon) - flavor = '${flavor}'`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} icon="home" ${flavor}></${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it(`should have internal contents (dismissible) - flavor = '${flavor}'`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} dismissible ${flavor}></${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it(`should have internal contents (slotted action) - flavor = '${flavor}'`, async () => {
			const [snackbar] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} ${flavor}>
					<vwc-button slot="action">Action</vwc-button>
				</${COMPONENT_NAME}>`)
			);
			await snackbar.updateComplete;
			expect(snackbar.shadowRoot.innerHTML).to.equalSnapshot();
		});
	}
});
