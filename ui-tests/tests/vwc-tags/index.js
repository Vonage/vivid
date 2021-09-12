import '@vonage/vwc-tags/vwc-tag.js';

export async function createElementVariations(wrapper) {
	const tagElementWrapper = document.createElement('div');
	tagElementWrapper.innerHTML = `
		<div>
			<vwc-tag text="Tag 1"></vwc-tag>
			<vwc-tag text="Tag 2" connotation="cta"></vwc-tag>
			<vwc-tag text="Tag 3" connotation="primary" selectable selected></vwc-tag>
			<vwc-tag text="Tag 4" connotation="cta" selectable selected></vwc-tag>
			<vwc-tag text="Tag 5" layout="outlined"></vwc-tag>
			<vwc-tag text="Tag 6" layout="outlined" connotation="cta"></vwc-tag>
			<vwc-tag text="Tag 7" layout="outlined" connotation="primary" selectable selected></vwc-tag>
			<vwc-tag text="Tag 8" layout="outlined" connotation="cta" selectable selected></vwc-tag>
		</div>
		<br>

		<vwc-tags>
			<vwc-tag text="Python" selectable></vwc-tag>
			<vwc-tag text="Javascript" selectable selected></vwc-tag>
			<vwc-tag text="Rust" selectable></vwc-tag>
			<vwc-tag text="Go" selectable></vwc-tag>
		</vwc-tags>
	`;
	wrapper.appendChild(tagElementWrapper);
}


