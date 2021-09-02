import { html } from 'lit-element';
import { LogIn } from './login.stories';

export default {
	title: 'Templates/Application',
};

export const LogInTemplate = () => html`
<style>
    #login-page {
        display: flex;
    }
    figure {
        height: 100%;
        background-color: var(--vvd-color-neutral-20);
        position: relative;
        margin: 0;
        padding: 0;   
    }
    #content {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
</style>
<div id="login-page">
    <vwc-inline size="sm" spacing="sm" template="fit" grid-template="columns">
        <section>${LogIn()}</section>
        <section>
            <figure>
                <div id="content">
                    <vwc-inline size="sm" spacing="sm" template="" grid-template="rows">
                        <section><vwc-text font-face="subtitle-1">Lorem ipsum</vwc-text></section>
                        <section><vwc-text font-face="body-1">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</vwc-text></section>
                        <section><vwc-button label="Apply Now →" layout="outlined" type="submit" outlined=""></vwc-button></section>
                    <vwc-inline size="sm" spacing="sm" template="" grid-template="rows">
                </div>
            </figure>
        </section>
    </vwc-inline>
</div>
`;

LogInTemplate.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
