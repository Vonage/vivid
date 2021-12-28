import '@vonage/vwc-elevation';

export async function createElementVariations(wrapper) {
	const elementWrapper = document.createElement('div');
	elementWrapper.innerHTML =
		`
			<style>
				#VwcElevation {
					display: inline-block;
				}

				vwc-elevation {
					margin: 25px;
					display: block;
				}
				.card {
					width: 300px;
					height: 30px;
					padding: 20px;
					text-align: center;
				}
			</style>
			<vwc-elevation dp="0">
		  	<div class="card">
					This is the content inside the elevation with DP 2
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

			<vwc-elevation style="--vvd-elevation-border-radius: 16px; --vvd-elevation-background-color:lightblue;">
		  	<div class="card">
					This is the content inside the elevation with background and radius
				</div>
			</vwc-elevation>

			<vwc-elevation>
		  	<div class="card" style="background-color: lightpink; height: auto;">
					This is the content inside the elevation with radius and inside element with background color
				</div>
			</vwc-elevation>

						<vwc-elevation style="--vvd-elevation-border-radius: 0;">
		  	<div class="card" style="background-color: lightpink; height: auto;">
					This is the content inside the elevation with no border-radius
				</div>
			</vwc-elevation>
		`;
	wrapper.appendChild(elementWrapper);
}


