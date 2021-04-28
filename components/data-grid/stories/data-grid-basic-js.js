import '@vonage/vwc-data-grid';
import '@vonage/vwc-switch';
import '@vonage/vwc-note';
import { html } from 'lit-element';
import { sequentalData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .columns="${args.columns}" .items="${args.items}" .rowDetailsRenderer="${expandedRowRenderer}">
	</vwc-data-grid>
`;

export {
	cellRenderer,
	expandedRowRenderer
}

export const BasicJS = Template.bind({});
BasicJS.args = {
	columns: [
		{ header: 'First Name', path: 'fname' },
		{ header: 'Last Name', path: 'lname' },
		{ header: 'Expand Row', cellRenderer: cellRenderer }
	],
	items: sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000)
};

function cellRenderer(container, configuration, data) {
	const grid = configuration.grid;
	let toggler = container.firstElementChild;
	if (!toggler) {
		toggler = document.createElement('vwc-switch');
		toggler.setAttribute('connotation', 'cta');
		toggler.style.verticalAlign = 'middle';
		container.appendChild(toggler);
		toggler.addEventListener('change', e => {
			if (e.target.checked) {
				grid.openItemDetails(container.item);
			} else {
				grid.closeItemDetails(container.item);
			}
		});
	}
	container.item = data.item;
	toggler.checked = data.detailsOpened;
}

function expandedRowRenderer(container, configuration, data) {
	let details = container.firstElementChild;
	if (!details) {
		details = document.createElement('vwc-note');
		details.connotation = 'info';
		details.icon = 'info';
		details.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
		container.appendChild(details);
	}
	details.header = `${data.item.fname} ${data.item.lname}`;
}