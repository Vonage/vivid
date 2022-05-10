import '@vonage/vwc-breadcrumb';
import '@vonage/vwc-breadcrumb-item';

export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML =
		`
		  <vwc-breadcrumb>
				<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
			</vwc-breadcrumb>

			<vwc-breadcrumb>
				<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
				<vwc-breadcrumb-item text="breadcrumb" href="#"></vwc-breadcrumb-item>
			</vwc-breadcrumb>
		`;
	wrapper.appendChild(elementWrapper);
}


