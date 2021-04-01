import '@vonage/vwc-icon';
import _ from 'lodash';
import { storiesOf } from '@storybook/web-components';
import storyCssContent from './icon.story.css.js';
import icons from "./icon-manifest.json";

const
	PATH_SEPARATOR = '/',
	CATEGORIES_TITLES = {
		windows: 'Windows',
		view: 'View',
		video: 'Video',
		utilities_objects: 'Utilities & Objects',
		user_avatar: 'User & Avatar',
		user: 'User',
		travel_places: 'Travel & Places',
		tools: 'Tools',
		time: 'Time',
		sort: 'Sort',
		social: 'Social',
		science: 'Science',
		phone: 'Phone',
		objects: 'Objects',
		messaging: 'Messaging',
		media: 'Media',
		location: 'Location',
		layout: 'Layout',
		flags: 'Flags',
		file: 'File',
		emoji: 'Emoji',
		elements: 'Elements',
		devices: 'Devices',
		delete: 'Delete',
		date_time: 'Date & Time',
		date: 'Date',
		connectivity: 'Connectivity',
		commerce_shapes: 'Commerce shapes',
		commerce: 'Commerce',
		chevrons: 'Chevrons',
		check: 'Check',
		charts: 'Charts',
		cancel: 'Cancel',
		brand: 'Brands',
		calling: 'Calling',
		audio: 'Audio',
		arrows: 'Arrows',
		alert: 'Alert'
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
	.groupBy(({ tag }) => tag.map((content) => (content.match(/^category_(.+)/) || [])[1]).find(Boolean))
	.forEach((list, category) => {
		registerCategory(
			CATEGORIES_TITLES[category] || "General",
			list.map(({ id: icon_id }) => `<figure><vwc-icon title=${icon_id} size="large" type="${icon_id}"></vwc-icon><figcaption>${icon_id}</figcaption></figure>`).join('\n')
		);
	});
