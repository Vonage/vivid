import '@vonage/vwc-action-group';
import '@vonage/vwc-button';
import '@vonage/vwc-icon-button';
import '@vonage/vwc-textfield';
import '@vonage/vwc-icon';


export async function createElementVariations(wrapper) {
	const actionGroupWrapper = document.createElement('div');
	actionGroupWrapper.innerHTML =
		`
	<vwc-action-group layout="ghost">
		<vwc-button label="copy" layout="filled"></vwc-button>
		<vwc-button label="paste" layout="filled"></vwc-button>
		<vwc-button label="submit" layout="filled"></vwc-button>
	</vwc-action-group>
	<hr>
	<vwc-action-group layout="outlined">
		<vwc-button label="copy"></vwc-button>
		<vwc-button label="paste"></vwc-button>
		<vwc-button label="submit"></vwc-button>
	</vwc-action-group>
		<hr>
		<vwc-action-group layout="outlined" shape="pill">
		<vwc-button label="copy" shape="pill"></vwc-button>
		<vwc-button label="paste" shape="pill"></vwc-button>
		<vwc-button label="submit" shape="pill"></vwc-button>
	</vwc-action-group>
		<hr>
		<vwc-action-group layout="outlined">
		<vwc-icon-button icon="reply-line"></vwc-icon-button>
		<vwc-icon-button icon="transfer-line"></vwc-icon-button>
		<span role="separator"></span>
		<vwc-icon-button icon="compose-line"></vwc-icon-button>
		<vwc-icon-button icon="crop-line"></vwc-icon-button>
		<span role="separator"></span>
		<vwc-icon-button icon="copy-2-line"></vwc-icon-button>
		<vwc-icon-button icon="save-line"></vwc-icon-button>
	</vwc-action-group>
		<hr>
		<vwc-action-group layout="outlined" shape="pill">
		<vwc-button label="Action" icon="chevron-down-solid" trailingIcon shape="pill"></vwc-button>
		<span role="separator"></span>
		<vwc-textfield icon="search"  shape="pill" placeholder="Search" appearance="ghost">
		</vwc-textfield>
	</vwc-action-group>
		<hr>
		<vwc-action-group layout="outlined" tight>
		<vwc-button icon="flag-uruguay">
			<span>+1</span>
			<span style="font-size: 14px; margin-left: 8px"><vwc-icon type="chevron-down-solid" inline></vwc-icon></span>
		</vwc-button>
		<span role="separator"></span>
		<vwc-textfield icon="search" dense placeholder="Search" appearance="ghost">
		</vwc-textfield>
	</vwc-action-group>
		<hr>
		`;
	wrapper.appendChild(actionGroupWrapper);
}


