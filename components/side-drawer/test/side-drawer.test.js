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

function animateDrawer(sideDrawerEl) {
	const event = new Event('transitionend');
	const aside = sideDrawerEl.shadowRoot.querySelector('aside');
	aside.dispatchEvent(event);
}

describe('side-drawer', () => {
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
			const [actualElement] = addElement(
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
			expect(actualElement.position, 'position should be undefined')
				.to
				.equal(undefined);
		});
	});

	describe('Side drawer attributes', () => {
		it('should reflect from attribute to property', async () => {
			const COMPONENT_PROPERTIES = ['open', 'alternate', 'hasTopBar'];
			for await (const property of COMPONENT_PROPERTIES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} ${property}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement[property])
					.to
					.equal(true);
			}
		});

		it('should reflect (type) from attribute to property', async () => {
			const COMPONENT_TYPES = ['', 'dismissible', 'modal'];
			for await (const type of COMPONENT_TYPES) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} type=${type}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement.type)
					.to
					.equal(type);
			}
		});

		it('should reflect (position) from attribute to property', async () => {
			const COMPONENT_POSITIONS = ['start', 'end'];
			for await (const position of COMPONENT_POSITIONS) {
				const [actualElement] = addElement(
					textToDomToParent(`<${COMPONENT_NAME} position=${position}></${COMPONENT_NAME}>`)
				);
				await actualElement.updateComplete;
				expect(actualElement.position)
					.to
					.equal(position);
			}
		});
	});

	describe('Modal side drawer events', () => {
		let sideDrawerEl;

		beforeEach(function () {
			[sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="modal"></${COMPONENT_NAME}>`)
			);
		});
		it('should fire opened event after animation completes and open is true', async () => {
			const onOpened = chai.spy();
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('opened', () => {
					onOpened();
					res();
				});
			});

			sideDrawerEl.open = true;
			animateDrawer(sideDrawerEl);

			await eventListenerPromise;
			onOpened.should.have.been.called();
		});

		it('should fire closed event after animation completes and open is false', async () => {
			const onClosed = chai.spy();
			sideDrawerEl.open = true;
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			sideDrawerEl.open = false;
			animateDrawer(sideDrawerEl);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});

		it('should fire closed event after clicking on scrim', async () => {
			const onClosed = chai.spy();

			sideDrawerEl.open = true;
			await sideDrawerEl.updateComplete;
			const scrim = sideDrawerEl.shadowRoot.querySelector('.side-drawer-scrim');

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			scrim?.click();
			animateDrawer(sideDrawerEl);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});

		it('should fire closed event after pressing escape on the document', async () => {
			const onClosed = chai.spy();

			sideDrawerEl.open = true;
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			const keyboardEvent = new KeyboardEvent('keydown', { key: 'Escape' });
			document.dispatchEvent(keyboardEvent);

			animateDrawer(sideDrawerEl);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});
	});

	describe('Dismissible side drawer events', () => {
		let sideDrawerEl;

		beforeEach(function () {
			[sideDrawerEl] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} type="dismissible"></${COMPONENT_NAME}>`)
			);
		});
		it('should fire opened event after animation completes and open is true', async () => {
			const onOpened = chai.spy();

			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('opened', () => {
					onOpened();
					res();
				});
			});

			sideDrawerEl.open = true;
			animateDrawer(sideDrawerEl);

			await eventListenerPromise;
			onOpened.should.have.been.called();
		});

		it('should fire closed event after animation completes and open is false', async () => {
			const onClosed = chai.spy();

			sideDrawerEl.open = true;
			await sideDrawerEl.updateComplete;

			const eventListenerPromise = new Promise((res) => {
				sideDrawerEl.addEventListener('closed', () => {
					onClosed();
					res();
				});
			});

			sideDrawerEl.open = false;
			animateDrawer(sideDrawerEl);

			await eventListenerPromise;
			onClosed.should.have.been.called();
		});
	});

	describe(`show`, function () {
		it(`should set "open" to true`, function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			actualElement.show();
			expect(actualElement.open)
				.to
				.equal(true);
		});
	});

	describe(`hide`, function () {
		it(`should set "open" to false`, function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
			);
			actualElement.hide();
			expect(actualElement.open)
				.to
				.equal(false);
		});
	});
});
