import { html } from 'lit-element';

export default {
	title: 'Templates/Application',
};

export const ApplicationTemplate = () => html`
<style>
  #div{
    position: relative;
  	display: flex;
  }
    vwc-side-drawer#side-drawer {
      flex: 0 0 auto;
  	  height: 100%;
    }
    vwc-top-app-bar#top-app-bar {
    }
</style>
<div id="demo">

  <vwc-side-drawer id="side-drawer" alternate hasTopBar>
    <span slot="top-bar"><vwc-icon type="vonage-mono"></vwc-icon>VONAGE</span>

    <vwc-list innerRole="navigation" innerAriaLabel="Primary navigation" itemRoles="link">
        <vwc-list-item shape="rounded" graphic="icon">
          <vwc-icon slot="graphic" type="home-line"></vwc-icon>1st level item
        </vwc-list-item>

        <p>SECTION TITLE</p>

        <vwc-list-item shape="rounded" graphic="icon">
          <vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item
        </vwc-list-item>

        <vwc-list-expansion-panel open>
          <vwc-list-item slot="header" shape="rounded" graphic="icon"><vwc-icon slot="graphic" type="chat-line"></vwc-icon>1st level item</vwc-list-item>
          <vwc-list-expansion-panel open>
              <vwc-list-item slot="header" shape="rounded">2nd level item</vwc-list-item>
              <vwc-list-item shape="rounded">3rd level item</vwc-list-item>
              <vwc-list-item shape="rounded">3rd level item</vwc-list-item>
          </vwc-list-expansion-panel>
        </vwc-list-expansion-panel>
    </vwc-list>

    <vwc-top-app-bar id="top-app-bar" dense>
      <vwc-icon-button slot="actionItems" icon="search-line" layout="filled"></vwc-icon-button>
      <vwc-icon-button slot="actionItems" icon="info-line" layout="filled"></vwc-icon-button>
      <vwc-icon-button slot="actionItems" icon="upload-line" layout="filled"></vwc-icon-button>
    </vwc-top-app-bar>
  </vwc-side-drawer>
</div>
`;

ApplicationTemplate.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
