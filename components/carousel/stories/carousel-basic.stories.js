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
			<img class="image" src="https://source.unsplash.com/IUPiWRNKNm8"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<div class="item text" style="padding:24px;background-color:lightblue;width:100%;">
				Some textual explanation of what's going on here...
			</div>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="https://source.unsplash.com/q_M6B9_cajM"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="https://source.unsplash.com/CVBQdww5JZU"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="image" src="assets/images/carousel-slide-example.png"/>
		</vwc-carousel-item>
	</vwc-carousel>
`;