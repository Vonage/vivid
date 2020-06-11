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