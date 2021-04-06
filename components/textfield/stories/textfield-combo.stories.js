import '@vonage/vwc-textfield';
import '@vonage/vwc-list';
import Kefir from 'kefir';
import { html } from 'lit-element';
import { asyncReplace } from 'lit-html/directives/async-replace.js';
import { live } from 'lit-html/directives/live.js';
import { repeat } from 'lit-html/directives/repeat.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { spread } from '@open-wc/lit-helpers';

const NUMBER_OF_RESULTS = 5;

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

export function Combo(args) {
	const
		uiStream = Kefir.pool(),
		sendUi = message => uiStream.plug(Kefir.constant(message));

	const keyword$ = uiStream
		.filter(({ type }) => ["userInput", "userSelect"].includes(type))
		.map(({ value }) => value)
		.toProperty(() => '');

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

	const active$ = Kefir.combine([
		Kefir
			.merge([
				uiStream
					.filter(({ type }) => type === "focus")
					.map(({ value }) => value === "in")
					.debounce(100),
				uiStream
					.filter(({ type }) => type === "userSelect")
					.map(() => false)
			]),
		results$
	], (active, results) => active && results.length)
		.toProperty(() => false);

	const viewAsyncIterator = Kefir
		.combine([
			active$,
			results$,
			keyword$
		])
		.map(([active, results, keyword]) => {
			return html`
					<div class="combo"
						@focusout=${() => sendUi({ type: "focus", value: "out" })}
						@focusin=${() => sendUi({ type: "focus", value: "in" })}
					>
					<vwc-textfield @input=${({ target }) => sendUi({ type: "userInput", value: target.value })} value="${live(keyword)}" ...=${spread(args)}></vwc-textfield>
					<vwc-list class="${classMap({ active })}">
						${repeat(results, word => word, word => html`<vwc-list-item @request-selected=${() => sendUi({ type: "userSelect", value: word })}>${word}</vwc-list-item>`)}
					</vwc-list>
				</div>`;
		})
		.thru(toAsyncIterator);

	return html`
		<style>
			div.combo {
				position: relative;
				overflow: visible;
			}

			div.combo > vwc-list {
				position: absolute;
				width: 100%;
				top: 100%;
				left: 0;
				display: none;
				background-color: #eee;
				z-index: 999;
			}

			div.combo > vwc-textfield {
				width: 100%;
			}

			div.combo > vwc-list.active {
				display: block;
			}
		</style>
		${asyncReplace(viewAsyncIterator)}
	`;
}
