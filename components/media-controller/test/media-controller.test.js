import '@vonage/vwc-media-controller';

describe('vwc-media-controller', () => {
	it('should register as a custom element', async () => {
		assert.exists(
			customElements.get(
				'vwc-media-controller',
				'vwc-media-controller element is not defined'
			)
		);
	});
});
