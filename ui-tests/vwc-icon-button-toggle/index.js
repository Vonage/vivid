import { VWCIconButtonToggle } from '@vonage/vwc-icon-button-toggle';

VWCIconButtonToggle;

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-icon-button-toggle onicon="home" officon="bookmark"></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" on></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" dense></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" on dense></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" enlarged></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" on enlarged></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" disabled></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" on disabled></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" layout="filled" connoctation="cta"></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" layout="filled" connoctation="cta" on></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" layout="outlined" connoctation="cta"></vwc-icon-button-toggle>
		<vwc-icon-button-toggle onicon="home" officon="bookmark" layout="outlined" connoctation="cta" on></vwc-icon-button-toggle>
	`;
	wrapper.appendChild(textElementWrapper);
}


