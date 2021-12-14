import '@vonage/vwc-button-toggle-group';
import '@vonage/vwc-button';
import '@vonage/vwc-icon-button';


export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
	<style>
		.wrapper {
			margin-bottom: 1rem;
			margin-left: 3rem;
		}
		.grid {
			display: grid;
			grid-template-columns: repeat(2 , 350px 200px);
			gap: 1rem;
		}
	</style>
	<div class="grid">
	<div class="wrapper">
		<vwc-button-toggle-group dense mandatory>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group dense >
			<vwc-icon-button icon="video-solid"></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group dense shape="pill">
			<vwc-button label="enlarged"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group dense shape="pill" multi>
			<vwc-icon-button icon="video-solid"></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group accent>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
		<div class="wrapper">
		<vwc-button-toggle-group>
			<vwc-icon-button icon="video-solid"></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group shape="pill">
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid"></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
		<div class="wrapper">
		<vwc-button-toggle-group shape="pill" multi>
			<vwc-icon-button icon="video-solid"></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid"></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group enlarged>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid" selected></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
		<div class="wrapper">
		<vwc-button-toggle-group enlarged >
			<vwc-icon-button icon="video-solid"></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group enlarged shape="pill" multi>
			<vwc-button label="Standard" selected></vwc-button>
			<vwc-button label="Hybrid" selected></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
		<div class="wrapper">
		<vwc-button-toggle-group enlarged shape="pill" multi>
			<vwc-icon-button icon="video-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group enlarged disabled>
			<vwc-button label="Standard"></vwc-button>
			<vwc-button label="Hybrid" selected></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
		<div class="wrapper">
		<vwc-button-toggle-group enlarged disabled>
			<vwc-icon-button icon="video-solid"></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	<div class="wrapper">
		<vwc-button-toggle-group enlarged shape="pill" multi disabled>
			<vwc-button label="Standard" selected></vwc-button>
			<vwc-button label="Hybrid" selected></vwc-button>
			<vwc-button label="Satellite"></vwc-button>
		</vwc-button-toggle-group>
	</div>
		<div class="wrapper">
		<vwc-button-toggle-group enlarged shape="pill" multi disabled>
			<vwc-icon-button icon="video-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="call-solid"></vwc-icon-button>
			<vwc-icon-button icon="chat-solid" selected></vwc-icon-button>
			<vwc-icon-button icon="microphone-solid"></vwc-icon-button>
		</vwc-button-toggle-group>
	</div>
	</div>

	`;
	wrapper.appendChild(textElementWrapper);
}
