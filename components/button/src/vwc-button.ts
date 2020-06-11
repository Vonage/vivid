import { customElement } from 'lit-element';
import { Button as MWCButton } from '@material/mwc-button';
import { style as vwcButtonStyle } from './vwc-button.css';
import { style as mwcButtonStyle } from '@material/mwc-button/mwc-button-css.js';
import { style as styleCoupling } from '@vonage/vvd-style-coupling/vvd-style-coupling.css.js';

declare global {
	interface HTMLElementTagNameMap {
		'vwc-button': VWCButton;
	}
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
MWCButton.styles = [styleCoupling, mwcButtonStyle, vwcButtonStyle];

/**
 * Here is a description of my web component.
 * This component is an extension of [<mwc-button>](https://github.com/material-components/material-components-web-components/tree/master/packages/button)
 *
 * @element my-element
 *
 * @fires change - This jsdoc tag makes it possible to document events.
 * @fires submit
 *
 * @attr {Boolean} disabled - This jsdoc tag documents an attribute.
 * @attr {on|off} switch - Here is an attribute with either the "on" or "off" value.
 * @attr [my-attr=default value]
 *
 * @prop {String} myProp - You can use this jsdoc tag to document properties.
 * @prop value
 *
 * @slot - This is an unnamed slot (the default slot)
 * @slot start - This is a slot named "start".
 * @slot end
 *
 * @cssprop --main-bg-color - This jsdoc tag can be used to document css custom properties.
 * @cssprop [--main-color=red]

 * @csspart container
 */
@customElement('vwc-button')
export class VWCButton extends MWCButton {
	static get observedAttributes() {
		return [
			/**
			 * The header text of this element
			 */
			'header',
		];
	}

	/**
	 * This is a description of a property with an attribute with exactly the same name: "color".
	 * @type {"red"|"green"|"blue"}
	 * @attr
	 */
	color = 'red';

	/**
	 * This is a description of a property with an attribute called "my-prop".
	 * @type {number}
	 * @deprecated
	 * @attr my-prop
	 */
	myProp = 10;
}
