import { html } from "lit-html";
import Element from "../modules/element.js";
import "@vonage/vwc-carousel";
import "@vonage/vwc-carousel/vwc-carousel-item";

export default class Carousel extends Element {
	async getHtml() {
		return html`
		<style>
</style>
			<vwc-carousel style="width:500px;height: 200px;">
				<vwc-carousel-item>
					<h1>Header for plain html</h1>
					<p>lorem ipsum dolor</p>
				</vwc-carousel-item>
				<vwc-carousel-item>
					<img
						src="https://source.unsplash.com/MAYEkmn7G6E"
						style="max-width:100%;object-fit:cover;"
					/>
				</vwc-carousel-item>
				<vwc-carousel-item>
					<img src="https://source.unsplash.com/MAYEkmn7G6E" />
				</vwc-carousel-item>
				<vwc-carousel-item>
					<img src="https://source.unsplash.com/MAYEkmn7G6E" />
				</vwc-carousel-item>
				<vwc-carousel-item>
					<img src="https://source.unsplash.com/MAYEkmn7G6E" />
				</vwc-carousel-item>
				<vwc-carousel-item>
					<img src="https://source.unsplash.com/MAYEkmn7G6E" />
				</vwc-carousel-item>
				<vwc-carousel-item>
					<img src="https://source.unsplash.com/MAYEkmn7G6E" />
				</vwc-carousel-item>
			</vwc-carousel>
		`;
	}
}
