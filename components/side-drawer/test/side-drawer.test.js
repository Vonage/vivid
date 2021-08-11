import '../vwc-side-drawer.js';
import 'chai-dom';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-side-drawer';

describe('Side-drawer', () => {
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

	describe('Side drawer default init', () => {
		it('should reflect from attribute to property', async () => {
			const [actualElement] = (
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.alternate, 'alternate should be false').to.equal(false);
			expect(actualElement.open, 'open should be true').to.equal(true);
			expect(actualElement.hasTopBar, 'hasTopBar should be false').to.equal(undefined);
			expect(actualElement.absolute, 'absolute should be false').to.equal(false);
		});
	});

	describe('Side drawer attributes', () => {
		it('should reflect from (open) attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.open).to.equal(true);
		});
		it('should reflect (alternate) from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} alternate></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.alternate).to.equal(true);
		});
		it('should reflect (hasTopBar) from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} hasTopBar></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.hasTopBar).to.equal(true);
		});
		it('should reflect (type) from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type=""></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.type).to.equal("");
		});
		it('should reflect (dismissible) from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="dismissible"></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.type).to.equal("dismissible");
		});
		it('should reflect (modal) from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.type).to.equal("modal");
		});
		it('should reflect (absolute) from attribute to property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} absolute></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.absolute).to.equal(true);
		});
	});

	describe('Modal side drawer events', () => {
		const waitForEvent = (el, ev) => new Promise((res) => {
			el.addEventListener(ev, res, { once: true });
		});

		it('opened/closed events are fired', async () => {
			const [element] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);

			await element.updateComplete;

			const drawer = element.shadowRoot.querySelector('.side-drawer');

			let openedFired = false;
			let closedFired = false;
			element.addEventListener('opened', () => {
				openedFired = true;
			});
			element.addEventListener('closed', () => {
				closedFired = true;
			});
			element.show();
			await waitForEvent(drawer, 'transitionend');
			expect(openedFired).toEqual(true);
			element.close();

			await waitForEvent(drawer, 'transitionend');
			expect(closedFired).toEqual(true);
		});

		it('should fire opened event', async () => {
			const onOpened = chai.spy();
			// const sideDrawerEl = await fixture(html`<vwc-side-drawer type="modal"></vwc-side-drawer>`);
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			sideDrawerEl.addEventListener('opened', onOpened);
			sideDrawerEl.show();
			// sideDrawerEl.show();

			// await new Promise((resolve) => {
			// 	drawer.addEventListener('transitionend', resolve);
			// });
			await new Promise((resolve) => {
				setTimeout(resolve, 1200);
			});

			onOpened.should.have.been.called();
		});

		it('should fire close event', async () => {
			let openTransitionEnd = false;

			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;
			actualElement.open = false;

			actualElement.addEventListener("closed", () => (openTransitionEnd = true));
			actualElement.onTransitionEnd();

			expect(openTransitionEnd).to.equal(true);
		});
	});
});
