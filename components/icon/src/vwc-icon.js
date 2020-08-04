import kefir from "kefir";

const [
	SYMBOL_CONNECT,
	SYMBOL_DISCONNECT,
	SYMBOL_PROPERTY_TYPE,
	SYMBOL_PROPERTY_TYPE_SET,
] = ["connect", "disconnect", "property-type", "property-type-set"].map((name)=> Symbol(name));

const noop = ()=> {};

/**
 * Integrates an icon
 *
 * @element vwc-icon
 *
 * @prop {string} type - The icon's identifier.
 *
 */
class IconElement extends HTMLElement {

	constructor() {
		super();

		const
			rootEl = this.attachShadow({ mode: "open" }),
			[styleEl, slotEl] = ["style", "slot"].map((elName)=> document.createElement(elName));

		styleEl.innerHTML = `:host { display: inline-block; width: 32px; height: 32px; } :host > slot > svg { width: 100%; height: 100%; }`;
		[SYMBOL_CONNECT, SYMBOL_DISCONNECT, SYMBOL_PROPERTY_TYPE_SET].forEach((symbol)=> this[symbol] = noop);

		const
			connectStream = kefir.stream(({ emit })=> this[SYMBOL_CONNECT] = emit),
			typeProperty = kefir
				.concat([
					kefir.constant(this.getAttribute('type')),
					kefir.stream(({ emit })=> this[SYMBOL_PROPERTY_TYPE_SET] = emit)
				])
				.skipDuplicates()
				.toProperty()
				.onValue(noop);

		// Update icon
		connectStream
			.flatMapLatest(()=> {
				return typeProperty
					.flatMap((typeId) => kefir.fromPromise(import(`./icon/${typeId}.js`)).map(({ default: f }) => f()))
					.takeUntilBy(kefir.stream(({ emit })=> this[SYMBOL_DISCONNECT] = emit).take(1))
			})
			.filter(()=> this.isConnected)
			.onValue((svg)=> slotEl.innerHTML = svg);

		// Assemble element
		connectStream
			.take(1)
			.onValue(()=> [styleEl, slotEl].forEach((el)=> rootEl.appendChild(el)));

		// Update local var
		kefir
			.concat([
				connectStream.take(1).ignoreValues(),
				typeProperty
			])
			.onValue((val)=> {
				this[SYMBOL_PROPERTY_TYPE] = val;
				this.setAttribute('type', val);
			});
	}

	static get observedAttributes(){
		return ["type"];
	}

	set type(value){
		this[SYMBOL_PROPERTY_TYPE_SET](value);
	}

	get type() {
		return this[SYMBOL_PROPERTY_TYPE];
	}

	connectedCallback(){
		this[SYMBOL_CONNECT]();
	}

	disconnectedCallback(){
		this[SYMBOL_DISCONNECT]();
	}

	attributeChangedCallback(attrName, oldValue, newValue){
		switch(attrName){
			case "type":
				this.type = newValue;
				break;
		}
	}
}

window.customElements.define('vwc-icon', IconElement);
export { IconElement as Icon };