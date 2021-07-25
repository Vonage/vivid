import '@vonage/vwc-data-grid';
import { cellRenderer } from '@vonage/vwc-data-grid/stories/data-grid-basic-js';
import { sequentalData } from '@vonage/vwc-data-grid/stories/data-grid-demo-data-provider';

export async function createElementVariations(wrapper) {
	const tmpWrapper = document.createElement('div');
	tmpWrapper.innerHTML = `
	<vwc-data-grid>
		<vwc-data-grid-column path="fname" header="First Name" sortable></vwc-data-grid-column>
		<vwc-data-grid-column path="lname" header="Last Name"></vwc-data-grid-column>
		<vwc-data-grid-column header="Expand Row"></vwc-data-grid-column>
	</vwc-data-grid>`;

	wrapper.appendChild(tmpWrapper);
	wrapper.style.width = '100%';
	const grid = tmpWrapper.querySelector('vwc-data-grid');
	grid.items = sequentalData({ fname: 'A-{i}', lname: 'B-{i}' }, 100000);
	return grid.updateComplete.then(() => {
		grid.columns[2].cellRenderer = cellRenderer;
	});
}


