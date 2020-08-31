import '../vwc-media-controller';
import { textToDomToParent } from '../../../utils/js/test-helpers';

const COMPONENT_NAME = `vwc-media-controller-yonatan`;

describe(`${COMPONENT_NAME}`, ()=>{
	let addedElements = [];
	let actualElement;

	beforeEach(function() {
		addedElements = textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`);
		actualElement = addedElements[0];
	});

	afterEach(function() {
		addedElements.forEach(elm => elm.remove());
	});

	it('should register as a custom element', async ()=> {
		assert.exists(customElements.get(`${COMPONENT_NAME}`, 'vwc-media-controller element is not defined'));
	});

	describe(`userPlayPauseRequest`, function() {
		it(`should emit inverse play/pause state in the event detail`, function() {

		});
	});
});