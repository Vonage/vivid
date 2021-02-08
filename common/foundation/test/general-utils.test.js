import { handleMultipleDenseProps } from '../general-utils';

class TestComponent extends HTMLElement {}

window.customElements.define('general-utils-test-component', TestComponent);

describe(`general-utils`, () => {
	describe(`handleMultipleDenseProps`, () => {
		it(`should set enlarged attribute to false if recieved dense`, () => {
			const testComponent = document.createElement('general-utils-test-component');
			testComponent.dense = true;
			testComponent.enlarged = true;
			handleMultipleDenseProps(testComponent, { has: (type) => type === 'dense' });
			expect(testComponent.enlarged).to.equal(false);
		});

		it(`should set dense attribute to false if recieved enlarged`, () => {
			const testComponent = document.createElement('general-utils-test-component');
			testComponent.setAttribute('dense', 'true');
			testComponent.dense = true;
			testComponent.enlarged = true;
			handleMultipleDenseProps(testComponent, {
				has: (type) => type === 'enlarged',
			});
			expect(testComponent.dense).to.equal(false);
			expect(testComponent.getAttribute('dense')).to.equal(null);
		});
	});
});
