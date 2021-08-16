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
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
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
			const COMPONENT_PROPERTIES = ['open', 'alternate', 'hasTopBar', 'absolute'];
			for await (const property of COMPONENT_PROPERTIES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} ${property}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[property]).to.equal(true);
			}
		});

		it('should reflect (type) from attribute to property', async () => {
			const COMPONENT_TYPES = ['', 'dismissible', 'modal'];
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
		it('should fire opened event after animation completes and open is true', async () => {
			const onOpened = chai.spy();
			const onFocusTrapped = chai.spy();

			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('opened', () => {
					onOpened();
					res();
				});
				sideDrawerEl.addEventListener('trapFocus', () => {
					onFocusTrapped();
					res();
				});
			});

			sideDrawerEl.open = true;
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onOpened.should.have.been.called();
			onFocusTrapped.should.have.been.called();
		});

		it('should fire closed event after animation completes and open is false', async () => {
			const onClosed = chai.spy();
			const onFocusReleased = chai.spy();

			const [sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal" open></${COMPONENT_NAME}>`)
			);
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
				sideDrawerEl.addEventListener('releaseFocus', () => {
					onFocusReleased();
					res();
				});
			});

			sideDrawerEl.open = false;
			const event = new Event('transitionend');
			sideDrawerEl.dispatchEvent(event);

			await eventListenerPromise;
			onClosed.should.have.been.called();
			onFocusReleased.should.have.been.called();
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
	});

	describe(`show`, function () {
		it(`should set "open" to true`, function () {
			const [actualElement] = (
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.open = false;
			actualElement.show();
			expect(actualElement.open).to.equal(true);
		});
	});

	describe(`hide`, function () {
		it(`should set "open" to false`, function () {
			const [actualElement] = (
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.open = true;
			actualElement.hide();
			expect(actualElement.open).to.equal(false);
		});
	});
});
