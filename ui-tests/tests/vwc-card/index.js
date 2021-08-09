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
			<div>Default Content</div>
		</vwc-card>
	<vwc-card label="Heading" heading="Card title">
		<div>Default Content</div>
	</vwc-card>
	<div>
		<vwc-card label="Icon" header-icon="chat-line" heading="">
			<div>Using the icon attribute</div>
		</vwc-card>
		<vwc-card label="Slotted Icon" header-icon="chat-line" heading="">
			<vwc-icon type="home" slot="header-icon"></vwc-icon>
			<div>Using a slotted icon</div>
		</vwc-card>
	</div>
	<vwc-card label="Badge" badge-content="New" heading="">
		<div>Default Content</div>
	</vwc-card>
	<vwc-card label="Media" heading="Media" badge-content="New">
		<div style="height: 150px; width: 100%; background-color: red;" slot="media"></div>
		<div>Showing media using the 'media' slot.</div>
	</vwc-card>
	<vwc-card label="Actions" heading="Actions">
		<div>Use the 'actions' slot in order to add actionable items.</div>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info" type="submit" outlined="">Click
		</vwc-button>
	</vwc-card>
	<vwc-card label="Large" heading="Card title" header-icon="chat-line" badge-content="New">
		<div>Default Content</div>
	</vwc-card>
		`;
	wrapper.appendChild(elementWrapper);
}
