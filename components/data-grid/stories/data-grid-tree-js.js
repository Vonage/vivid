import '@vonage/vwc-data-grid';
import '@vonage/vwc-checkbox';
import '@vonage/vwc-formfield';
import { html } from 'lit-element';
import { treeData } from './data-grid-demo-data-provider';

const Template = args => html`
	<vwc-data-grid .columns="${args.columns}" .dataProvider="${dataProvider}">
	</vwc-data-grid>
`;

export const TreeJS = Template.bind({});
TreeJS.args = {
	columns: [
		{ header: 'Role', path: 'role', tree: true, sortable: true },
		{ header: 'User', path: 'username' },
		{ header: 'City', path: 'city' },
		{ header: 'First Name', path: 'name.first' },
		{ header: 'Last Name', path: 'name.last' }
	]
};

const treeDataSimulated = treeData();
function dataProvider(params, callback) {
	const dataArray = params.parentItem ? params.parentItem.children : groupByRole(treeDataSimulated);

	const startIndex = params.page * params.pageSize;
	const pageItems = dataArray.slice(startIndex, startIndex + params.pageSize);
	callback(pageItems, dataArray.length);
}

function groupByRole(data) {
	const groups = {};
	for (const item of data) {
		let a = groups[item.role] || (groups[item.role] = []);
		a.push(item);
	}
	return Object.entries(groups).map(([key, group]) => { return { role: key, children: group }; });
}