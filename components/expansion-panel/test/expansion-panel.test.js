import '../vwc-expansion-panel.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import {chaiDomDiff} from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-expansion-panel';

describe ('expansion panel', () => {
	function getHeaderButtonElement(actualElement) {
		return actualElement.shadowRoot?.querySelector('.expansion-panel-button');
	}

	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-expansion-panel element is not defined')
		);
	});

	it('should have internal contents', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
					<${COMPONENT_NAME} heading="click me">
						content
					</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should have internal contents (deprecated \'header\')', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`
				<${COMPONENT_NAME} header="click me">
					content
				</${COMPONENT_NAME}>
			`)
		);
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});

	it('should be initially closed', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(actualElement.open).to.equal(false);
	});

	it('should be initially open', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} open></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		expect(actualElement.open).to.equal(true);
	});

	it('should have heading text when heading is set', async () => {
		const headerText = 'Click me';
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} heading="${headerText}"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const headerEl = getHeaderButtonElement(actualElement);
		expect(headerEl.textContent.trim()).to.equal(headerText);
	});

	it('should have header (deprecated) text when header is set', async () => {
		const headerText = 'Click me';
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} header="${headerText}"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const headerEl = getHeaderButtonElement(actualElement);
		expect(headerEl.textContent.trim()).to.equal(headerText);
	});

	it('should have meta text when meta-data is set', async () => {
		const metaText = 'meta-data';
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} meta="${metaText}"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const meta = actualElement.shadowRoot.querySelector('.expansion-panel-button');
		expect(meta.textContent.trim()).to.equal(metaText);
	});


	it('should have header text and meta-data text', async () => {
		const headerText = 'Click me';
		const metaText = 'meta-data';
		const [actualElement] = addElement((
			textToDomToParent(`<${COMPONENT_NAME} header="${headerText}" meta="${metaText}"></${COMPONENT_NAME}>`)
		));
		await waitNextTask();
		const header = actualElement.shadowRoot.querySelector('.heading-text');
		const meta = actualElement.shadowRoot.querySelector('.meta');
		expect(header.textContent.trim()).to.equal(headerText);
		expect(meta.textContent.trim()).to.equal(metaText);
	});

	describe('toggle icons', () => {
		let actualElement;
		beforeEach(async () => {
			[actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
		});

		it('should have chevron toggle icon by default', async () => {
			const toggleOpenIcon = actualElement.shadowRoot.querySelector('.toggle-open');
			const toggleCloseIcon = actualElement.shadowRoot.querySelector('.toggle-close');

			expect(toggleOpenIcon.type).to.equal('chevron-down-solid');
			assertComputedStyle(toggleCloseIcon, {
				display: 'none',
			});

			actualElement.open = true;
			await waitNextTask();

			expect(toggleCloseIcon.type).to.equal('chevron-up-solid');
			assertComputedStyle(toggleOpenIcon, {
				display: 'none',
			});
		});

		it('should have plus/minus toggle icon when indicatorIconSet set to binary', async () => {
			actualElement.indicatorIconSet = 'binary';
			await waitNextTask();

			const toggleOpenIcon = actualElement.shadowRoot.querySelector('.toggle-open');
			const toggleCloseIcon = actualElement.shadowRoot.querySelector('.toggle-close');

			expect(toggleOpenIcon.type).to.equal('plus-solid');
			assertComputedStyle(toggleCloseIcon, {
				display: 'none',
			});

			actualElement.open = true;
			await waitNextTask();

			expect(toggleCloseIcon.type).to.equal('minus-solid');
			assertComputedStyle(toggleOpenIcon, {
				display: 'none',
			});
		});

		it('should have trailing toggle icon by default', async () => {
			const toggleIcon = actualElement.shadowRoot.querySelector('.trailing-icon .toggle-open');
			expect(toggleIcon).to.exist;
		});

		it('should have leading toggle icon when leadingToggle', async () => {
			actualElement.leadingToggle = true;
			await waitNextTask();

			const toggleIcon = actualElement.shadowRoot.querySelector('.leading-icon .toggle-open');
			expect(toggleIcon).to.exist;
		});

		it('should have custom leading icon', async () => {
			actualElement.icon = 'chat-solid';
			await waitNextTask();

			const customIcon = actualElement.shadowRoot.querySelector('.leading-icon vwc-icon');
			expect(customIcon.type).to.equal('chat-solid');
		});

		it('should not override leading toggle when leading icon set', async () => {
			actualElement.leadingToggle = true;
			actualElement.icon = 'chat-solid';
			await waitNextTask();

			const customIcon = actualElement.shadowRoot.querySelector('.leading-icon .toggle-open');
			expect(customIcon.type).to.equal('chevron-down-solid');
		});
	});

	describe('styles', () => {
		it(`should toggle content's "display" according to relevant "open" state`, async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const body = actualElement.shadowRoot.querySelector('.expansion-panel-body');
			expect(getComputedStyle(body).display).to.equal('none');

			actualElement.show();
			await waitNextTask();
			expect(getComputedStyle(body).display).to.equal('block');

			actualElement.close();
			await waitNextTask();
			expect(getComputedStyle(body).display).to.equal('none');
		});
	});

	describe('ripple', () => {
		it('should have ripple by default', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const ripple = actualElement.shadowRoot.querySelector('mwc-ripple');
			expect(ripple).to.exist;
		});

		it('should have no ripple when set to noRipple', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} noRipple></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const ripple = actualElement.shadowRoot.querySelector('mwc-ripple');
			expect(ripple).to.not.exist;
		});
	});

	describe('sizing', () => {
		it('should have normal size by default', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const headerEl = getHeaderButtonElement(actualElement);
			assertComputedStyle(headerEl, {fontSize: '20px'});
		});

		it('should have dense size when dense', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} dense></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const headerEl = getHeaderButtonElement(actualElement);
			assertComputedStyle(headerEl, {fontSize: '14px'});
		});
	});

	describe(`heading level`, function () {

		it(`should default to 3`, async function () {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			expect(actualElement.headingLevel).to.equal('3');
			expect(actualElement.getAttribute('heading-Level')).to.equal('3');
		});

		it(`should revert to 3 if set with invalid property`, async function () {
			const invalidHeaderLevel = 'johnny';
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} heading-Level="${invalidHeaderLevel}"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();

			const headerButton = getHeaderButtonElement(actualElement);
			expect(headerButton.parentNode.tagName).to.equal('H3');
			expect(actualElement.headingLevel).to.equal('3');
			expect(actualElement.getAttribute('heading-Level')).to.equal('3');
		});

		it(`should set H3 around the button`, async function () {
			const [actualElement] = (
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const headerButton = getHeaderButtonElement(actualElement);
			expect(headerButton.parentNode.tagName).to.equal('H3');

		});

		it(`should set the H level according to heading-Level attribute`, async function () {
			const headingLevel = 5;
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} heading-Level="${headingLevel}"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			const headerButton = getHeaderButtonElement(actualElement);
			expect(headerButton.parentNode.tagName).to.equal(`H${headingLevel}`);
		});

		it(`should set the H level according to headingLevel property`, async function () {
			const headingLevel = 5;
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME} heading="Content"></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
			actualElement.headingLevel = headingLevel;
			await waitNextTask();
			await actualElement.updateComplete;
			const headerButton = getHeaderButtonElement(actualElement);
			expect(headerButton.parentNode.tagName).to.equal(`H${headingLevel}`);
		});
	});
});
