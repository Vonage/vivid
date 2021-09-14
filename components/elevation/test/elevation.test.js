import '../vwc-elevation.js';
import {
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

	it('should have a slot', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>Button Text</${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		expect(Boolean(actualElement.shadowRoot.querySelector('slot'))).to.equal(true);
	});
});
