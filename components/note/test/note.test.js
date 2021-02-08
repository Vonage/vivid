import '../vwc-note.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-note';

describe('note', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-note is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-note element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have internal contents (full layout)', async () => {
		const [note] = addElement(
			textToDomToParent(
				`<${COMPONENT_NAME} header="Title" icon="home" connotation="cta">Internal contents</${COMPONENT_NAME}>`
			)
		);
		await waitNextTask();
		expect(note.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have connotation strip constrained', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		assertComputedStyle(note, { borderInlineStartWidth: '8px' });
	});

	it('should have base sizing correct', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		assertComputedStyle(note, { height: '24px' });
		assertComputedStyle(note, { paddingBlockStart: '20px' });
		assertComputedStyle(note, { paddingBlockEnd: '20px' });
	});

	it('should have border appearing correct', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		assertComputedStyle(note, {
			boxShadow:
				'rgb(179, 179, 179) 0px 1px 0px 0px inset, rgb(179, 179, 179) -1px 0px 0px 0px inset, rgb(179, 179, 179) 0px -1px 0px 0px inset',
		});
	});

	describe('header', () => {
		it('should have header when header is set', async () => {
			const [note] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} header="Title">Internal contents</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			expect(note.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have header added when header is set dynamically (property)', async () => {
			const [note] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			note.header = 'Title';
			await waitNextTask();
			expect(note.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have header added when header is set dynamically (attribute)', async () => {
			const [note] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			note.setAttribute('header', 'Title');
			await waitNextTask();
			expect(note.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have header removed when header is unset (property)', async () => {
			const [note] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} header="Title">Internal contents</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			note.header = null;
			await waitNextTask();
			expect(note.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have header removed when header is unset (attribute)', async () => {
			const [note] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} header="Title">Internal contents</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			note.removeAttribute('header');
			await waitNextTask();
			expect(note.shadowRoot.innerHTML).to.equalSnapshot();
		});
	});

	describe('icon', () => {
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
				textToDomToParent(
					`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`
				)
			);
			await waitNextTask();
			note.icon = 'home';
			await waitNextTask();
			expect(note.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should have icon added when icon is set dynamically (attribute)', async () => {
			const [note] = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`
				)
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
});
