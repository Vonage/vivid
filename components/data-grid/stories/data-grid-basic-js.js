import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-note';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}" .rowDetailsRenderer="${expandedRowRenderer}">
	</vwc-data-grid>
`;

export const BasicJS = Template.bind({});
BasicJS.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname' },
		{ header: 'Expand Row', cellRenderer: cellRenderer }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function cellRenderer(container, column, data) {
	if (!container.childElementCount) {
		const t = document.createElement('vwc-checkbox');
		container.appendChild(t);
		t.addEventListener('change', e => {
			if (e.target.checked) {
				column.parentNode.openItemDetails(data.item);
			} else {
				column.parentNode.closeItemDetails(data.item);
			}
		});
	}
}

function expandedRowRenderer(container, grid, data) {
	if (!container.childElementCount) {
		const n = document.createElement('vwc-note');
		n.connotation = 'info';
		n.icon = 'info';
		n.header = `${data.item.fname} ${data.item.lname}`;
		n.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
		container.appendChild(n);
	}
}