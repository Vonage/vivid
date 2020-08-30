import '@vonage/vwc-audio';

describe('vwc-audio', ()=>{
	it('should register as a custom element', async ()=> {
		assert.exists(customElements.get('vwc-audio', 'vwc-audio element is not defined'));
	});
});