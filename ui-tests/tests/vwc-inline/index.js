import '@vonage/vwc-inline';

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
  
  <vwc-inline size="sm" spacing="sm" inlineTemplate="fit" gridTemplate="columns">
	<section class="story">
	  <figure style="--bg: url(https://picsum.photos/351/200)"></figure>
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<section class="story">
	  <figure style="--bg: url(https://picsum.photos/352/200)"></figure>
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<section class="story">
	  <figure style="--bg: url(https://picsum.photos/353/200)"></figure>
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<vwc-inline size="sm" spacing="sm" gridTemplate="rows">
	<section class="story">
	<figure style="--bg: url(https://picsum.photos/352/200)"></figure>
	<article class="story-content">
	  <p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		varius congue.
	  </p>
	</article>
  </section>
	<section class="story">
	<figure style="--bg: url(https://picsum.photos/353/200)"></figure>
	<article class="story-content">
		<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		varius congue.
		</p>
	</article>
	</section>
	</vwc-inline>
	<vwc-inline size="md" spacing="lg" inlineTemplate="fill" gridTemplate="columns">
	<section class="story">
	  <figure style="--bg: url(https://picsum.photos/351/200)"></figure>
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	<section class="story">
	  <figure style="--bg: url(https://picsum.photos/352/200)"></figure>
	  <article class="story-content">
		<p>
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
		  tempus augue, a molestie nulla faucibus at. Nullam semper iaculis lorem
		  varius congue.
		</p>
	  </article>
	</section>
	</vwc-inline>
  </vwc-inline>
		`;
	wrapper.appendChild(inlineElementWrapper);
}


