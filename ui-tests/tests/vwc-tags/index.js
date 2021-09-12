import '@vonage/vwc-tags';

export async function createElementVariations(wrapper) {
	const tagElementWrapper = document.createElement('div');
	tagElementWrapper.innerHTML = `
		<vwc-tag text="my tag"></vwc-tag>
		<vwc-tag text="my tag" connotation="cta"></vwc-tag>
		<vwc-tag text="my tag" connotation="primary" selectable selected></vwc-tag>
		<vwc-tag text="my tag" connotation="cta" selectable selected></vwc-tag>
		<vwc-tag text="my tag" layout="outlined"></vwc-tag>
		<vwc-tag text="my tag" layout="outlined" connotation="cta"></vwc-tag>
		<vwc-tag text="my tag" layout="outlined" connotation="primary" selectable selected></vwc-tag>
		<vwc-tag text="my tag" layout="outlined" connotation="cta" selectable selected></vwc-tag>
		<br>
		<vwc-tags>
			<vwc-tag text="my tag" selectable></vwc-tag>
			<vwc-tag text="my tag" selectable></vwc-tag>
			<vwc-tag text="my tag" selectable></vwc-tag>
		</vwc-tags>
	`;
	wrapper.appendChild(tagElementWrapper);
}


