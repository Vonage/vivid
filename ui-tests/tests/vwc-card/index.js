import '@vonage/vwc-card';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-icon-button-toggle';

export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.id = 'card-wrapper';
	elementWrapper.innerHTML = `
		<style>
			#card-wrapper {
				display: grid;
				grid-template-columns: repeat(3, 300px);
				gap: 1rem;
				background-color: gray;
				padding: 1rem;
  		}
		</style>
		<vwc-card label="Basic"></vwc-card>
		<vwc-card label="Heading" heading="Card title" subtitle="subtitle Text"></vwc-card>
		<vwc-card label="Heading" heading="Card title" supporting-text="Supporting Text"></vwc-card>

		<vwc-card label="Heading" heading="Very Long Card title That spreads into two or three lines" subtitle="I'm a very long subtitle should I be trimmed?">
		</vwc-card>

		<vwc-card label="Heading" heading="Very Long Card title That spreads into two or three lines" subtitle="I'm a very long subtitle should I be trimmed?"  supporting-text="Lorem ipsum dolor sit amet, consectet adipiscing elit">
		</vwc-card>

		<vwc-card label="trimmed Heading" heading="Very Long Card title That spreads into two or three lines" subtitle="I'm a very long subtitle should I be trimmed?"  supporting-text="I'm a Supporting text, cant be line trimmed. Lorem ipsum dolor sit amet, consectet adipiscing elit" style="--title-line-clamp :1; --subtitle-line-clamp:1">
		</vwc-card>

		<vwc-card label="Icon" header-icon="chat-line" heading="Using the header-icon attribute" subtitle="I'm a very long subtitle should I be trimmed?" supporting-text="Lorem ipsum dolor sit amet, consectet adipiscing elit">
		</vwc-card>
		<vwc-card label="Slotted Icon" heading="Using a slotted icon">
			<vwc-icon type="home" slot="graphics"></vwc-icon>
		</vwc-card>

			<vwc-card label="Slotted Icon" heading="Using a slotted icon">
			<div slot="graphics">RR</div>
		</vwc-card>

		<vwc-card label="Slotted Icon" heading="Using a slotted image for icon">
			<img slot="graphics"src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&i=af462b28146d2ac91599602e083ddee5" alt="Sitting on Floor by Gustavo Pedrosa" />
		</vwc-card>

	<vwc-card label="Subtitle" subtitle="Subtitle">
	</vwc-card>

	<vwc-card label="Media" heading="Media" subtitle="Showing media using the 'media' slot.">
		<div style="height: 150px; width: 100%; background-color: red;" slot="media"></div>
	</vwc-card>

		<vwc-card label="Media" heading="Media" subtitle="Showing media using the 'media' slot.">
			<img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor by Gustavo Pedrosa" />
</vwc-card>




	<vwc-card label="Actions" heading="Actions" subtitle="Use the 'actions' slot in order to add actionable items.">
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info" type="submit" outlined="">Click
		</vwc-button>
	</vwc-card>

		<vwc-card label="Actions">
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info" type="submit" outlined="">Click
		</vwc-button>
	</vwc-card>

	<vwc-card label="All" heading="Card title" subtitle="Subtitle" header-icon="chat-line" support-text="Support Text">
		<div slot="media"><img src="https://doodleipsum.com/300x150/flat?bg=7463D9&i=60361756b0ad15f4b3c4bd691f647ba9" alt="Sitting on Floor by Gustavo Pedrosa" /><p style="padding: 0 1.5rem; margin:0; text-align: center">Illustration by <a href="https://blush.design/artists/JycqpHYvuwwN3HzxBNyr/gustavo-pedrosa">Gustavo Pedrosa</a></p></div>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info" type="submit" outlined="">Click
		</vwc-button>
	</vwc-card>

	<vwc-card label="trimmed Heading" heading="Very Long Card title That spreads into two or three lines" subtitle="I'm a very long subtitle should I be trimmed?"  supporting-text="I'm a Supporting text, cant be line trimmed. Lorem ipsum dolor sit amet, consectet adipiscing elit" style="--title-line-clamp :1; --subtitle-line-clamp:1">
			<vwc-icon-button-toggle onicon="bookmark-full" officon="bookmark" connotation="cta" slot="actionItem"></vwc-icon-button-toggle>
		</vwc-card>

		<vwc-card label="trimmed Heading" heading="Very Long Card title That spreads into two or three lines" subtitle="I'm a very long subtitle should I be trimmed?"  supporting-text="I'm a Supporting text, cant be line trimmed. Lorem ipsum dolor sit amet, consectet adipiscing elit">
			<vwc-icon-button icon="more-vertical-solid" slot="actionItem"></vwc-icon-button>
		</vwc-card>
		<vwc-card label="trimmed Heading" heading="Very Long Card title That spreads into two or three lines" subtitle="I'm a very long subtitle should I be trimmed?"  supporting-text="I'm a Supporting text, cant be line trimmed. Lorem ipsum dolor sit amet, consectet adipiscing elit">
			<vwc-icon-button icon="pin-2-solid" slot="actionItem"></vwc-icon-button>
		</vwc-card>
		`;
	wrapper.appendChild(elementWrapper);
}


