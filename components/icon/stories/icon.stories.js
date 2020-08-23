import '@vonage/vwc-icon';
import _ from "lodash";
import { default as icons } from './icon.story.json';
import { storiesOf } from '@storybook/web-components';
import storyCssContent from "./icon.story.css.js";

const registerCategory = (categoryTitle, content)=> storiesOf(["Atoms", "Icon", "Types", categoryTitle].join('/'), module)
	.add(categoryTitle, () => {
		const styleEl = document.createElement('style');
		styleEl.innerHTML = storyCssContent;
		const divEl = document.createElement('div');
		divEl.className = "container";
		divEl.innerHTML = content;
		const fragment = document.createDocumentFragment();
		[styleEl, divEl].forEach((el)=> fragment.appendChild(el));
		return fragment;
	});

_(icons)
	.groupBy('category_id')
	.map((list)=> {
			return [
				_(list).chain().first().get('category_title').value(),
				list.map(({ icon_id })=>`<figure><vwc-icon title=${icon_id} size="large" type="${icon_id}"></vwc-icon><figcaption>${icon_id}</figcaption></figure>`).join('\n')
			];
	})
	.forEach(_.spread(registerCategory));