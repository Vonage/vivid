import '../vwc-popup.js';
import '@vonage/vwc-button';
import 'chai-dom';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation, waitInterval, noop,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-popup';

describe('popup', () => {
	let addElement = isolatedElementsCreation();

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	describe('Popup default init', () => {
		it('should reflect from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;
			expect(actualElement.anchor, 'anchor should be ""')
				.to
				.equal('');
			expect(actualElement.open, 'open should be false')
				.to
				.equal(false);
			expect(actualElement.arrow, 'arrow should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.corner, 'corner should be left')
				.to
				.equal('left');
			expect(actualElement.dismissible, 'dismissible should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.strategy, 'strategy should be fixed')
				.to
				.equal('fixed');
		});
	});

	describe(`show`, () => {
		it(`should set "open" to true`, async () => {
			addElement(
				textToDomToParent(`<vwc-button id="anchor"></vwc-button>`)
			);
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.anchor = 'anchor';
			await actualElement.updateComplete;

			actualElement.show();
			await actualElement.updateComplete;

			expect(actualElement.open)
				.to
				.equal(true);
		});
	});

	describe(`hide`, () => {
		it(`should set "open" to false`, async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
			);

			actualElement.hide();
			await actualElement.updateComplete;

			expect(actualElement.open)
				.to
				.equal(false);
		});
	});

	describe(`anchor`, () => {
		async function flushResizeEvents() {
			await waitNextTask();
		}

		function triggerResize(element) {
			element.style.height = '20px';
		}

		function expectASingleUpdatePositionCall(updatePositionCallCount, anchorElement) {
			const observer = new ResizeObserver(async function () {
				await waitNextTask();
				expect(updatePositionCallCount).to.equal(1);
			});

			observer.observe(anchorElement);
		}

		async function setPopupAndAnchor() {
			const [anchorElement] = addElement(
				textToDomToParent(`<vwc-button style="position: absolute; left: 100px;" layout="outlined" id="anchor">Button</vwc-button>`)
			);
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} arrow anchor="anchor" open><div>This is my popup</div></${COMPONENT_NAME}>`)
			);
			actualElement.updatePosition = noop;
			await actualElement.updateComplete;
			return { anchorElement, actualElement };
		}

		it(`should not set popup open if anchor element does not exist`, async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.anchor = 'anchor';
			await actualElement.updateComplete;

			actualElement.show();
			await actualElement.updateComplete;

			expect(actualElement.open)
				.to
				.equal(false);
		});

		it(`should reposition when the anchor changes its size`, async function () {

			const { anchorElement, actualElement } = await setPopupAndAnchor();

			await flushResizeEvents();

			let updatePositionCallCount = 0;
			actualElement.updatePosition = function () {
				updatePositionCallCount++;
			};

			triggerResize(anchorElement);

			expectASingleUpdatePositionCall(updatePositionCallCount, anchorElement);

		});

		it(`should stop observing the anchor when changing an anchor`, async function () {
			const { anchorElement, actualElement } = await setPopupAndAnchor();
			await flushResizeEvents();

			actualElement.anchor = '';
			await waitNextTask();

			let updatePositionCallCount = 0;
			actualElement.updatePosition = function () {
				updatePositionCallCount++;
			};

			anchorElement.style.height = '20px';

			await waitNextTask();

			expect(updatePositionCallCount).to.equal(0);
		});
	});
});
