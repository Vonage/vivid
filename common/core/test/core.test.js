import vvdCore from '../vvd-core.js';

describe('vvd-core service', () => {
	it('verify basic core API', async () => {
		assert.isDefined(vvdCore, 'core service is defined');
		assert.isObject(vvdCore, 'core service is a defaultly exported object');
		assert.isFunction(vvdCore.set, 'core service has "set" API method');
		assert.isDefined(
			vvdCore.coreReady,
			'core service has "coreReady" object (Promise)'
		);
		assert.isFunction(
			vvdCore.coreReady.then,
			'core service has "coreReady" object - ensure it is Promise'
		);
	});

	it('should perform and auto-init to default when no data-vvd-context provided', async () => {
		const vvdCore = (await import('../vvd-core.js')).default;
		assert.isDefined(vvdCore.coreReady);
		const readyResult = await vvdCore.coreReady;
		assert.isArray(readyResult);
		readyResult.forEach((r) => {
			assert.isObject(r);
		});
	});
});
