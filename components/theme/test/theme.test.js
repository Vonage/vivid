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

	function setSchemedTheme(schemeToDefine) {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME} scheme="${schemeToDefine}"></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;

		const { scheme } = actualElement;
		return scheme;
	}

	it('check snapshot', async () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;
		await waitNextTask();
		expect(actualElement.shadowRoot.innerHTML)
			.to
			.equalSnapshot();
	});

	it('defaults scheme to os settings', () => {
		const addedElements = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		const [actualElement] = addedElements;

		const prefersSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');
		const osPreferedColorScheme = prefersSchemeDark.matches ? 'dark' : 'light';

		const { scheme } = actualElement;

		expect(scheme).to.equal(osPreferedColorScheme);
	});

	it('sets scheme to dark', () => {
		const schemeToDefine = 'dark';
		expect(setSchemedTheme(schemeToDefine)).to.equal(schemeToDefine);
	});

	it('sets scheme to light', () => {
		const schemeToDefine = 'light';
		expect(setSchemedTheme(schemeToDefine)).to.equal(schemeToDefine);
	});
});
