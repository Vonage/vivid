import '@vonage/vwc-data-grid';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .items="${args.items}" .rowDetailsRenderer="${expandedRowRenderer}">
		<vwc-data-grid-column path="fname" header="First Name" sortable></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name"></vwc-data-grid-column>
		<vwc-data-grid-column header="Expand Row" .cellRenderer="${cellRenderer}"></vwc-data-grid-column>
	</vwc-data-grid>
`;

export const BasicHTML = Template.bind({});
BasicHTML.args = {
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function cellRenderer(container, column, data) {
	const grid = column.parentNode;
	let toggler = container.firstElementChild;
	if (!toggler) {
		toggler = document.createElement('vwc-checkbox');
		container.appendChild(toggler);
		toggler.addEventListener('change', e => {
			if (e.target.checked) {
				grid.openItemDetails(container.data.item);
			} else {
				grid.closeItemDetails(container.data.item);
			}
		});
	}
	container.data = data;
	toggler.checked = data.detailsOpened;
}

function expandedRowRenderer(container, grid, data) {
	if (!container.firstElementChild) {
		const n = document.createElement('vwc-note');
		n.connotation = 'info';
		n.icon = 'info';
		n.header = `${data.item.fname} ${data.item.lname}`;
		n.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
		container.appendChild(n);
	}
}