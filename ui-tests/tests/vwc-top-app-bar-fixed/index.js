import '@vonage/vwc-top-app-bar-fixed';
import * as topAppBarFixedStories from '../../../components/top-app-bar-fixed/stories/top-app-bar-fixed.stories';
import {storiesToElement} from "../../utils/storiesToElement";

export async function createElementVariations(wrapper) {
	const elementWrapper = storiesToElement(topAppBarFixedStories);
	const scrolledElementWrapper = storiesToElement(topAppBarFixedStories);

	scrolledElementWrapper.childNodes.forEach(childNode => childNode.scrollTarget = scrolledElementWrapper);
	scrolledElementWrapper.style.height = "500px";
	scrolledElementWrapper.style.overflow = "scroll";

	wrapper.appendChild(elementWrapper);
	wrapper.appendChild(scrolledElementWrapper);
	await new Promise(res => setTimeout(() => {
		scrolledElementWrapper.scrollTop = 50;
		res();
	}, 0));

}


