import '@vonage/vwc-card/vwc-card.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Components/Card',
	component: 'vwc-card',
	argTypes
};

const styles = `
	<style>
		#root-inner {
			width: 300px
		}
		vwc-card {
			margin: 15px;
		}
	</style>
`;

const Template = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
			--title-line-clamp: 2;
			--subtitle-line-clamp: 2
		}
	</style>
	<vwc-card ...=${spread(args)}>
	</vwc-card>`;

export const Basic = Template.bind({});
Basic.args = {
	label: 'Basic',
	heading: 'Title',
	'text': 'Supporting Text'
};

export const Subtitle = Template.bind({});
Subtitle.args = {
	label: 'Subtitle',
	heading: 'Title',
	subtitle: 'Subtitle',
	'text': 'Supporting Text'
};

export const TrimmedTitles = Template.bind({});
TrimmedTitles.args = {
	label: 'Trimmed titles',
	heading: 'A Long Title that can get up to an infinite number of rows or you can set the number of rows that will be shown until they are trimmed',
	subtitle: 'Subtitle that can get up to an infinite number of rows or you can set the number of rows that will be shown until they are trimmed',
	'text': 'Supporting Text'
};

const MetaTemplate = args => html`
	<style>
		#root-inner {
			width: 400px
		}
	</style>
	<vwc-card ...=${spread(args)} icon="chat-line">
		<vwc-icon-button-toggle onicon="more-vertical-solid" officon="more-vertical-solid" slot="meta"></vwc-icon-button-toggle>
	</vwc-card>
	`;
export const Meta = MetaTemplate.bind({});
Meta.args = {
	label: 'Meta Slot Example',
	heading: 'Meta Slot Example',
	text: 'Meta slot can be used fo extra date on the card like icon or a button icon'
};



export const Elevation = Template.bind({});
Elevation.args = {
	label: 'Top Action Example',
	heading: 'A card with a higher elevation',
	text: 'To emphasize its content',
	elevation: '16'
};


const IconTemplate = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
		}
	</style>
	<vwc-card ...=${spread(args)}>
		<div>Using the icon attribute</div>
	</vwc-card>
	<vwc-card ...=${spread(args)}>
		<vwc-icon type="home" slot="icon"></vwc-icon>
		<div>Using a slotted icon</div>
	</vwc-card>`;
export const Icon = IconTemplate.bind({});
Icon.args = {
	label: 'Icon',
	heading: 'Icon Example',
	'icon': 'chat-line',
	subtitle: 'Subtitle',
	'text': 'Supporting Text'
};


const MediaTemplate = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
		}
	</style>
	<vwc-card ...=${spread(args)}>
		<img style="width: 100%;" alt="test" src="https://www.w3schools.com/tags/img_girl.jpg" slot="media"/>
		<div>Showing media using the 'media' slot.</div>
	</vwc-card>
`;
export const Media = MediaTemplate.bind({});
Media.args = {
	label: 'Media',
	heading: 'Media',
	'icon': 'home',
	subtitle: 'Subtitle',
	'text': 'Supporting Text'
};

const FooterTemplate = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
		}
	</style>
	<vwc-card ...=${spread(args)}>
		<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
	</vwc-card>`;

export const CardFooter = FooterTemplate.bind({});
CardFooter.args = {
	label: 'Footer',
	heading: 'Footer',
	'text': 'Use the \'footer\' slot in order to add actionable items.'
};


const MainSlotTemplate = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
		}
	</style>
	<vwc-card>
		<div slot="main">
			<p>A card with no heading + Subtitle or text</p>
			<p>Can contain whatever is needed.</p>
			<p>Media slot and Footer Slot are still available if needed</p>
		</div>
	</vwc-card>`;

export const MainSlot = MainSlotTemplate.bind({});
MainSlot.args = {
	label: 'Main Slot',
};


const AllTemplate = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
		}
	</style>
	<vwc-card ...=${spread(args)}>
		<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
		<vwc-icon-button-toggle onicon="more-vertical-solid" officon="more-vertical-solid" slot="meta"></vwc-icon-button-toggle>
		<vwc-button slot="footer" shape="pill" layout="outlined" label="Action">
			<vwc-icon type="arrow-bold-right-line" slot="trailingIcon"></vwc-icon>
		</vwc-button>
	</vwc-card>`;
export const AllOptions = AllTemplate.bind({});
AllOptions.args = {
	label: 'All Options',
	heading: 'All Options on Deck',
	'icon': 'chat-line',
	subtitle: 'Subtitle',
	'text': 'Use the \'footer\' slot in order to add actionable items.'
};

const inAGridCards = new Array(9).fill(0)
	.reduce((htmlString, val, index) => {
		htmlString += `
			<vwc-card heading="Card ${index + 1}" icon="chat-line" subtitle="Card no. ${index + 1}" text="This is the right card for you!">
				<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
				<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
			</vwc-card>
	`;
		return htmlString;
	}, '');

const InAGridTemplate = args => html`
	<style>
		vwc-card {
			height: 100%;
		}
	</style>
	<vwc-layout column-basis="md" column-spacing="md" gutters="xl">
		<vwc-card heading="Card 1" icon="chat-line" subtitle="Card no. 1"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 2" icon="chat-line" subtitle="Card no. 2"
							text="To make all the cards at the same height in the layout component simly give the vwc-card height of 100%">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 3" icon="chat-line" subtitle="Card no. 3"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 4" icon="chat-line" subtitle="Card no. 4"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 5" icon="chat-line" subtitle="Card no. 5"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 6" icon="chat-line" subtitle="Card no. 6"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 7" icon="chat-line" subtitle="Card no. 7"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 8" icon="chat-line" subtitle="Card no. 8"
							text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="footer" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
	</vwc-layout>
`;
export const InAGrid = InAGridTemplate.bind({});
