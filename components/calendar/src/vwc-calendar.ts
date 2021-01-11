import { customElement, LitElement } from 'lit-element';
import { style } from './vwc-calendar.css';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-calendar': VWCCalendar;
	}
}

/**
 * calendar component
 *
 */
@customElement('vwc-calendar')
export class VWCCalendar extends LitElement {
	/**
	 * @internal
	 * */
	static styles = style;
}
