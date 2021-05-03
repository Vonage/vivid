import { html } from 'lit-element';

export {
	getPositionControls,
	getPositionValue
}

const POSITION_CONTROLS_BLOCK = 'position-controls-block';

function getPositionControls() {
	return html`
		<style>
		.groups {
			display: flex;
			flex-direction: row;
		}
		.group {
			flex-basis: 320px;
		}
	</style>
	<div class="groups ${POSITION_CONTROLS_BLOCK}">
		<div class="group">
			Vertical position:
			<vwc-formfield label="Top">
				<vwc-radio name="group-v" value="top"></vwc-radio>
			</vwc-formfield>
			<vwc-formfield label="Bottom">
				<vwc-radio name="group-v" value="bottom" checked></vwc-radio>
			</vwc-formfield>
		</div>
		<div class="group">
			Horizontal position:
			<vwc-formfield label="Start">
				<vwc-radio name="group-h" value="start"></vwc-radio>
			</vwc-formfield>
			<vwc-formfield label="Center">
				<vwc-radio name="group-h" value="center" checked></vwc-radio>
			</vwc-formfield>
			<vwc-formfield label="End">
				<vwc-radio name="group-h" value="end"></vwc-radio>
			</vwc-formfield>
		</div>
	</div>`;
}

function getPositionValue() {
	const positionControlsBlock = document.querySelector(`.${POSITION_CONTROLS_BLOCK}`);
	if (!positionControlsBlock) {
		throw new Error('position control block is not found in the document, make sure to render it using "getPositionControls" API');
	}

	const result = [];
	for (const radio of positionControlsBlock.querySelectorAll('vwc-radio')) {
		if (radio.checked) {
			result.push(radio.value);
		}
	}
	return result.join(' ');
}