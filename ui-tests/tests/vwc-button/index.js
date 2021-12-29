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
		<vwc-button connotation="primary" shape="pill" layout="filled" dense>Button</vwc-button>
		<vwc-button connotation="primary" shape="pill" layout="filled">Button</vwc-button>
		<vwc-button connotation="primary" shape="pill" layout="filled" enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined">Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" enlarged>Button</vwc-button>
		<vwc-button connotation="primary" shape="pill" layout="outlined" dense>Button</vwc-button>
		<vwc-button connotation="primary" shape="pill" layout="outlined">Button</vwc-button>
		<vwc-button connotation="primary" shape="pill" layout="outlined" enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="">Button</vwc-button>
		<vwc-button connotation="primary" layout="" enlarged>Button</vwc-button>
		<hr>

<!--		sizes with icons-->
		<vwc-button connotation="primary" layout="filled" icon="download" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line"  enlarged>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" shape="pill" icon="calendar-line" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" shape="pill" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" shape="pill" icon="calendar-line"  enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line"  dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line"  enlarged>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" shape="pill" icon="calendar-line"  dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" shape="pill" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" shape="pill" icon="calendar-line"  enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="" icon="calendar-line" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="" icon="calendar-line" enlarged>Button</vwc-button>
		<hr>

		<!--		sizes with trailing icons-->
		<vwc-button connotation="primary" layout="filled" trailingIcon icon="download" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" trailingIcon icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" trailingIcon icon="calendar-line"  enlarged>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" trailingIcon shape="pill" icon="calendar-line" dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" trailingIcon shape="pill" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" trailingIcon shape="pill" icon="calendar-line"  enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" trailingIcon icon="calendar-line"  dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" trailingIcon icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" trailingIcon icon="calendar-line"  enlarged>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" trailingIcon shape="pill" icon="calendar-line"  dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" trailingIcon shape="pill" icon="calendar-line" >Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" trailingIcon shape="pill" icon="calendar-line"  enlarged>Button</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="" icon="calendar-line" trailingIcon dense>Button</vwc-button>
		<vwc-button connotation="primary" layout="" icon="calendar-line" trailingIcon >Button</vwc-button>
		<vwc-button connotation="primary" layout="" icon="calendar-line" trailingIcon enlarged>Button</vwc-button>
		<hr>
		<!--		sizes with stacked icons - using Label -->
		<vwc-button connotation="primary" layout="filled" icon="compose-line" label="Action" dense stacked></vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" label="Action"  stacked></vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" label="Action"  enlarged stacked></vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" label="Action" shape="pill" dense stacked></vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" label="Action"  shape="pill" stacked></vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" label="Action"  shape="pill" enlarged stacked></vwc-button>
		<hr>
		<!--		sizes with stacked icons-->
		<vwc-button connotation="primary" layout="filled" icon="compose-line" dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line"  stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line"  enlarged stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" shape="pill" dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line"  shape="pill" stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line"  shape="pill" enlarged stacked>Action</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" enlarged stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" shape="pill" dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" shape="pill" stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" shape="pill" enlarged stacked>Action</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="" icon="compose-line" dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="" icon="compose-line"  stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="" icon="compose-line" enlarged stacked>Action</vwc-button>
		<hr>
				<!--		sizes with stacked icons - trailing icon-->
		<vwc-button connotation="primary" layout="filled" icon="compose-line" dense  trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="compose-line" trailingIcon enlarged stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" shape="pill" icon="compose-line" dense  trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" shape="pill" icon="compose-line" trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="filled" shape="pill" icon="compose-line" trailingIcon enlarged stacked>Action</vwc-button>
		<hr>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" trailingIcon dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="compose-line" trailingIcon enlarged stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" shape="pill" icon="compose-line" trailingIcon dense stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" shape="pill" icon="compose-line" trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="outlined" shape="pill" icon="compose-line" trailingIcon enlarged stacked>Action</vwc-button>

		<hr>
		<vwc-button connotation="primary" layout="" icon="compose-line" dense  trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="" icon="compose-line" trailingIcon stacked>Action</vwc-button>
		<vwc-button connotation="primary" layout="" icon="compose-line" enlarged trailingIcon stacked>Action</vwc-button>
		<hr>

		<vwc-button connotation="primary" layout="outlined" fullwidth>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" fullwidth>Button</vwc-button>
		<hr>
<!--with icons:-->
		<vwc-button connotation="primary" layout="ghost" icon="calendar-line">Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line">Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line">Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line" disabled>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line" trailingIcon>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line" trailingIcon>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line">
			<span style="padding-right: 0.5rem;">Button</span>
			<vwc-icon type="download" slot="icon"></vwc-icon>
		</vwc-button>
			<hr>
		<vwc-button connotation="primary" layout="ghost" icon="calendar-line" stacked>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line" stacked>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line" stacked>Button</vwc-button>
		<vwc-button connotation="primary" layout="outlined" icon="calendar-line" trailingIcon stacked>Button</vwc-button>
		<vwc-button connotation="primary" layout="filled" icon="calendar-line" trailingIcon stacked>Button</vwc-button>
<!--		distorted buttons-->
		<vwc-button connotation="primary" layout="outlined"  stacked>
			<span>Button</span>
			<vwc-icon type="calendar-line" slot="icon"></vwc-icon>
		</vwc-button>
				<vwc-button connotation="primary" layout="outlined" icon="calendar-line" trailingIcon enlarged stacked>
			<span style="padding-right: 0.5rem;">Button</span>
			<vwc-icon type="download" slot="icon"></vwc-icon>
		</vwc-button>
		`;
	wrapper.appendChild(textElementWrapper);
}


