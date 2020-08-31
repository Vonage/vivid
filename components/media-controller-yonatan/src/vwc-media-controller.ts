class MediaController extends HTMLElement {

	constructor() {
		super();

		const rootDom = this.attachShadow({ mode: 'open' });

	}

	connectedCallback(): void {
	}

	disconnectedCallback(): void {
	}
}

export default MediaController;
customElements.define('vwc-media-controller-yonatan', MediaController);