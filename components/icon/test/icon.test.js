import '@vonage/vwc-icon';

const SECOND = 1000;

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('vwc-icon', () => {
	it('vwc-icon is defined as a custom element', async () => {
		assert.exists(
			customElements.get('vwc-icon', 'vwc-icon element is not defined')
		);
	});

	it('validates vwc-icon svg integrity', async () => {
		const el = ((elStarter) => {
				document.body.appendChild(elStarter);
				return elStarter;
			})(document.createElement('vwc-icon')),
			snapshots = {
				alarm:
					'<g><path d="M1.1,4.9C1,4.6,1,4.3,1,4c0-1.7,1.3-3,3-3c0.5,0,0.9,0.1,1.3,0.3c0.2,0.1,0.5,0,0.7-0.2s0-0.5-0.2-0.7C5.2,0.1,4.6,0,4,0C1.8,0,0,1.8,0,4c0,0.4,0.1,0.8,0.2,1.1c0.1,0.3,0.4,0.4,0.6,0.3C1.1,5.4,1.2,5.1,1.1,4.9z"></path><path d="M11.5,9H8.7L5.9,6.1C5.7,6,5.3,6,5.1,6.1C5,6.3,5,6.7,5.1,6.9l3,3C8.2,9.9,8.4,10,8.5,10h3c0.3,0,0.5-0.2,0.5-0.5S11.8,9,11.5,9z"></path><path d="M13.3,13.6C14.4,12.4,15,10.8,15,9c0-3.9-3.1-7-7-7C4.1,2,1,5.1,1,9c0,1.8,0.6,3.4,1.7,4.6l-1.6,1.6c-0.2,0.2-0.2,0.5,0,0.7c0.2,0.2,0.5,0.2,0.7,0l1.6-1.6C4.6,15.4,6.2,16,8,16c1.8,0,3.4-0.6,4.6-1.7l1.6,1.6c0.2,0.2,0.5,0.2,0.7,0c0.2-0.2,0.2-0.5,0-0.7L13.3,13.6z M12.3,13.2C12.2,13.2,12.2,13.2,12.3,13.2C12.2,13.2,12.2,13.2,12.3,13.2C11.1,14.3,9.7,15,8,15c-1.7,0-3.1-0.7-4.2-1.7l0,0l0,0C2.7,12.1,2,10.7,2,9c0-3.3,2.7-6,6-6s6,2.7,6,6C14,10.7,13.3,12.1,12.3,13.2z"></path><path d="M12,0c-0.6,0-1.2,0.1-1.7,0.4C10,0.5,9.9,0.8,10.1,1c0.1,0.2,0.4,0.4,0.7,0.2C11.1,1.1,11.5,1,12,1c1.7,0,3,1.3,3,3c0,0.3,0,0.6-0.1,0.9c-0.1,0.3,0.1,0.5,0.3,0.6c0.3,0.1,0.5-0.1,0.6-0.3C15.9,4.8,16,4.4,16,4C16,1.8,14.2,0,12,0z"></path></g>',
				car:
					'<path d="M4.05 3.45C4.2 3.15 4.5 3 4.8 3H19.2C19.5 3 19.8 3.15 19.95 3.45L22.2 10.5H1.8L4.05 3.45ZM0 11.1C0 11.25 0 11.25 0 11.1V18.75V21.75C0 22.2 0.3 22.5 0.75 22.5H6.75C7.2 22.5 7.5 22.2 7.5 21.75V19.5H16.5V21.75C16.5 22.2 16.8 22.5 17.25 22.5H23.25C23.7 22.5 24 22.2 24 21.75V18.75V11.25V11.1V10.95L21.3 3C21 2.1 20.1 1.5 19.2 1.5H4.8C3.9 1.5 3 2.1 2.7 3L0 11.1ZM18 19.5H22.5V21H18V19.5ZM22.5 18H17.25H6.75H1.5V12H22.5V18ZM1.5 19.5H6V21H1.5V19.5ZM6 15C6 15.9 5.4 16.5 4.5 16.5C3.6 16.5 3 15.9 3 15C3 14.1 3.6 13.5 4.5 13.5C5.4 13.5 6 14.1 6 15ZM19.5 16.5C20.4 16.5 21 15.9 21 15C21 14.1 20.4 13.5 19.5 13.5C18.6 13.5 18 14.1 18 15C18 15.9 18.6 16.5 19.5 16.5Z"></path>',
			};

		return Object.entries(snapshots)
			.map(([iconName, svg]) => async () => {
				el.setAttribute('type', iconName);
				await wait(0.3 * SECOND);
				expect(
					(el.shadowRoot.querySelector('svg') || { innerHTML: '' }).innerHTML
				).to.equal(svg, `Failed to validate icon type "${iconName}"`);
			})
			.reduce((ac, f) => ac.then(f), Promise.resolve());
	});
});
