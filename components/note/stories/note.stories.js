import '@vonage/vwc-note/vwc-note.js';
import { html } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';
import { argTypes } from './arg-types.js';

export default {
	title: 'Composite/Note',
	component: 'vwc-note',
	argTypes
};

const TemplatePlain = args => html`
	<vwc-note ...=${spread(args)}>
		Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
	</vwc-note>
`;

export const Full = TemplatePlain.bind({});
Full.args = { header: `Pascal's theological argument`, connotation: 'success' };

export const IconLess = TemplatePlain.bind({});
IconLess.args = { iconless: '', header: `Pascal's theological argument` };

export const HeaderLess = TemplatePlain.bind({});
HeaderLess.args = { header: '', connotation: 'announcement' };

export const HeaderAndIconLess = TemplatePlain.bind({});
HeaderAndIconLess.args = { iconless: '', header: '', connotation: 'cta' };

const TemplateComplex = args => html`
	<vwc-note ...=${spread(args)}>
		<div>
			Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
		</div>
		<hr>
		<div>
			Read more <a href="https://en.wikipedia.org/wiki/Pascal%27s_wager#:~:text=Pascal's%20wager%20is%20an%20argument,Pascal%20(1623%E2%80%931662).&text=Pascal%20argues%20that%20a%20rational,seek%20to%20believe%20in%20God.">here</a>.
		</div>
	</vwc-note>
`;

export const ComplexMessage = TemplateComplex.bind({});
ComplexMessage.args = { header: `Pascal's theological argument`, connotation: 'info' };