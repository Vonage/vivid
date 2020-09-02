import '../vwc-media-controller';
import { textToDomToParent } from '../../../utils/js/test-helpers';

const COMPONENT_NAME = `vwc-media-controller`;

describe('vwc-media-controller', ()=>{
	let addedElements = [];
	let actualElement;

	beforeEach(function() {
		addedElements = textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`);
		actualElement = addedElements[0];
	});

	it('should register as a custom element', async ()=> {
		assert.exists(customElements.get('vwc-media-controller', 'vwc-media-controller element is not defined'));
	});
});