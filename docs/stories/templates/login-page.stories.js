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
    flex: 0 0 50vw;
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
    ${LogIn()}
    <figure>
        <div id="content">
            <p><vwc-text font-face="subtitle-1">Lorem ipsum</vwc-text></p>
            <p><vwc-text font-face="body-1">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</vwc-text></p>
            <div><vwc-button label="Apply Now →" layout="outlined" type="submit" outlined=""></vwc-button></div>
        </div>
    </figure>
</div>
`;

LogInTemplate.parameters = {
	options: {
		showPanel: false,
		isToolshown: false
	}
};
