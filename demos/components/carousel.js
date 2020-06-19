import { html } from "lit-html";
import Element from "../modules/element.js";
import "@vonage/vwc-carousel";
import "@vonage/vwc-carousel/vwc-carousel-item";

export default class Carousel extends Element {
	async getHtml() {
		return html`
			<style></style>
			<vwc-carousel style="width:500px;height: 200px;">
			<vwc-carousel-item>
						<img
							src="https://source.unsplash.com/IUPiWRNKNm8"
							style="max-width:100%;object-fit:cover;"
						/>
					</vwc-carousel-item>
					<vwc-carousel-item>
						<img
							src="https://source.unsplash.com/q_M6B9_cajM"
							style="max-width:100%;object-fit:cover;"
						/>
					</vwc-carousel-item>
					<vwc-carousel-item>
						<img
							src="https://source.unsplash.com/CVBQdww5JZU"
							style="max-width:100%;object-fit:cover;"
						/>
					</vwc-carousel-item>
		`;
	}
}
