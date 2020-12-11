import '../vwc-icon-button.js';
import { 
	waitNextTask,
	textToDomToParent,
} from '../../../test/test-helpers.js';
import { 
	sizingTestCases,
	shapeTestCases
} from '../../../test/shared';
import { connotationTestCases } from '../../button/test/button.connotation.test.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { isolatedElementsCreation } from '../../../test/test-helpers';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-icon-button';

describe('icon button', () => {
	let addElement = isolatedElementsCreation();

	it('vwc-icon-button is defined as a custom element', async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-icon-button element is not defined')
		);
	});

	it('should internal contents', async () => {
		const [e] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(e.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('sizing', () => {
		sizingTestCases(COMPONENT_NAME);
	});

	describe('shape', () => {
		shapeTestCases(COMPONENT_NAME);
	});

	describe('icon button connotation', () => {
		connotationTestCases(COMPONENT_NAME);
	});
});
