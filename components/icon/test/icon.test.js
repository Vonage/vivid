import '@vonage/vwc-icon';

describe('vwc-icon', () => {
	describe('custom component registration', function () {
		it('Should be defined', function () {
			assert.exists(customElements.get('vwc-icon', 'vwc-icon element is defined'));
		});
	});
});
