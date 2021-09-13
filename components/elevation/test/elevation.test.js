import '../vwc-elevation.js';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';

chai.use(chaiDomDiff);

const COMPONENT_NAME = 'vwc-elevation';

describe.only('Elevation', () => {
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
	});

	// it('should internal contents', async () => {
	// 	const addedElements = addElement(
	// 		textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
	// 	);
	// 	const actualElement = addedElements[0];
	// 	await waitNextTask();
	// 	expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
	// });
});
