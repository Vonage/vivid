import '@vonage/vwc-card/vwc-card.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Card',
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
		}
	</style>
	<vwc-card ...=${spread(args)}>
	</vwc-card>`;

export const Basic = Template.bind({});
Basic.args = {
	label: 'Basic',
	heading: 'Title',
	'supporting-text': 'Supporting Text'
};

export const Subtitle = Template.bind({});
Subtitle.args = {
	label: 'Subtitle',
	heading: 'Title',
	subtitle: 'Subtitle',
	'supporting-text': 'Supporting Text'
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
		<vwc-icon type="home" slot="header-icon"></vwc-icon>
		<div>Using a slotted icon</div>
	</vwc-card>`;
export const Icon = IconTemplate.bind({});
Icon.args = {
	label: 'Icon',
	heading: 'Icon Example',
	'header-icon': 'chat-line',
	subtitle: 'Subtitle',
	'supporting-text': 'Supporting Text'
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
	'header-icon': 'home',
	subtitle: 'Subtitle',
	'supporting-text': 'Supporting Text'
};

const ActionsTemplate = args => html`
	<style>
		#root-inner {
			width: 300px
		}

		vwc-card {
			margin: 15px;
		}
	</style>
	<vwc-card ...=${spread(args)}>
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
	</vwc-card>`;

export const Actions = ActionsTemplate.bind({});
Actions.args = {
	label: 'Actions',
	heading: 'Actions',
	'supporting-text': 'Use the \'actions\' slot in order to add actionable items.'
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
		<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
	</vwc-card>`;
export const AllOptions = AllTemplate.bind({});
AllOptions.args = {
	label: 'All Options',
	heading: 'All Options on Deck',
	'header-icon': 'chat-line',
	subtitle: 'Subtitle',
	'supporting-text': 'Use the \'actions\' slot in order to add actionable items.'
};

const inAGridCards = new Array(9).fill(0)
	.reduce((htmlString, val, index) => {
		htmlString += `
			<vwc-card heading="Card ${index + 1}" header-icon="chat-line" subtitle="Card no. ${index + 1}" supporting-text="This is the right card for you!">
				<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
				<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
			</vwc-card>
	`;
		return htmlString;
	}, '');

const InAGridTemplate = args => html`
	<style>
		.card-wrapper {
			display: grid;
			grid-template-columns: auto auto auto;
			padding: 10px;
		}

		vwc-card {
			width: 250px;
			margin: 5px;
		}
	</style>
	<div class="card-wrapper">
		<vwc-card heading="Card 1" header-icon="chat-line" subtitle="Card no. 1"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 2" header-icon="chat-line" subtitle="Card no. 2"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 3" header-icon="chat-line" subtitle="Card no. 3"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 4" header-icon="chat-line" subtitle="Card no. 4"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 5" header-icon="chat-line" subtitle="Card no. 5"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 6" header-icon="chat-line" subtitle="Card no. 6"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 7" header-icon="chat-line" subtitle="Card no. 7"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 8" header-icon="chat-line" subtitle="Card no. 8"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
		<vwc-card heading="Card 9" header-icon="chat-line" subtitle="Card no. 9"
							supporting-text="This is the right card for you!">
			<div style="height: 150px; width: 100%; background-color: #871EFF;" slot="media"></div>
			<vwc-button slot="actions" shape="pill" layout="outlined" icon="info">Click</vwc-button>
		</vwc-card>
	</div>
`;
export const InAGrid = InAGridTemplate.bind({});
