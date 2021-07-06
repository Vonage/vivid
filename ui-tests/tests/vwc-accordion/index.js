import '@vonage/vwc-accordion';
import '@vonage/vwc-expansion-panel';


export async function createElementVariations(wrapper) {
	const accordionElementWrapper = document.createElement('div');
	accordionElementWrapper.innerHTML =
		`
		  <vwc-expansion-panel open header="Campaign Details">
				A campaign describes a specific use case and details of the messages you will be sending through it.
				Such as: sample messages, subscriber opt-in/out, and the associated numbers you will be sending with these messages.
			</vwc-expansion-panel>
		`;
	wrapper.appendChild(accordionElementWrapper);
}


