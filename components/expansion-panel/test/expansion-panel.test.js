import '../vwc-expansion-panel.js';
import {
	textToDomToParent,
	waitNextTask,
	assertComputedStyle,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-expansion-panel';

describe('expansion panel', () => {
	let addElement = isolatedElementsCreation();

	it('should be defined as a custom element', () => {
		assert.exists(
			customElements.get(COMPONENT_NAME, 'vwc-expansion-panel element is not defined')
		);
	});

	it('should have internal contents', async () => {
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

	it('should have header text when header is set', async () => {
		const headerText = 'Click me';
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} header="${headerText}"></${COMPONENT_NAME}>`)
		);
		await waitNextTask();
		const header = actualElement.shadowRoot.querySelector('.expansion-panel-header');
		expect(header.textContent.trim()).to.equal(headerText);
	});

	describe('toggle icons', () => {
		let actualElement;
		beforeEach(async () => {
			[actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);
			await waitNextTask();
		});

		it('should have plus/minus toggle icon by default', async () => {
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

		it('should have chevron toggle icon when chevronToggle', async () => {
			actualElement.chevronToggle = true;
			await waitNextTask();

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

		it('should have leading toggle icon by default', async () => {
			const toggleIcon = actualElement.shadowRoot.querySelector('.leading-icon .toggle-open');
			expect(toggleIcon).to.exist;
		});

		it('should have trailing toggle icon when trailingToggle', async () => {
			actualElement.trailingToggle = true;
			await waitNextTask();

			const toggleIcon = actualElement.shadowRoot.querySelector('.trailing-icon .toggle-open');
			expect(toggleIcon).to.exist;
		});

		it('should have custom leading icon', async () => {
			actualElement.icon = 'chat-solid';
			await waitNextTask();

			const customIcon = actualElement.shadowRoot.querySelector('.leading-icon .vvd-icon');
			expect(customIcon.type).to.equal('chat-solid');
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
});
