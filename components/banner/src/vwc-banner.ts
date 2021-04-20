import '@vonage/vvd-core';
import '@vonage/vwc-icon';
import '@vonage/vwc-icon-button';
import { style as BannerStyle } from './vwc-banner.css';
import {
	customElement, html, LitElement, property
} from 'lit-element';
import { nothing } from 'lit-html';
import { Connotation } from '@vonage/vvd-foundation/constants';

type BannerConnotation =
	Connotation.Info |
	Connotation.Announcement |
	Connotation.Success |
	Connotation.Warning |
	Connotation.Alert;

declare global {
	interface HTMLElementTagNameMap {
		'vwc-banner': VWCBanner;
	}
}

const connotationToIconType = function (connotation:BannerConnotation):string {
	return ({
		[Connotation.Info]: 'info-solid',
		[Connotation.Announcement]: 'megaphone-solid',
		[Connotation.Success]: 'check-circle-solid',
		[Connotation.Warning]: 'warning-solid',
		[Connotation.Alert]: 'error-solid'
	})[connotation];
};

const clickCloseHandler = function (this:VWCBanner) {
	this.dispatchEvent(new CustomEvent('close', {
		bubbles: true,
		composed: true
	}));
};

@customElement('vwc-banner')
export class VWCBanner extends LitElement {
	static styles = [BannerStyle];

	@property({ type: String, reflect: true })
	connotation:BannerConnotation = Connotation.Info;

	@property({ type: String, reflect: true })
	icon?:string;

	@property({ type: Boolean, reflect: true })
	dismissible?:boolean;

	@property({ type: Boolean, reflect: true })
	open = true;

	render() {
		return html`
			<div>
				<header>
					<vwc-icon type="${this.icon ?? connotationToIconType(this.connotation)}"></vwc-icon>
					<slot></slot>
					${this.dismissible ? html`<vwc-icon-button @click="${clickCloseHandler.bind(this)}" icon="close-line"></vwc-icon-button>` : nothing}
				</header>
			</div>
		`;
	}
}
