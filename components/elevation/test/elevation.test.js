import '../vwc-elevation.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-elevation';

describe('Elevation', () => {
	let addElement = isolatedElementsCreation();

	function createElement(props) {
		const propsAndValues = !props ? '' :
			Object.keys(props)
				.reduce((attributesString, attributeName) => {
					return `${attributesString} ${attributeName}="${props[attributeName]}"`;
				}, '');
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}${propsAndValues}></${COMPONENT_NAME}>`)
		);
		return actualElement;
	}

	it(`${COMPONENT_NAME} is defined as a custom element`, async () => {
		assert.exists(
			customElements.get(COMPONENT_NAME)
		);
	});

	describe(`dp`, function () {
		const defaultValue = 2;
		it(`should default to ${defaultValue}`, async function () {
			const actualElement = createElement();
			await actualElement.updateComplete;
			expect(actualElement.dp)
				.to
				.equal(2);
		});

		it(`should change the property when the attribute changes`, async function () {
			const startingDP = 8;
			const actualElement = createElement({ dp: startingDP });
			await actualElement.updateComplete;

			const propertyValueBeforeChange = actualElement.dp;

			actualElement.setAttribute('dp', '4');

			expect(propertyValueBeforeChange)
				.to
				.equal(startingDP);
			expect(actualElement.dp)
				.to
				.equal(4);
		});

		it(`should set the dp class on the wrapper element`, async function () {
			const startingDP = 8;
			const nextDP = 24;
			const classPrefix = 'vwc-elevation-dp-';
			const actualElement = createElement({ dp: startingDP });
			await actualElement.updateComplete;

			const wrapperElement = actualElement.shadowRoot.querySelector('#vwc-elevation-wrapper');
			const startingDPClassExists = wrapperElement.classList.contains(`${classPrefix}${startingDP}`);

			actualElement.setAttribute('dp', nextDP);
			await actualElement.updateComplete;
			const nextDPClassExists = wrapperElement.classList.contains(`${classPrefix}${nextDP}`);
			expect(startingDPClassExists).to.equal(true);
			expect(nextDPClassExists).to.equal(true);
		});
	});

	describe(`background-color`, function () {
		const defaultValue = null;
		it(`should default to ${defaultValue}`, async function () {
			const actualElement = createElement();
			await actualElement.updateComplete;
			expect(actualElement.backgroundColor)
				.to
				.equal(defaultValue);
		});

		it(`should change the property when the attribute changes`, async function () {
			const startingBackgroundColor = 'black';
			const nextBackgroundColor = 'blue';
			const actualElement = createElement({ 'background-color': startingBackgroundColor });
			await actualElement.updateComplete;

			const propertyValueBeforeChange = actualElement.backgroundColor;

			actualElement.setAttribute('background-color', nextBackgroundColor);

			expect(propertyValueBeforeChange)
				.to
				.equal(startingBackgroundColor);
			expect(actualElement.backgroundColor)
				.to
				.equal(nextBackgroundColor);
		});

		it(`should set the background-color property on the wrapper`, async function () {
			const actualElement = createElement();
			await actualElement.updateComplete;

			const wrapperElement = actualElement.shadowRoot.querySelector('#vwc-elevation-wrapper');
			const initialEmptyBackgroundColor = wrapperElement.style.backgroundColor;

			actualElement.backgroundColor = 'black';
			await actualElement.updateComplete;

			const blackBackgroundColor = wrapperElement.style.backgroundColor;
			expect(initialEmptyBackgroundColor).to.equal('');
			expect(blackBackgroundColor).to.equal('black');
		});
	});

	describe(`border-radius`, function () {
		const defaultValue = null;
		it(`should default to ${defaultValue}`, async function () {
			const actualElement = createElement();
			await actualElement.updateComplete;
			expect(actualElement.borderRadius)
				.to
				.equal(defaultValue);
		});

		it(`should change the property when the attribute changes`, async function () {
			const startingBackgroundColor = '16px';
			const nextBackgroundColor = '24px';
			const actualElement = createElement({ 'border-radius': startingBackgroundColor });
			await actualElement.updateComplete;

			const propertyValueBeforeChange = actualElement.borderRadius;

			actualElement.setAttribute('border-radius', nextBackgroundColor);

			expect(propertyValueBeforeChange)
				.to
				.equal(startingBackgroundColor);
			expect(actualElement.borderRadius)
				.to
				.equal(nextBackgroundColor);
		});

		it(`should set the border-radius property on the wrapper`, async function () {
			const actualElement = createElement();
			await actualElement.updateComplete;

			const wrapperElement = actualElement.shadowRoot.querySelector('#vwc-elevation-wrapper');
			const initialEmptyBorderRadius = wrapperElement.style.borderRadius;

			actualElement.borderRadius = '16px';
			await actualElement.updateComplete;

			const borderRadiusAfterChange = wrapperElement.style.borderRadius;
			expect(initialEmptyBorderRadius).to.equal('');
			expect(borderRadiusAfterChange).to.equal('16px');
		});
	});

	it('should internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		const actualElement = addedElements[0];
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	});
});
