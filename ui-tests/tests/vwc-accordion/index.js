import '@vonage/vwc-accordion';
import '@vonage/vwc-accordion';
import '@vonage/vwc-expansion-panel';


export async function createElementVariations(wrapper) {
	const accordionElementWrapper = document.createElement('div');
	accordionElementWrapper.innerHTML =
		`
		  <vwc-expansion-panel header="Campaign Details"></vwc-expansion-panel>

		  <vwc-expansion-panel header="Campaign Details" indicatorIconSet="binary"></vwc-expansion-panel>
		  <vwc-expansion-panel header="Campaign Details" icon="chat-solid"></vwc-expansion-panel>
		  <vwc-expansion-panel header="Campaign Details" leadingToggle></vwc-expansion-panel>
		  <vwc-expansion-panel header="Campaign Details" dense></vwc-expansion-panel>

		  <vwc-expansion-panel open header="Campaign Details">
				A campaign describes a specific use case and details of the messages you will be sending through it.
				Such as: sample messages, subscriber opt-in/out, and the associated numbers you will be sending with these messages.
			</vwc-expansion-panel>

			<vwc-accordion>
				<vwc-expansion-panel open header="Item 1">lorem ipsum dolor amet</vwc-expansion-panel>
				<vwc-expansion-panel header="Item 2">lorem ipsum dolor amet</vwc-expansion-panel>
				<vwc-expansion-panel open header="Item 3">lorem ipsum dolor amet</vwc-expansion-panel>
				<vwc-expansion-panel header="Item 4">lorem ipsum dolor amet</vwc-expansion-panel>
			</vwc-accordion>

			<vwc-accordion multi>
				<vwc-expansion-panel open header="Item 1">lorem ipsum dolor amet</vwc-expansion-panel>
				<vwc-expansion-panel header="Item 2">lorem ipsum dolor amet</vwc-expansion-panel>
				<vwc-expansion-panel open header="Item 3">lorem ipsum dolor amet</vwc-expansion-panel>
				<vwc-expansion-panel header="Item 4">lorem ipsum dolor amet</vwc-expansion-panel>
			</vwc-accordion>
		`;
	wrapper.appendChild(accordionElementWrapper);
}


