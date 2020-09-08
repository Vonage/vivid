import {
	spreadObjectToClasses
} from '@vonage/vvd-foundation/class-utils.js';

describe('class (DOM) utils', () => {

	it('should return empty array in invalid param - undefined', async () => {
		const r = spreadObjectToClasses();
		expect(r).eql([]);
	});

	it('should return empty array in invalid param - null', async () => {
		const r = spreadObjectToClasses(null);
		expect(r).eql([]);
	});

	it('should return empty array in invalid param - not an object', async () => {
		const r = spreadObjectToClasses('not an object');
		expect(r).eql([]);
	});

	it('should supply an empty array on empty object', async () => {
		const r = spreadObjectToClasses({});
		expect(r).eql([]);
	});

	it('should translate correctly object to classes', async () => {
		const r = spreadObjectToClasses({
			take1: true,
			nonTake1: false,
			take2: 3,
			nonTake2: 0,
			take3: {},
			nonTake3: null
		});
		expect(r.sort()).eql(['take1', 'take2', 'take3'].sort());
	});

});
