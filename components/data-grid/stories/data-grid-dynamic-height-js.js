import '@vonage/vwc-data-grid';
import '@vonage/vwc-button';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

let count = 2;

const Template = args => html`
	<vwc-button layout="outlined" @click="${add}">Add item</vwc-button>
	<vwc-button layout="outlined" @click="${remove}">Remove item</vwc-button>

	<vwc-data-grid
	.heightByRows="${true}"
	.columns="${args.columns}" 
	.items="${args.items}">
	</vwc-data-grid>
`;

export const HeightByRows = Template.bind({});

HeightByRows.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname' }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, count)
};

const getGrid = () => document.querySelector('vwc-data-grid');
const updateGrid = () => {
	getGrid().heightByRows = count <= 5;
	getGrid().items = sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, count);
}

function add() {
	count++;
	updateGrid();
}

function remove() {
	count--;
	updateGrid();
}