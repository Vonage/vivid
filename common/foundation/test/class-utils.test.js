import {
	mapToClasses
} from '@vonage/vvd-foundation/class-utils.js';

describe('class (DOM) utils', () => {

	it('should return empty array if invalid param - undefined', async () => {
		const r = mapToClasses();
		expect(r).eql([]);
	});

	it('should return empty array if invalid param - null', async () => {
		const r = mapToClasses(null);
		expect(r).eql([]);
	});

	it('should return empty array in invalid param - not an object', async () => {
		const r = mapToClasses('not an object');
		expect(r).eql([]);
	});

	it('should supply an empty array on empty object', async () => {
		const r = mapToClasses({});
		expect(r).eql([]);
	});

	it('should translate correctly object to classes', async () => {
		const r = mapToClasses({
			take1: true,
			nonTake1: false,
			take2: 3,
			nonTake2: 0,
			take3: {},
			nonTake3: null
		});
		const expected = ['take1', 'take2', 'take3'];
		expect(r.sort()).eql(expected.sort());
	});

});
