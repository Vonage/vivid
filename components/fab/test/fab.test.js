import '../vwc-fab.js';
import {
	textToDomToParent,
	waitNextTask,
	isolatedElementsCreation,
} from '../../../test/test-helpers.js';
import { chaiDomDiff } from '@open-wc/semantic-dom-diff';
chai.use(chaiDomDiff);

const VWC_COMPONENT = 'vwc-fab';

describe('vwc fab', () => {
	const addElement = isolatedElementsCreation();
	it('vwc-fab is defined as a custom element', async () => {
		assert.exists(
			customElements.get(VWC_COMPONENT, 'vwc-fab element is not defined')
		);
	});

	it('vwc-fab has internal contents (no icon)', async () => {
		const [fab] = addElement(
			textToDomToParent(`<${VWC_COMPONENT}></${VWC_COMPONENT}>`)
		);
		await waitNextTask();
		expect(fab).shadowDom.to.equalSnapshot();
	});

	it('vwc-fab has internal contents (with icon)', async () => {
		const [fab] = addElement(
			textToDomToParent(`<${VWC_COMPONENT} icon="info"></${VWC_COMPONENT}>`)
		);
		await waitNextTask();
		expect(fab).shadowDom.to.equalSnapshot();
	});

	it('vwc-fab has internal contents (with icon, mini size)', async () => {
		const [fab] = addElement(
			textToDomToParent(`<${VWC_COMPONENT} icon="info" mini></${VWC_COMPONENT}>`)
		);
		await waitNextTask();
		expect(fab).shadowDom.to.equalSnapshot();
	});
});
