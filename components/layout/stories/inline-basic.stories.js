import '@vonage/vwc-layout';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Alpha/Components/Layout',
	component: 'vwc-layout',
	argTypes
};

const Template = args => html`
<style>
	.story {
		background-color: var(--connotation);
		color: var(--on-connotation);
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid var(--vvd-color-neutral-20);
	}
	.story figure{
		margin: 0;
		inline-size: 100%;
		block-size: 220px;
		background: var(--bg);
		background-size: cover;
	}

	.story .story-content{
		padding:20px;
		box-sizing: border-box;
	}
	.story:nth-child(odd) {
		--connotation: var(--vvd-color-main);
	}
	.story:nth-child(even){
		--connotation: var(--vvd-color-neutral-20);
	}
</style>

<vwc-layout ...=${spread(args)}>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/351/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/352/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/353/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/354/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/355/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/356/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>
	<section class="story">
		<figure style="--bg: url(https://picsum.photos/357/200)"></figure>
		<article class="story-content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
			</p>
		</article>
	</section>

</vwc-layout>`;

export const Basic = Template.bind({});
Basic.args = {};

export const Block = Template.bind({});
Block.args = { 'column-basis': 'block' };

