import '@vonage/vwc-action-group/vwc-action-group.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
    title: 'Alpha/Components/ActionGroup',
    component: 'vwc-action-group',
    argTypes
};

const ActionGroupOutlinedTemplate = args => html`
    <vwc-action-group ...=${spread(args)}>
        <vwc-button label="copy"></vwc-button>
        <vwc-button label="paste"></vwc-button>
        <vwc-button label="submit"></vwc-button>
    </vwc-action-group>`;

export const Outlined = ActionGroupOutlinedTemplate.bind({});
Outlined.args = { layout: 'outlined' };

const ActionGroupGhostTemplate = args => html`
    <vwc-action-group ...=${spread(args)}>
        <vwc-button label="copy" layout="filled"></vwc-button>
        <vwc-button label="paste" layout="filled"></vwc-button>
        <vwc-button label="submit" layout="filled"></vwc-button>
    </vwc-action-group>`;

export const Ghost = ActionGroupGhostTemplate.bind({});
Ghost.args = {  };

const ActionGroupPillTemplate = args => html`
    <vwc-action-group ...=${spread(args)}>
        <vwc-button label="copy" shape="pill"></vwc-button>
        <vwc-button label="paste" shape="pill"></vwc-button>
        <vwc-button label="submit" shape="pill"></vwc-button>
    </vwc-action-group>`;

export const PillShape = ActionGroupPillTemplate.bind({});
PillShape.args = { layout: 'outlined', shape: 'pill' };

const ActionGroupSeparatorTemplate = args => html`
    <vwc-text></vwc-text>
    <p>Use a <code>&lt;span&gt;</code> tag with <code>role="separator"</code> for adding separator between the action elements</p>
    <vwc-action-group ...=${spread(args)}>
        <vwc-icon-button icon="reply-line"></vwc-icon-button>
        <vwc-icon-button icon="transfer-line"></vwc-icon-button>
        <span role="separator"></span>
        <vwc-icon-button icon="compose-line"></vwc-icon-button>
        <vwc-icon-button icon="crop-line"></vwc-icon-button>
        <span role="separator"></span>
        <vwc-icon-button icon="copy-2-line"></vwc-icon-button>
        <vwc-icon-button icon="save-line"></vwc-icon-button>
    </vwc-action-group>`;

export const Separator = ActionGroupSeparatorTemplate.bind({});
Separator.args = { layout: 'outlined' };

const ActionGroupTightTemplate = args => html`
    <div style="display: flex; column-gap: 2px">
    <vwc-action-group ...=${spread(args)}>
        <vwc-button icon="flag-uruguay">
            <span>+1</span>
            <span style="font-size: 14px; margin-left: 8px"><vwc-icon type="chevron-down-solid" inline></vwc-icon></span>
        </vwc-button>
        <span role="separator"></span>
        <vwc-textfield icon="search" dense placeholder="Search" appearance="ghost">
        </vwc-textfield>
    </vwc-action-group>
        <vwc-button label="submit" layout="filled"></vwc-button>
</div>`;

export const tight = ActionGroupTightTemplate.bind({});
tight.args = { layout: 'outlined', tight };



