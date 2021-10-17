import '@vonage/vwc-top-app-bar-fixed';
import * as topAppBarFixedStories from '../../../components/top-app-bar-fixed/stories/top-app-bar-fixed.stories';
import {storiesToElement} from "../../utils/storiesToElement";

export async function createElementVariations(wrapper) {
	const elementWrapper = storiesToElement(topAppBarFixedStories);
	wrapper.appendChild(elementWrapper);
}


