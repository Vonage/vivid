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
		{ header: 'Role', path: 'name', tree: true },
		{ header: 'User', path: 'username' },
		{ header: 'City', path: 'city' },
		{ header: 'First Name', path: 'name.first' },
		{ header: 'Last Name', path: 'name.last' }
	]
};

function dataProvider(params, callback) {
	const dataArray = params.parentItem ? params.parentItem.children : treeData();

	const startIndex = params.page * params.pageSize;
	const pageItems = dataArray.slice(startIndex, startIndex + params.pageSize);
	const treeLevelSize = dataArray.length;
	callback(pageItems, treeLevelSize);
}