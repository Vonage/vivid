import '@vonage/vwc-banner';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { argTypes } from './arg-types';
import { ifDefined } from 'lit-html/directives/if-defined';
import noop from 'lodash/fp/noop';
import pipe from 'lodash/fp/pipe';
import { createTimeline, createUpdatableStory } from '@vonage/vvd-umbrella/libs/storybook_tools';

const REOPEN_BANNER_DELAY = 1500;

export default {
	title: 'Alpha/Components/Banner',
	component: 'vwc-banner',
	argTypes
};

export const Basic = (function () {
	let cancelAnimations = noop;
	return createUpdatableStory(function (
		sendUpdate,
		{
			connotation,
			dismissible,
			icon
		}
	) {
		cancelAnimations();
		let open = true;

		const onClose = function () {
			cancelAnimations = createTimeline([
				{ frameFunc: pipe(() => open = false, updateStory), delay: 0 },
				{ frameFunc: pipe(() => open = true, updateStory), delay: REOPEN_BANNER_DELAY }
			]);
		};

		const updateStory = () => {
			sendUpdate(html`
				<style>
					div.demo {
						margin: auto;
						width: 40rem;
						height: 25rem;
						background-color: #eee;
						background-image: url("data:image/svg+xml,%3Csvg width='782' height='754' viewBox='0 0 782 754' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='782' height='754' fill='%23F2F2F2'/%3E%3Crect x='23' y='80' width='733' height='248' rx='6' fill='white'/%3E%3Crect x='393' y='198' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='230' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='262' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='134' width='142' height='12' fill='%23B3B3B3'/%3E%3Crect x='393' y='166' width='324' height='12' fill='%23B3B3B3'/%3E%3Crect x='53' y='120' width='290' height='168' rx='6' fill='%23CCCCCC'/%3E%3Crect width='782' height='59' fill='%23E1E1E1'/%3E%3Crect x='23' y='16' width='500' height='28' rx='3' fill='%23C4C4C4'/%3E%3Ccircle cx='646' cy='30' r='14' fill='%23C4C4C4'/%3E%3Ccircle cx='694' cy='30' r='14' fill='%23C4C4C4'/%3E%3Ccircle cx='742' cy='30' r='14' fill='%23C4C4C4'/%3E%3Crect x='23' y='348' width='733' height='240' rx='6' fill='white'/%3E%3Crect x='90' y='513' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='90' y='539' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='319' y='513' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='319' y='539' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='548' y='513' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='548' y='539' width='141' height='12' fill='%23B3B3B3'/%3E%3Crect x='70' y='388' width='182.667' height='94' rx='6' fill='%23CCCCCC'/%3E%3Crect x='298.667' y='388' width='182.667' height='94' rx='6' fill='%23CCCCCC'/%3E%3Crect x='527.333' y='388' width='182.667' height='94' rx='6' fill='%23CCCCCC'/%3E%3Crect x='23' y='608' width='733' height='125' rx='6' fill='white'/%3E%3Crect x='81' y='651' width='618' height='12' fill='%23B3B3B3'/%3E%3Crect x='81' y='683' width='618' height='12' fill='%23B3B3B3'/%3E%3C/svg%3E%0A");
						border-radius: 10px;
						overflow: hidden;
						background-size: cover;
						box-shadow: 0 0 3px 2px rgba(0,0,0,0.1);
						border: solid 1px #ccc;
					}
				</style>
				<div class="demo">
				<vwc-banner
					@close=${onClose}
					?open=${open}
					?dismissible=${dismissible}
					icon=${ifDefined(icon)}
					connotation=${connotation}>
						Here's some information that you may find important!
						<vwc-button layout="filled" @click=${onClose} dense>Learn More</vwc-button>
				</vwc-banner>
			</div>`);
		};
		updateStory();
	});
})();

Basic.args = {
	connotation: "info",
	dismissible: true
};
Basic.argTypes = {
	open: {
		control: {
			type: null
		}
	}
};

const basicStory = function (text, {
	dismissible = true,
	connotation = "info",
	icon,
	open = true,
	onClose = noop
}) {
	return html`<vwc-banner
		@close=${onClose}
		?open=${open}
		?dismissible=${dismissible}
		icon=${ifDefined(icon)}
		connotation=${connotation}>
		${text}
	</vwc-banner>`;
};

const extendStory = (text, args) => Object.assign(basicStory.bind(null, text), { args });

export const Info = extendStory(`I'm here to give you advice (like, use the knobs on the right for options`, { connotation: "info" });

export const Announcement = extendStory(`I'm here to give you advice (like, use the knobs on the right for options`, { connotation: "announcement" });

export const Success = extendStory(`I'm here to give you good news (Thanks for giving us money!)`, { connotation: "success" });

export const Warning = extendStory(`I'm here to give you a warning (Your zip is down)`, { connotation: "warning" });

export const Alert = extendStory(`I'm here to tell you something's wrong (The horror, the horror)`, { connotation: "alert" });
