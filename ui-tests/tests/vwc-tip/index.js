import '@vonage/vwc-tip';

export async function createElementVariations(wrapper) {
	const tipElementWrapper = document.createElement('div');
	tipElementWrapper.innerHTML =
		`<vwc-tip dismissble></vwc-tip>
		 <vwc-tip icon="info-line"></vwc-tip>
		 <vwc-tip icon="info-line" placement="top" content="This is a tooltip that has Paired element that has either ? or ! as button trigger"></vwc-tip>
		 <vwc-tip style="--tooltip-max-inline-size: 150px; --tooltip-min-inline-size: 150px;" placement="bottom" content="This is a tooltip that has Paired element that has either ? or ! as button trigger"></vwc-tip>
		 <div style="display: flex; align-items: center;"><h2>Title</h2><vwc-tip icon="info-line" placement="top" content="what can you do here?"></vwc-tip></div>
		 <p>Some text to see if the tooltip can be used inside a paregraph. <vwc-tip icon="info-line" placement="bottom" content="info"></vwc-tip> This is the rest of the text</p>
		 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
		`;
	wrapper.appendChild(tipElementWrapper);
}


