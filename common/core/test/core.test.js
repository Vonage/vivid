import vvdCore from '../vvd-core.js';

describe('vvd-core service', () => {
	it('verify basic core API', async () => {
		assert.isDefined(vvdCore, 'core service is defined');
		assert.isObject(vvdCore, 'core service is a defaultly exported object');
		assert.isFunction(vvdCore.set, 'core service has "set" API method');
		assert.isDefined(
			vvdCore.settled,
			'core service has "settled" object (Promise)'
		);
		assert.isFunction(
			vvdCore.settled.then,
			'core service has "settled" object - ensure it is Promise'
		);
	});

	it('should perform and auto-init to default when no data-vvd-context provided', async () => {
		const vvdCore = (await import('../vvd-core.js')).default;
		assert.isDefined(vvdCore.settled);
		const readyResult = await vvdCore.settled;
		assert.isArray(readyResult);
		readyResult.forEach((r) => {
			assert.isObject(r);
		});
	});
});
