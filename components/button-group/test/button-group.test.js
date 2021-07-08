import '../vwc-button-group.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-button-group';

describe.only('Button-group', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it(`should set layout filled for all child buttons`, async function () {
		const [actualElement] = addElement(
			textToDomToParent(`
			<${COMPONENT_NAME}>
				<vwc-button>BUTTON</vwc-button>
				<vwc-button>BUTTON</vwc-button>
				<vwc-button>BUTTON</vwc-button>
			</${COMPONENT_NAME}>`)
		);

		await actualElement.updateComplete;
		[...actualElement.children].forEach(childNode => expect(childNode.getAttribute('layout'))
			.to
			.equal('filled'));
	});

	describe(`size`, function () {
		async function createElement(sizeProperty, childrenSizeProps = ['', '', '']) {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} ${sizeProperty}>
<vwc-button ${childrenSizeProps[0]}>BUTTON</vwc-button>
<vwc-button ${childrenSizeProps[1]}>BUTTON</vwc-button>
<vwc-button ${childrenSizeProps[2]}">BUTTON</vwc-button>
</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;
			return actualElement;
		}

		function checkSizeProperty(actualElement, sizeProperty, exists = true) {
			[...actualElement.children].forEach((childNode, i) => expect(childNode.hasAttribute(sizeProperty), `Failed to test ${sizeProperty} index ${i}`)
				.to
				.equal(exists));
		}

		it(`should set every button size to dense if dense is set`, async function () {
			const actualElement = await createElement('dense');

			checkSizeProperty(actualElement, 'dense');
		});

		it(`should set every button size to enlarged if enlarged is set`, async function () {
			const actualElement = await createElement('enlarged');

			checkSizeProperty(actualElement, 'enlarged');
		});

		it(`should remove enlarged and dense if none is declared`, async function () {
			const actualElement = await createElement('', ['enlarged', 'dense', 'enlarged']);

			checkSizeProperty(actualElement, 'enlarged', false);
			checkSizeProperty(actualElement, 'dense', false);
		});

		it(`should remove enlarged if dense is declared`, async function () {
			const actualElement = await createElement('dense', ['enlarged', 'enlarged']);

			checkSizeProperty(actualElement, 'enlarged', false);
			checkSizeProperty(actualElement, 'dense', true);
		});

		it(`should remove dense if enlarged is declared`, async function () {
			const actualElement = await createElement('dense');

			actualElement.enlarged = true;
			await actualElement.updateComplete;
			await waitNextTask();

			checkSizeProperty(actualElement, 'enlarged', true);
			checkSizeProperty(actualElement, 'dense', false);
		});

		it(`should change the size if changed dynamically`, async function () {
			const actualElement = await createElement('enlarged', ['enlarged', 'dense']);

			actualElement.dense = true;
			await actualElement.updateComplete;
			await waitNextTask();

			checkSizeProperty(actualElement, 'dense', true);
		});
	});
});
