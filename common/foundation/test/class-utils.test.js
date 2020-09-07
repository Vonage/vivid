import {
	spreadObjectToClasses
} from '@vonage/vvd-foundation/class-utils.js';

describe('class (DOM) utils', () => {

	it('should throw on illegal param - undefined', async () => {
		expect(
			() => spreadObjectToClasses()
		).throw('input parameter MUST be a non-null object');
	});

	it('should throw on illegal param - null', async () => {
		expect(
			() => spreadObjectToClasses(null)
		).throw('input parameter MUST be a non-null object');
	});

	it('should throw on illegal param - not an object', async () => {
		expect(
			() => spreadObjectToClasses('not an object')
		).throw('input parameter MUST be a non-null object');
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
