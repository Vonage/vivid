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
			width: 500px;
			height: 200px;
		}
	</style>

	<vwc-carousel class="carousel">
		<img class="item" style="object-fit:cover" src="https://source.unsplash.com/IUPiWRNKNm8"/>
		<div class="item text" style="background-color:rgba(100,100,255,0.6);padding:24px">
			Some textual explanation of what's going on here...
		</div>
		<img class="item" style="object-fit:cover" src="https://source.unsplash.com/q_M6B9_cajM"/>
		<img class="item" style="object-fit:cover" src="https://source.unsplash.com/CVBQdww5JZU"/>
	</vwc-carousel>
`;