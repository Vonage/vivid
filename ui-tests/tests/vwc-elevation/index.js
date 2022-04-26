import '@vonage/vwc-elevation';
import '@vonage/vwc-layout';


export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML =
		`
			<style>
				.card {
					padding: 20px;
					text-align: center;
					border-radius: 6px;
				}
				.wrapper {
				 width: 380px;
				 display: inline-block;
				}
			</style>
			<div class="wrapper">
			<vwc-layout column-basis="block" column-spacing="sm" gutters="md">
			<vwc-elevation dp="0">
		  	<div class="card">
					This is the content inside the elevation with DP 0
				</div>
			</vwc-elevation>

			<vwc-elevation dp="2">
		  	<div class="card">
					This is the content inside the elevation with DP 2
				</div>
			</vwc-elevation>

			<vwc-elevation dp="4">
		  	<div class="card">
					This is the content inside the elevation with DP 4
				</div>
			</vwc-elevation>

			<vwc-elevation dp="8">
		  	<div class="card">
					This is the content inside the elevation with DP 8
				</div>
			</vwc-elevation>

			<vwc-elevation dp="12">
		  	<div class="card">
					This is the content inside the elevation with DP 12
				</div>
			</vwc-elevation>

			<vwc-elevation dp="16">
		  	<div class="card">
					This is the content inside the elevation with DP 16
				</div>
			</vwc-elevation>

			<vwc-elevation dp="24">
		  	<div class="card">
					This is the content inside the elevation with DP 24
				</div>
			</vwc-elevation>
			</<vwc-layout>
			</div>
		`;
	wrapper.appendChild(elementWrapper);
}


