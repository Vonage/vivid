import '@vonage/vwc-button';

export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
		<vwc-button connotation="primary">Button</vwc-button>
		<vwc-button connotation="cta">Button</vwc-button>
		<vwc-button connotation="success">Button</vwc-button>
		<vwc-button connotation="alert">Button</vwc-button>
		<vwc-button connotation="info">Button</vwc-button>
		<vwc-button connotation="announcement">Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined">Button</vwc-button>
		<vwc-button connotation="cta" layout="outlined">Button</vwc-button>
		<vwc-button connotation="success" layout="outlined">Button</vwc-button>
		<vwc-button connotation="alert" layout="outlined">Button</vwc-button>
		<vwc-button connotation="info" layout="outlined">Button</vwc-button>
		<vwc-button connotation="announcement" layout="outlined">Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="filled">Button</vwc-button>
		<vwc-button connotation="cta" layout="filled">Button</vwc-button>
		<vwc-button connotation="success" layout="filled">Button</vwc-button>
		<vwc-button connotation="alert" layout="filled">Button</vwc-button>
		<vwc-button connotation="info" layout="filled">Button</vwc-button>
		<vwc-button connotation="announcement" layout="filled">Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="filled" disabled>Button</vwc-button>
		<vwc-button connotation="cta" layout="filled" disabled>Button</vwc-button>
		<vwc-button connotation="success" layout="filled" disabled>Button</vwc-button>
		<vwc-button connotation="alert" layout="filled" disabled>Button</vwc-button>
		<vwc-button connotation="info" layout="filled" disabled>Button</vwc-button>
		<vwc-button connotation="announcement" layout="filled" disabled>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="filled" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled">Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined">Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="">Button</vwc-button>
		<vwc-button connotation="primary" layout="" enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" fullwidth>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" fullwidth>Button</vwc-button>
		<hr>




		`;
	wrapper.appendChild(textElementWrapper);
}


