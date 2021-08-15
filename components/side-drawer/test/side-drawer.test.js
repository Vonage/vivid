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
const COMPONENT_PROPERTIES = ['open', 'alternate', 'hasTopBar', 'absolute'];
const COMPONENT_TYPES = ['', 'dismissible', 'modal'];


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
		expect(actualElement.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});

	describe('Side drawer default init', () => {
		it('should reflect from attribute to property', async () => {
			const [actualElement] = (
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			await actualElement.updateComplete;

			expect(actualElement.alternate, 'alternate should be false')
				.to
				.equal(false);
			expect(actualElement.open, 'open should be false')
				.to
				.equal(false);
			expect(actualElement.hasTopBar, 'hasTopBar should be undefined')
				.to
				.equal(undefined);
			expect(actualElement.absolute, 'absolute should be false')
				.to
				.equal(false);
		});
	});

	describe('Side drawer attributes', () => {
		it('should reflect from attribute to property', async () => {
			for await (const property of COMPONENT_PROPERTIES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} ${property}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[property]).to.equal(true);
			}
		});

		it('should reflect (type) from attribute to property', async () => {
			for await (const type of COMPONENT_TYPES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} type=${type}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement.type).to.equal(type);
			}
		});
	});

	describe('Modal side drawer events', () => {
		it('should fire opened event after changing from close to open', async () => {
			const onOpened = chai.spy();
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('opened', () => {
					onOpened();
					res();
				});
			});

			sideDrawerEl.show();
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onOpened.should.have.been.called();
		});

		it('should fire closed event after changing from open to close', async () => {
			const onClosed = chai.spy();
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal" open></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			sideDrawerEl.close();
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});

		it('should fire closed event after clicking on scrim', async () => {
			const onClosed = chai.spy();
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal" open></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;
			const scrim = sideDrawerEl.shadowRoot.querySelector('.vvd-side-drawer--scrim');


			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			scrim?.click();
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});

		it('should fire Focus trap removed event after clicking on scrim', async () => {
			const onClosed = chai.spy();
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal" open></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;
			const scrim = sideDrawerEl.shadowRoot.querySelector('.vvd-side-drawer--scrim');


			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			scrim?.click();
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});

		it('should fire trapFocus event after changing from close to open', async () => {
			const onFocusTrapped = chai.spy();
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('trapFocus', () => {
					onFocusTrapped();
					res();
				});
			});

			sideDrawerEl.show();
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onFocusTrapped.should.have.been.called();
		});

		it('should fire releaseFocus event after changing from open to close', async () => {
			const onFocusReleased = chai.spy();
			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal" open></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('releaseFocus', () => {
					onFocusReleased();
					res();
				});
			});

			sideDrawerEl.close();
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onFocusReleased.should.have.been.called();
		});
	});
});
