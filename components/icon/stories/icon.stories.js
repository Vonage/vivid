import '@vonage/vwc-icon';
import _ from 'lodash';
import { storiesOf } from '@storybook/web-components';
import storyCssContent from './icon.story.css.js';
import icons from "./icon-manifest.json";

const
	PATH_SEPARATOR = '/';
	const CATEGORIES_TITLES = {
		"check": "Checks",
		"arrows": "Arrows",
		"file": "File",
		"sort": "Sorting",
		"emoji": "Emojis",
		"delete": "Delete and Cancel",
		"devices": "Devices",
		"chevrons": "Chevrons",
		"tools": "Tools",
		"social": "Social",
		"messaging": "Messaging",
		"charts": "Charts",
		"view": "View",
		"flags": "Flags",
		"alert": "Alert",
		"connectivity": "Connectivity"
	};

const registerCategory = (categoryTitle, content) => storiesOf(['Components', 'Atoms', 'Icon', 'Types'].join(PATH_SEPARATOR), module)
	.add(categoryTitle, () => {
		const styleEl = document.createElement('style');
		styleEl.innerHTML = storyCssContent;
		const divEl = document.createElement('div');
		divEl.className = "container";
		divEl.innerHTML = content;
		const fragment = document.createDocumentFragment();
		[styleEl, divEl].forEach((el) => fragment.appendChild(el));
		return fragment;
	});

_(icons)
	.groupBy(({ tag })=> tag.map((content) => (content.match(/^category_(.+)/) || [])[1]).find(Boolean))
	.forEach((list, category)=> {
			registerCategory(
				CATEGORIES_TITLES[category] || "General",
				list.map(({ id: icon_id }) => `<figure><vwc-icon title=${icon_id} size="large" type="${icon_id}"></vwc-icon><figcaption>${icon_id}</figcaption></figure>`).join('\n')
			);
	});