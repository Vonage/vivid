import '@vonage/vwc-banner';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { argTypes } from './arg-types';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import { ifDefined } from 'lit-html/directives/if-defined';
import noop from 'lodash/fp/noop';
import pipe from 'lodash/fp/pipe';
import { createTimeline, createUpdatableStory } from '@vonage/vvd-umbrella/libs/storybook_tools';
import { pageContentMock } from '../../../scripts/storybook/svg_templates';

const REOPEN_BANNER_DELAY = 1500;

export default {
	title: 'Components/Banner',
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
			icon,
			message
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
						border-radius: 10px;
						overflow: hidden;
						box-shadow: 0 0 3px 2px rgba(0,0,0,0.1);
						border: solid 1px #ccc;
					}

					div.demo > svg {
						width: 100%;
					}

				</style>
				<div class="demo">
				<vwc-banner
					@closing=${onClose}
					?open=${open}
					?dismissible=${dismissible}
					icon=${ifDefined(icon)}
					connotation=${connotation}
					message=${message}>
					<vwc-button slot="actionItems" layout="filled" @click=${onClose} dense>Learn More</vwc-button>
				</vwc-banner>
				${unsafeSVG(pageContentMock())}
			</div>`);
		};
		updateStory();
	});
}());

Basic.args = {
	connotation: "info",
	dismissible: true,
	message: "Here's some information that you may find important!"
};
Basic.argTypes = {
	open: {
		control: {
			type: null
		}
	}
};

const basicStory = function (text, {
	dismissible = false,
	connotation = "info",
	icon,
	open = true,
	onClose = noop
}) {
	return html`<vwc-banner
		@closing=${onClose}
		?open=${open}
		?dismissible=${dismissible}
		icon=${ifDefined(icon)}
		connotation=${connotation}
		message=${text}>
	</vwc-banner>`;
};

const extendStory = (text, args) => Object.assign(basicStory.bind(null, text), { args });

export const Info = extendStory(`I'm here to give you advice (like, use the knobs on the right for options`, { connotation: "info" });

export const Announcement = extendStory(`I'm here to give you advice (like, use the knobs on the right for options`, { connotation: "announcement" });

export const Success = extendStory(`I'm here to give you good news (Thanks for giving us money!)`, { connotation: "success" });

export const Warning = extendStory(`I'm here to give you a warning (Your zip is down)`, { connotation: "warning" });

export const Alert = extendStory(`I'm here to tell you something's wrong (The horror, the horror)`, { connotation: "alert" });
