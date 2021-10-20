import '@vonage/vwc-top-app-bar';
import * as topAppBarStories from '../../../components/top-app-bar/stories/top-app-bar.stories';
import {storiesToElement} from "../../utils/storiesToElement";

export async function createElementVariations(wrapper) {
	const elementWrapper = storiesToElement(topAppBarStories);

	wrapper.appendChild(elementWrapper);
}
