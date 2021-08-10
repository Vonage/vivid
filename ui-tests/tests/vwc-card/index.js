import '@vonage/vwc-card';

export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML = `
		<style>
			vwc-card {
				margin: 5px;
			}
		</style>
		<vwc-card label="Basic">
		</vwc-card>
		<vwc-card label="Heading" heading="Card title" supporting-text="Supporting Text">
		</vwc-card>
	<div>
		<vwc-card label="Icon" header-icon="chat-line" heading="Using the header-icon attribute" supporting-text="Supporting Text">
		</vwc-card>
		<vwc-card label="Slotted Icon" header-icon="chat-line" heading="Using a slotted icon">
			<vwc-icon type="home" slot="graphics"></vwc-icon>
		</vwc-card>
	</div>
	<vwc-card label="Subtitle" subtitle="Subtitle">
	</vwc-card>
	<vwc-card label="Media" heading="Media" subtitle="Showing media using the 'media' slot.">
		<div style="height: 150px; width: 100%; background-color: red;" slot="media"></div>
	</vwc-card>
	<vwc-card label="Actions" heading="Actions" subtitle="Use the 'actions' slot in order to add actionable items.">
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info" type="submit" outlined="">Click
		</vwc-button>
	</vwc-card>
	<vwc-card label="All" heading="Card title" subtitle="Subtitle" header-icon="chat-line" support-text="Support Text">
		<div style="height: 150px; width: 100%; background-color: red;" slot="media"></div>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info" type="submit" outlined="">Click
		</vwc-button>
	</vwc-card>
		`;
	wrapper.appendChild(elementWrapper);
}
