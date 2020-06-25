import '@vonage/vwc-carousel/vwc-carousel.js';
import '@vonage/vwc-carousel/vwc-carousel-item.js';
import { withA11y } from '@storybook/addon-a11y';
import { html } from 'lit-element';

export default {
	title: 'Cells/Carousel',
	component: 'vwc-carousel',
	decorators: [withA11y]
}

export const basic = () => html`

	<vwc-carousel style="width:500px;height:200px;">
		<vwc-carousel-item>
			<img class="item" src="https://source.unsplash.com/IUPiWRNKNm8"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="item" src="https://source.unsplash.com/q_M6B9_cajM"/>
		</vwc-carousel-item>
		<vwc-carousel-item>
			<img class="item" src="https://source.unsplash.com/CVBQdww5JZU"/>
		</vwc-carousel-item>
	</vwc-carousel>
`;