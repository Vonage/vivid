import '../vwc-banner.js';
import 'chai-a11y-axe';
import 'chai-dom';
import { aTimeout } from '@open-wc/testing-helpers';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
const COMPONENT_NAME = 'vwc-banner';

describe('banner a11y', function () {
	const TRANSITION_TIME = 200;
	const addElement = isolatedElementsCreation();

	it('should adhere to accessibility guidelines', async function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Hello" open></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		await expect(actualElement).shadowDom.to.be.accessible();
	});
	it('should be with default role and aria-live values', async function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Hello" open></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.have.attribute('role', 'status');
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.have.attribute('aria-live', 'polite');
	});
	it('should be with reflected role and aria-live values', async function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Hello" open role="alert" aria-live="assertive" dismissible></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.have.attribute('role', 'alert');
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.have.attribute('aria-live', 'assertive');
		actualElement.shadowRoot?.querySelector('vwc-icon-button')?.click();
		await aTimeout(TRANSITION_TIME * 1.1);
		actualElement.setAttribute('open', 'true');
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.equal(null);
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.equal(null);
	});
	it('should be without role and aria-live values when closed', async function () {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME} message="Hello"></${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;
		expect(actualElement.shadowRoot?.querySelector('.banner--message')).to.equal(null);
	});
});
