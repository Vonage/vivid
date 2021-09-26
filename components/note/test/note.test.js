import '../vwc-note.js';
import {
	waitNextTask,
	textToDomToParent,
	assertComputedStyle,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

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
		await note.updateComplete;
		const base = note.shadowRoot.querySelector('.vwc-note');
		assertComputedStyle(base, { borderInlineStartWidth: '8px' });
	});

	it('should have base sizing correct', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await note.updateComplete;
		const base = note.shadowRoot.querySelector('.vwc-note');
		assertComputedStyle(base, { height: '24px' });
		assertComputedStyle(base, { paddingBlockStart: '20px' });
		assertComputedStyle(base, { paddingBlockEnd: '20px' });
	});

	it('should have border appearing correct', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Internal contents</${COMPONENT_NAME}>`)
		);
		await note.updateComplete;
		const base = note.shadowRoot.querySelector('.vwc-note');
		assertComputedStyle(base, {
			boxShadow:
				'rgb(179, 179, 179) 0px 1px 0px 0px inset, rgb(179, 179, 179) -1px 0px 0px 0px inset, rgb(179, 179, 179) 0px -1px 0px 0px inset',
		});
	});

	it('should heve text aligned correctly (start)', async () => {
		const [wrapper] = addElement(
			textToDomToParent(`
				<div style="text-align: center !important">
					<${COMPONENT_NAME} header="Header"><p>Internal contents</p></${COMPONENT_NAME}>
				</div>`)
		);
		await waitNextTask();
		const note = wrapper.firstElementChild;
		expect(note).exist;
		assertComputedStyle(note.shadowRoot.querySelector('.note-header'), { textAlign: 'start' });
		assertComputedStyle(note.firstElementChild, { textAlign: 'start' });
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
