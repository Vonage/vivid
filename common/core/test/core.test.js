import vvdCore from '../vvd-core.js';
import { getFrameLoadedInjected } from '../../../test/test-helpers.js';

describe.only('vvd-core service', () => {
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

	it('should perform auto-init to default when no data-vvd-context provided', async () => {
		const ifr = await getFrameLoadedInjected('coreSetupTest');
		const coreSettledResult = await ifr.contentWindow.vvdCoreSettled;
		console.log(coreSettledResult);
	});

	it('should perform auto-init to a value in data-vvd-context, when provided', async () => {
		const ifr = await getFrameLoadedInjected('coreSetupTest');
		const coreSettledResult = await ifr.contentWindow.vvdCoreSettled;
		console.log(coreSettledResult);
	});

	it('should NOT perform auto-init when data-vvd-context is "none"', async () => {});
});
