import type { Part, ElementPart } from 'lit';
import { nothing } from 'lit/html.js';
import { directive, AsyncDirective } from 'lit/async-directive.js';

type EventListenerWithOptions = EventListenerOrEventListenerObject &
    Partial<AddEventListenerOptions>;

/**
 * Usage:
 *    import { html, render } from 'lit-html';
 *    import { spread } from '@vonage/vvd-foundation/utils/lit-helpers/spread.js';
 *
 *    render(
 *      html`
 *        <div
 *          ${spread({
 *            'my-attribute': 'foo',
 *            '?my-boolean-attribute': true,
 *            '.myProperty': { foo: 'bar' },
 *            '@my-event': () => console.log('my-event fired'),
 *          })}
 *        ></div>
 *      `,
 *      document.body,
 *    );
 */
class SpreadDirective extends AsyncDirective {
	// eslint-disable-next-line @typescript-eslint/ban-types
	host!: EventTarget | object | Element;
	element!: Element;
	prevData: { [key: string]: unknown } = {};

	render(_spreadData: { [key: string]: unknown }) {
    	return nothing;
	}
	override update(part: Part, [spreadData]: Parameters<this['render']>) {
    	if (this.element !== (part as ElementPart).element) {
    		this.element = (part as ElementPart).element;
    	}
    	this.host = part.options?.host || this.element;
    	this.apply(spreadData);
    	this.groom(spreadData);
    	this.prevData = spreadData;
	}

	apply(data: { [key: string]: unknown }) {
    	if (!data) return;
    	const { prevData, element } = this;
    	for (const key in data) {
    		const value = data[key];
    		if (value === prevData[key]) {
    			// eslint-disable-next-line no-continue
    			continue;
    		}
    		const name = key.slice(1);
    		switch (key[0]) {
    		case '@': // event listener
    			// eslint-disable-next-line no-case-declarations
    			const prevHandler = prevData[key];
    			if (prevHandler) {
    				element.removeEventListener(
    					name,
    					this,
                            value as EventListenerWithOptions
    				);
    			}
    			element.addEventListener(
    				name,
    				this,
                        value as EventListenerWithOptions
    			);
    			break;
    		case '.': // property
    			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    			// @ts-ignore
    			element[name] = value;
    			break;
    		case '?': // boolean attribute
    			if (value) {
    				element.setAttribute(name, '');
    			} else {
    				element.removeAttribute(name);
    			}
    			break;
    		default:
    			// standard attribute
    			if (value != null) {
    				element.setAttribute(key, String(value));
    			} else {
    				element.removeAttribute(key);
    			}
    			break;
    		}
    	}
	}

	groom(data: { [key: string]: unknown }) {
    	const { prevData, element } = this;
    	if (!prevData) return;
    	for (const key in prevData) {
    		if (!data || !(key in data)) {
    			switch (key[0]) {
    			case '@': // event listener
    				// eslint-disable-next-line no-case-declarations
    				const value = prevData[key];
    				element.removeEventListener(
    					key.slice(1),
    					this,
                            value as EventListenerWithOptions
    				);
    				break;
    			case '.': // property
    				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    				// @ts-ignore
    				element[key.slice(1)] = undefined;
    				break;
    			case '?': // boolean attribute
    				element.removeAttribute(key.slice(1));
    				break;
    			default:
    				// standard attribute
    				element.removeAttribute(key);
    				break;
    			}
    		}
    	}
	}

	handleEvent(event: Event) {
    	// eslint-disable-next-line @typescript-eslint/ban-types
    	const value: Function | EventListenerObject = this.prevData[
    		`@${event.type}`
    	// eslint-disable-next-line @typescript-eslint/ban-types
    	] as Function | EventListenerObject;
    	if (typeof value === 'function') {
    		// eslint-disable-next-line @typescript-eslint/ban-types
    		(value as Function).call(this.host, event);
    	} else {
    		(value as EventListenerObject).handleEvent(event);
    	}
	}

	override disconnected() {
    	const { prevData, element } = this;
    	for (const key in prevData) {
    		// eslint-disable-next-line no-continue
    		if (key[0] !== '@') continue;
    		// event listener
    		const value = prevData[key];
    		element.removeEventListener(
    			key.slice(1),
    			this,
                value as EventListenerWithOptions
    		);
    	}
	}

	override reconnected() {
    	const { prevData, element } = this;
    	for (const key in prevData) {
    		// eslint-disable-next-line no-continue
    		if (key[0] !== '@') continue;
    		// event listener
    		const value = prevData[key];
    		element.addEventListener(
    			key.slice(1),
    			this,
                value as EventListenerWithOptions
    		);
    	}
	}
}

export const spread: any = directive(SpreadDirective);
