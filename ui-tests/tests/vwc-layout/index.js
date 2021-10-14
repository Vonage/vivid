import '@vonage/vwc-layout';

export async function createElementVariations(wrapper) {
	const inlineElementWrapper = document.createElement('div');
	inlineElementWrapper.innerHTML = `
	<style>
	.story {
		background-color: var(--connotation);
		color: var(--on-connotation);
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid var(--vvd-color-neutral-20);
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
  
  <vwc-layout column-basis="sm" column-spacing="md" auto-sizing="fit">
	<section class="story">
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<section class="story">
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<section class="story">
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<vwc-layout column-basis="block" column-spacing="md">
	<section class="story">
	<article class="story-content">
	  <p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		varius congue.
	  </p>
	</article>
  </section>
	<section class="story">
	<article class="story-content">
		<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		varius congue.
		</p>
	</article>
	</section>
	</vwc-layout>
	<vwc-layout column-basis="md" column-spacing="xl" auto-sizing="fill">
	<section class="story">
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<section class="story">
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	</vwc-layout>
  </vwc-layout>
		`;
	wrapper.appendChild(inlineElementWrapper);
}


