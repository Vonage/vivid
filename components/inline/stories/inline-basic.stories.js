import '@vonage/vwc-inline';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Atoms/Inline',
	component: 'vwc-inline',
	argTypes
}

const Template = args => html`
<style>
	.child {
		background-color: var(--connotation);
		color: var(--on-connotation);
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid var(--vvd-color-contrast-faint);
	}
	.child img{
		width: 100%;
	}
	.child .child-content{
		padding:20px;
		box-sizing: border-box;
	}
	.child:nth-child(odd) {
		--connotation: var(--vvd-color-main);
	}
	.child:nth-child(even){
		--connotation: var(--vvd-color-contrast-faint);
	}
</style>

<vwc-inline ...=${spread(args)}>
	<div class="child">
		<img src="https://picsum.photos/350/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>
	<div class="child">
		<img src="https://picsum.photos/351/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>
	<div class="child">
		<img src="https://picsum.photos/352/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>
	<div class="child">
		<img src="https://picsum.photos/353/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>
	<div class="child">
		<img src="https://picsum.photos/354/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>
		<div class="child">
		<img src="https://picsum.photos/355/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>
		<div class="child">
		<img src="https://picsum.photos/356/200">
		<p class="child-content">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem varius congue.
		</p>
	</div>

</vwc-inline>`;

export const Basic = Template.bind({});
Basic.args = {  };
