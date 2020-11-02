import '@vonage/vvd-core';
import kefir from 'kefir';
import resolveIcon from './icon-resolve.autogenerated';
import { style } from '../vwc-icon.css';

const [
	SYMBOL_CONNECT,
	SYMBOL_DISCONNECT,
	SYMBOL_PROPERTY_TYPE,
	SYMBOL_PROPERTY_TYPE_SET
] = ['connect', 'disconnect', 'property-type', 'property-type-set'].map((name) => Symbol(name));

const noop = () => { };

/**
 * Integrates an icon
 *
 * @element vwc-icon
 *
 * @prop {string} type - The icon's identifier.
 * @prop {"small" | "medium" | "large"} [size="medium"] - The icon's size.
 *
 */
class IconElement extends HTMLElement {

	constructor() {
		super();

		const
			rootEl = this.attachShadow({ mode: 'open' }),
			[styleEl, slotEl] = ['style', 'slot'].map((elName) => document.createElement(elName));

		styleEl.innerHTML = style.cssText;

		[SYMBOL_CONNECT, SYMBOL_DISCONNECT, SYMBOL_PROPERTY_TYPE_SET].forEach((symbol) => this[symbol] = noop);

		const
			connectStream = kefir.stream(({ emit }) => this[SYMBOL_CONNECT] = emit),
			typeProperty = kefir
				.concat([
					kefir.constant(this.getAttribute('type') || ''),
					kefir.stream(({ emit }) => this[SYMBOL_PROPERTY_TYPE_SET] = emit)
				])
				.skipDuplicates()
				.toProperty()
				.onValue(noop);

		// Update icon
		connectStream
			.flatMapLatest(() => {
				return typeProperty
					.filter(Boolean)
					.flatMap((typeId) => kefir.fromPromise(resolveIcon(typeId)))
					.takeUntilBy(kefir.stream(({ emit }) => this[SYMBOL_DISCONNECT] = emit).take(1));
			})
			.filter(() => this.isConnected)
			.onValue((svg) => slotEl.innerHTML = svg)
			.onError(console.warn);

		// Assemble element
		connectStream
			.take(1)
			.onValue(() => [styleEl, slotEl].forEach((el) => rootEl.appendChild(el)));

		// Update local vars/attributes
		kefir
			.concat([
				connectStream.take(1).ignoreValues(),
				typeProperty
			])
			.onValue((type) => type && this.setAttribute('type', type));
	}

	static get observedAttributes() {
		return ['type'];
	}

	set type(value) {
		if (!value) {
			console.warn('Type must be a specified');
		} else {
			this[SYMBOL_PROPERTY_TYPE_SET](value);
		}
	}

	get type() {
		return this[SYMBOL_PROPERTY_TYPE];
	}

	set size(value) {
		this.setAttribute('size', value);
	}

	get size() {
		return this.getAttribute('size');
	}

	connectedCallback() {
		this.classList.add('vvd-icon');
		this[SYMBOL_CONNECT]();
	}

	disconnectedCallback() {
		this[SYMBOL_DISCONNECT]();
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		switch (attrName) {
			case 'type':
				this.type = ['undefined', 'null'].includes(newValue) ? '' : newValue;
				break;
		}
	}
}

window.customElements.define('vwc-icon', IconElement);
export { IconElement as Icon };
