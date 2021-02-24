import vvdContext from '@vonage/vvd-context';
import '@vonage/vwc-icon';
import '@vonage/vwc-checkbox';
import { html } from 'lit-element';

export default {
	title: 'Core/Context/Table',
};

export const Table = () => html`
	<table>
		<thead>
			<tr>
				<th>First name</th>
				<th>Last name</th>
				<th>Country</th>
				<th>City</th>
				<th>Street</th>
				<th id="active-label">Active</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Impractical</td>
				<td>Envisioner</td>
				<td>Neverland</td>
				<td>Dreamcity</td>
				<td>Imagination</td>
				<td><vwc-checkbox checked style="display: inline-block" aria-labelledby="active-label"></vwc-checkbox></td>
				<td><vwc-icon type="eye-negative"></vwc-icon></td
			</tr>
			<tr>
				<td>Some</td>
				<td>One</td>
				<td>Badland</td>
				<td>Sincity</td>
				<td>Crime</td>
				<td><vwc-checkbox checked disabled style="display: inline-block" aria-labelledby="active-label"></vwc-checkbox></td>
				<td><vwc-icon type="eye-hide-full"></vwc-icon></td
			</tr>
		</tbody>
	</table>
`;

vvdContext.mount();