import '../vwc-tab.js';
import {
	assertComputedStyle,
	textToDomToParent,
	waitNextTask,
	waitInterval,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-tab';

describe('tab', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-tab element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const actualElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} label="Tab"></${COMPONENT_NAME}>`)
		);
		await waitInterval(50);
		expect(actualElements[0]).shadowDom.to.equalSnapshot();
	});

	it('should be disabled', async () => {
		const actualElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} disabled label="Tab"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		assertComputedStyle(actualElements[0], { pointerEvents: 'none' });
	});

	describe('sizing', () => {
		it('should have normal size by default', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} label="Tab"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const tab = actualElement.shadowRoot.querySelector('.mdc-tab');

			assertComputedStyle(actualElement, { flex: '1 1 0%' });
			assertComputedStyle(tab, { paddingLeft: '24px', paddingRight: '24px' });
		});

		it('should have dense size when dense', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} dense label="Tab"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const tab = actualElement.shadowRoot.querySelector('.mdc-tab');
			assertComputedStyle(tab, { paddingLeft: '12px', paddingRight: '12px' });
		});

		it('should have initial size when left', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} left label="Tab"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			assertComputedStyle(actualElement, { flex: '0 1 auto' });
		});
	});

	describe('icon', () => {
		it('should have leading icon by default', async () => {
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} icon="chat" label="Tab"></${COMPONENT_NAME}>`
				)
			);
			const actualElement = addedElements[0];
			await waitNextTask();
			const icon = actualElement.shadowRoot.querySelector(
				'slot[name=icon] vwc-icon'
			);
			assert.exists(icon);
		});

		it('should have trailing icon when trailingIcon', async () => {
			const addedElements = addElement(
				textToDomToParent(
					`<${COMPONENT_NAME} icon="chat" trailingIcon label="Tab"></${COMPONENT_NAME}>`
				)
			);
			const actualElement = addedElements[0];
			await waitNextTask();
			const trailingIcon = actualElement.shadowRoot.querySelector(
				'slot[name=trailingIcon] vwc-icon'
			);
			assert.exists(trailingIcon);
		});
	});
});
