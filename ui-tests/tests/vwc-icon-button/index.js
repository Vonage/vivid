import '@vonage/vwc-icon-button';


export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-icon-button type="light-bulb-solid"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" layout="ghost" connotation="primary"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" layout="filled" connotation="cta"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" layout="outlined"></vwc-icon-button>

		<vwc-icon-button type="light-bulb-solid" disabled connotation="primary"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" disabled layout="ghost" connotation="alert"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" disabled layout="filled" connotation="success"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" disabled layout="outlined" connotation="cta"></vwc-icon-button>

		<vwc-icon-button type="light-bulb-solid" shape="circled"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" shape="circled" layout="ghost" connotation="cta"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" shape="circled" layout="filled" connotation="primary"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" shape="circled" layout="outlined"></vwc-icon-button>

		<vwc-icon-button type="light-bulb-solid" dense connotation="announcement"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" dense layout="ghost" connotation="success"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" dense layout="filled" connotation="announcement"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" dense layout="outlined"></vwc-icon-button>

		<vwc-icon-button type="light-bulb-solid" enlarged connotation="info"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" enlarged layout="ghost" connotation="announcement"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" enlarged layout="filled"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" enlarged layout="outlined" connotation="primary"></vwc-icon-button>

		<vwc-icon-button type="light-bulb-solid" connotation="alert"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" layout="ghost" connotation="cta"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" layout="filled"connotation="info"></vwc-icon-button>
		<vwc-icon-button type="light-bulb-solid" layout="outlined" connotation="announcement"></vwc-icon-button>
	`;
	wrapper.appendChild(textElementWrapper);
}


