import "./vivid-storybook-utils.js";
import { addParameters, setCustomElements } from "@storybook/web-components";
import customElements from "../custom-elements.json";

async function run() {
	setCustomElements(customElements);
	addParameters({
		docs: {
			inlineStories: true,
		},
	});
}

run();
// import '@storybook/react';
// import { withPlayroom } from 'storybook-addon-playroom';

// //	this decorator MUST be the first one
// addDecorator(withPlayroom);

// addParameters({
// 	playroom: {
// 		url: 'http://localhost:9000',
// 		disabled: trues
// 	},
// });
