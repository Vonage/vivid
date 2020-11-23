import '../vwc-note.js';
import {
	assertComputedStyle,
	isolatedElementsCreation,
	textToDomToParent,
	waitNextTask,
} from '../../../test/test-helpers.js';
import { getTypographyStyle } from '../../../test/typography-utils.js';

const COMPONENT_NAME = 'vwc-note';

describe('note typography', async () => {
	let addElement = isolatedElementsCreation();

	it('should have set typography for a header', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} header="Header"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		assertComputedStyle(
			note.shadowRoot.querySelector('.note-header'),
			await getTypographyStyle('body-2-bold')
		);
	});

	it('should have set typography for a message', async () => {
		const [note] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Message</${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		assertComputedStyle(
			note.shadowRoot.querySelector('.note-message'),
			await getTypographyStyle('body-2')
		);
	});
});
