import vvdCore from '@vonage/vvd-core';
import '@vonage/vwc-button-group';
import '@vonage/vwc-button';
import '@vonage/vwc-icon-button';

export async function createElementVariations(wrapper) {
	const groupElementWrapper = document.createElement('div');
	groupElementWrapper.style.display = 'inline-flex';
	groupElementWrapper.style.flexDirection = 'column';
	groupElementWrapper.style.gap = '15px';
	groupElementWrapper.innerHTML =
		`
<vwc-button-group>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>

<vwc-button-group raised>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>

<vwc-button-group raised shape="pill">
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>

<vwc-button-group raised shape="pill" disabled>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>

<vwc-button-group raised disabled>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>

<vwc-button-group raised>
	<vwc-icon-button icon="home"></vwc-icon-button>
	<vwc-button>Test button 1</vwc-button>
	<vwc-button>Test button 2</vwc-button>
	<vwc-button>Test button 3</vwc-button>
	<vwc-button>Test button 4</vwc-button>
</vwc-button-group>
`;
	wrapper.appendChild(groupElementWrapper);

	await vvdCore.settled;
}


