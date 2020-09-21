import '@vonage/vvd-core';
import kefir from "kefir";
import relativeTimeFactory from "./format-relative.js";

const
	SECOND = 1000,
	[
		SYMBOL_CONNECT,
		SYMBOL_DISCONNECT,
		SYMBOL_PROPERTY_LIVE,
		SYMBOL_PROPERTY_LIVE_SET,
		SYMBOL_PROPERTY_TARGET,
		SYMBOL_PROPERTY_TARGET_SET
	] = ["connect", "disconnect", "property-live", "property-live-set", "property-target", "property-target-set"].map((name) => Symbol(name));

/**
 * Displays a timestamp relative to current time in human readable language
 *
 * @element vwc-relative-time
 *
 * @prop {Boolean} live - When set to `true`, the component will automatically update.
 * @prop {integer} datetime - The target timestamp in milliseconds since epoch.
 *
 */
class RelativeTimeElement extends HTMLElement {

	constructor() {
		super();
		const
			rootEl = this.attachShadow({ mode: "closed" }),
			el = document.createElement('time');

		[SYMBOL_CONNECT, SYMBOL_DISCONNECT, SYMBOL_PROPERTY_LIVE_SET, SYMBOL_PROPERTY_TARGET_SET].forEach((symbol) => this[symbol] = () => { });
		rootEl.appendChild(el);

		const
			liveProperty = kefir
				.stream(({ emit }) => this[SYMBOL_PROPERTY_LIVE_SET] = emit)
				.toProperty(() => this.getAttribute('live') === "true"),
			targetTimestampProperty = kefir
				.stream(({ emit }) => this[SYMBOL_PROPERTY_TARGET_SET] = emit)
				.toProperty(() => Number(this.getAttribute('datetime'))),
			connectStream = kefir.stream(({ emit }) => this[SYMBOL_CONNECT] = emit);

		liveProperty.skipDuplicates().onValue((val) => {
			this[SYMBOL_PROPERTY_LIVE] = val;
			this.setAttribute('live', val.toString());
		});

		targetTimestampProperty.skipDuplicates().onValue((val) => {
			this[SYMBOL_PROPERTY_LIVE] = val;
			this.setAttribute('datetime', val.toString());
			el.setAttribute('datetime', new Date(val).toISOString());
			el.title = ["toLocaleDateString", "toLocaleTimeString"].map((methodName) => (new Date(val))[methodName]()).join(' ');
		});

		targetTimestampProperty.onValue((val) => this[SYMBOL_PROPERTY_TARGET] = val);

		connectStream
			.flatMapLatest(() => {
				return kefir
					.combine([
						liveProperty,
						targetTimestampProperty
					])
					.flatMapLatest(([live, target]) => {
						const formatter = relativeTimeFactory();
						return live
							? kefir.fromPoll(SECOND, formatter.bind(null, target))
							: kefir.constant(formatter(target))
					})
					.skipDuplicates()
					.takeUntilBy(kefir.fromCallback((cb) => this[SYMBOL_DISCONNECT] = cb))
			})
			.onValue((formattedTime) => el.textContent = formattedTime);
	}

	static get observedAttributes() {
		return ["live", "datetime"];
	}

	get live() {
		return this[SYMBOL_PROPERTY_LIVE];
	}

	set live(value) {
		if (typeof (value) !== "boolean") {
			console.error(`The "live" property must be boolean`);
			return;
		}
		this[SYMBOL_PROPERTY_LIVE_SET](value);
	}

	get datetime() {
		return this[SYMBOL_PROPERTY_TARGET];
	}

	set datetime(value) {
		if (!Number.isInteger(value)) {
			console.error(`The "datetime" must be an integer (milliseconds since Unix Epoch)`);
			return;
		}
		this[SYMBOL_PROPERTY_TARGET_SET](value);
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		({
			"live": (value) => this.live = value === "true",
			"datetime": (value) => this.datetime = Number(value)
		})[attrName](newValue);
	}

	connectedCallback() {
		this[SYMBOL_CONNECT]();
	}

	disconnectedCallback() {
		this[SYMBOL_DISCONNECT]();
	}
}

window.customElements.define('vwc-relative-time', RelativeTimeElement);
export { RelativeTimeElement as RelativeTime };