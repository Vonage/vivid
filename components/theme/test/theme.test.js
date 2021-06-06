import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
import { COMPONENT_NAME } from '@vonage/vwc-theme';
import {
	waitNextTask,
	textToDomToParent,
	isolatedElementsCreation
} from '../../../test/test-helpers.js';

chai.use(chaiDomDiff);

describe('Theme', () => {
	let addElement = isolatedElementsCreation();

	it('should have internal contents', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});

	it('should default scheme to os settings', () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;

		const prefersSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');
		const osPreferedColorScheme = prefersSchemeDark.matches ? 'dark' : 'light';

		const { scheme } = actualElement;

		expect(scheme).to.equal(osPreferedColorScheme);
	});

	it('should set scheme to dark', () => {
		const schemeToDefine = 'dark';
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} scheme="${schemeToDefine}"></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;

		const { scheme } = actualElement;

		expect(scheme).to.equal(schemeToDefine);
	});

	it('should set scheme to light', () => {
		const schemeToDefine = 'light';
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} scheme="${schemeToDefine}"></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;

		const { scheme } = actualElement;

		expect(scheme).to.equal(schemeToDefine);
	});
});
