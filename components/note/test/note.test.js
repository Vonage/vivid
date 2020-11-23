import '../vwc-note.js';
import { waitNextTask, textToDomToParent } from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-note';

describe('note', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-note is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-note element is not defined')
		);
	});

	it('should internal contents', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have icon when icon is set', async () => {
		const [note] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} icon="home">Internal contents</${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have icon added when icon is set dynamically (property)', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		note.icon = 'home';
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have icon added when icon is set dynamically (attribute)', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		note.setAttribute('icon', 'home');
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have icon removed when icon is unset (property)', async () => {
		const [note] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} icon="home">Internal contents</${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		note.icon = null;
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have icon removed when icon is unset (attribute)', async () => {
		const [note] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} icon="home">Internal contents</${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		note.removeAttribute('icon');
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
