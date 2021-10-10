import '@vonage/vwc-textfield';
import '@vonage/vwc-list';
import '@vonage/vwc-menu';
import Kefir from 'kefir';
import { asyncReplace } from 'lit/directives/async-replace.js';
import { html } from 'lit';
import { live } from 'lit/directives/live.js';
import { repeat } from 'lit/directives/repeat.js';
import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
import elementF from 'element-f';

const NUMBER_OF_RESULTS = 5;
const DETECTOR_COMPONENT = "vivid-mount-detector";
const MENU_DEBOUNCE = 100;

(function (customElements, componentName) {
	customElements.get(componentName) ?? customElements.define(componentName, elementF(function (life) {
		const sendEvent = (eventName, opts = {}) => this.dispatchEvent(new CustomEvent(eventName, opts));
		life.on('connect', sendEvent.bind(null, 'connect', { detail: this }));
		life.on('disconnect', sendEvent.bind(null, 'disconnect', { detail: this }));
	}));
}(window.customElements, DETECTOR_COMPONENT));

const toAsyncIterator = (function () {
	return function (stream) {
		const messageBuffer = [];
		let update = () => {
			// Empty Function
		};

		stream
			.takeErrors(1)
			.onAny(({ type, value }) => {
				messageBuffer.push({ type, value });
				update();
			});

		return {
			[Symbol.asyncIterator]: () => ({
				next: () => {
					return (messageBuffer.length
						? Promise.resolve()
						: new Promise(resolve => update = resolve)
					).then(() => {
						const { type, value } = messageBuffer.shift();
						switch (type) {
						default:
						case "error":
							return Promise.reject({ value, done: true });
						case "value":
							return Promise.resolve({ value, done: false });
						case "end":
							return Promise.resolve({ value, done: true });
						}
					});
				}
			})
		};
	};
}());

const RANDOM_WORDS = ["Violet Valdez", "Esther Kelly", "Danielle Ball", "Luz Santos", "Joanne Garner", "Preston Wells", "Jacquelyn Cobb", "Kim Goodman", "Becky Marshall", "Jeanette Reeves", "Kimberly Moore", "Larry Russell", "Alfredo Carter", "Andre Fisher", "Craig Buchanan", "Tracey Keller", "Kristen Ray", "Jared Phelps", "Allison Mason", "Grace Howell", "Mable Gill", "Wilson Watkins", "Melanie Armstrong", "Raul Baker", "Tricia Alvarez", "Blanca Franklin", "Christine Herrera", "Pamela Blair", "Leon Boone", "Sue Strickland", "Cora Day", "Elias Luna", "Connie Matthews", "Tonya Erickson", "Russell Rodgers", "Arthur Simpson", "Maria Miles", "Willard Peterson", "Anne Rose", "Adrienne Mcgee", "Gabriel Glover", "Lynn Gonzales", "Darren Woods", "Kenneth Carpenter", "Ernestine Rhodes", "Wendy Olson", "Mindy Stevens", "Theodore Hale", "Roderick Greer", "Darrell Montgomery"];

const filterByType = typeName => stream => stream.filter(({ type }) => type === typeName).map(({ value }) => value);

const Combo = function (args) {
	const
		uiStream = Kefir.pool(),
		sendUi = (type, value) => uiStream.plug(Kefir.constant({ type, value }));

	const userSelect$ = uiStream.thru(filterByType('userSelect')).filter(Boolean);

	const userKeyword$ = uiStream.thru(filterByType('userInput'));

	const userKeyDown$ = uiStream
		.thru(filterByType('userKey'))
		.filter(({ code }) => code === 'ArrowDown');

	const keyword$ = Kefir.merge([userSelect$, userKeyword$]).skipDuplicates().toProperty(() => '');

	const results$ = keyword$
		.map(filteredKeyword => RANDOM_WORDS
			.filter(
				filteredKeyword
					? word => word.toLowerCase().includes(filteredKeyword.toLowerCase())
					: () => false
			)
			.slice(0, NUMBER_OF_RESULTS)
			.sort((a, b) => a - b))
		.toProperty(() => []);

	const focus$ = uiStream
		.filter(({ type }) => type === "focus")
		.map(({ value }) => value === "in")
		.skipDuplicates();

	const active$ = Kefir
		.combine([
			focus$,
			results$,
			keyword$,
		], (active, results, keyword) => active && !!results.length && !results.some(result => result.toLowerCase() === keyword.toLowerCase()))
		.skipDuplicates()
		.toProperty(() => false);

	const viewAsyncIterator = Kefir
		.combine([
			active$.debounce(MENU_DEBOUNCE),					// To allow the component to complete any previous animations/state shifts before setting new
			results$.debounce(MENU_DEBOUNCE),				// To prevent items to disappear from the list before changing active state
			keyword$
		])
		.map(([vwcMenuOpenState, vwcMenuItems, keyword]) => {
			return html`
					<div class="combo"
						@focusout=${sendUi.bind(null, 'focus', 'out')}
						@focusin=${sendUi.bind(null, 'focus', 'in')}
					>
					<vwc-textfield
						@input=${({ target }) => sendUi('userInput', target.value)}
						@keydown=${e => sendUi('userKey', e)}
						value="${live(keyword)}"
						...=${spread(args)}></vwc-textfield>
					<vwc-menu
						fullwidth
						?open="${vwcMenuOpenState}"
						@action=${e => sendUi('userSelect', e.target.items[e.detail.index]?.textContent)})}>
							${repeat(vwcMenuItems, word => word, word => html`<vwc-list-item>${word}</vwc-list-item>`)}
					</vwc-menu>
				</div>
				<vivid-mount-detector
					@connect=${
	(e) => {
		const
			parent = e.target.parentNode,
			menu = parent.querySelector('vwc-menu');
		menu.anchor = parent.querySelector('vwc-textfield');
		menu.defaultFocus = "NONE";
		menu.corner = "BOTTOM_START";
		menu.defaultFocusState = "FIRST_ITEM";
		menu.multi = false;
		menu.fullWidth = true;
		menu.stayOpenOnBodyClick = true;
		userKeyDown$.onValue((ev) => {
			const firstChild = menu.children[0];
			if (firstChild) {
				ev.preventDefault();
				firstChild.focus();
			}
		});
	}
}
				/>
			`;
		})
		.thru(toAsyncIterator);

	return html`
		<style>
			div.combo {
				display: inline-block;
				position: relative;
				overflow: visible;
			}

			div.combo > vwc-menu {
				inline-size: 100%;
				--mdc-menu-min-width: 100%;
				--mdc-menu-max-width: 100%;
			}

			div.combo > vwc-textfield {
				inline-size: 100%;
				box-sizing: border-box;
			}

		</style>
		${asyncReplace(viewAsyncIterator)}
	`;
};

Combo.storyName = 'Autocomplete';

Combo.args = {
	dense: true,
	icon: "address-book-solid",
	placeholder: RANDOM_WORDS[Math.round(Math.random() * (RANDOM_WORDS.length - 1))]
};

export { Combo as Autocomplete };
