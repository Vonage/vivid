import '@vonage/vwc-carousel/vwc-carousel.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Cells/Carousel',
	component: 'vwc-carousel',
	decorators: [withA11y]
}

export const basic = () => html`
	<style>
		.carousel {
			width: 80%;
			height: 200px;
			max-width: 800px;
			margin: 0;
		}

		.image {
			object-fit: cover;
			min-width: 100%;
			min-height: 100%;
		}
	</style>

	<vwc-carousel class="carousel">
		<vwc-carousel-item>
			<div class="item text" style="padding:24px;background-color:lightblue;width:100%;" @click="${onClick}">
				Some textual explanation of what's going on here...
			</div>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="https://source.unsplash.com/IUPiWRNKNm8" alt="slide 1"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="https://source.unsplash.com/q_M6B9_cajM" alt="slide 2"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="https://source.unsplash.com/CVBQdww5JZU" alt="slide 3"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="assets/images/carousel-slide-example.png" alt="slide 4"/>
		</vwc-carousel-item>
	</vwc-carousel>
`;

function onClick() {
	console.log('something');
}

export const events = () => html`
	<style>
		.carousel {
			width: 60%;
			height: 200px;
			max-width: 800px;
			margin: 0;
		}
	</style>

	<vwc-carousel class="carousel" autoplay="true">
		<vwc-carousel-item>
			<div class="item text" style="padding:24px;background-color:lightblue;width:100%;" @click="${onClick1}">
				Slide 1
			</div>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<div class="item text" style="padding:24px;background-color:lightblue;width:100%;" @click="${onClick2}">
				Slide 2
			</div>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<div class="item text" style="padding:24px;background-color:lightblue;width:100%;" @click="${onClick3}">
				Slide 3
			</div>
		</vwc-carousel-item>
	</vwc-carousel>
`;

function onClick1() {
	console.log('Click 1');
}

function onClick2() {
	console.log('Click 2');
}

function onClick3() {
	console.log('Click 3');
}