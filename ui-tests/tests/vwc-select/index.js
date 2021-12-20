import '@vonage/vwc-select';
import '@vonage/vwc-list/vwc-list-item.js';


export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
	<vwc-select label="VWC Select with long text" helper="Helper Text" appearance="filled">
  <vwc-list-item
    mwc-list-item=""
    tabindex="0"
    aria-disabled="false"
    role="option"
    aria-selected="true"
    selected=""
    activated=""
  ></vwc-list-item>
  <vwc-list-item
    value="0"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 0
  </vwc-list-item>
  <vwc-list-item
    value="1"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 1
  </vwc-list-item>
  <vwc-list-item
    value="2"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 2
  </vwc-list-item>
  <vwc-list-item
    value="3"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 3
  </vwc-list-item>
</vwc-select>
<hr>
	<vwc-select label="VWC Select" helper="Helper Text" dense>
  <vwc-list-item
    mwc-list-item=""
    tabindex="0"
    aria-disabled="false"
    role="option"
    aria-selected="true"
    selected=""
    activated=""
  ></vwc-list-item>
  <vwc-list-item
    value="0"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 0
  </vwc-list-item>
  <vwc-list-item
    value="1"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 1
  </vwc-list-item>
  <vwc-list-item
    value="2"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 2
  </vwc-list-item>
  <vwc-list-item
    value="3"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 3
  </vwc-list-item>
</vwc-select de>
<hr>
<div style="display: flex; align-items: flex-start;">
<p style="margin: 0; padding-right: 1rem;">Dense-with label</p>
	<vwc-select dense label="VWC Select">
  <vwc-list-item
    mwc-list-item=""
    tabindex="0"
    aria-disabled="false"
    role="option"
    aria-selected="true"
    selected=""
    activated=""
  ></vwc-list-item>
  <vwc-list-item
    value="0"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 0
  </vwc-list-item>
  <vwc-list-item
    value="1"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 1
  </vwc-list-item>
  <vwc-list-item
    value="2"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 2
  </vwc-list-item>
  <vwc-list-item
    value="3"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 3
  </vwc-list-item>
</vwc-select>
<p style="margin: 0; padding: 0 1rem;">Dense-no label</p>
	<vwc-select dense>
  <vwc-list-item
    mwc-list-item=""
    tabindex="0"
    aria-disabled="false"
    role="option"
    aria-selected="true"
    selected=""
    activated=""
  ></vwc-list-item>
  <vwc-list-item
    value="0"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 0
  </vwc-list-item>
  <vwc-list-item
    value="1"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 1
  </vwc-list-item>
  <vwc-list-item
    value="2"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 2
  </vwc-list-item>
  <vwc-list-item
    value="3"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 3
  </vwc-list-item>
</vwc-select>
</div>
<hr>
	<vwc-select label="VWC Select" helper="Helper Text" ghost dense>
  <vwc-list-item
    mwc-list-item=""
    tabindex="0"
    aria-disabled="false"
    role="option"
    aria-selected="true"
    selected=""
    activated=""
  >none</vwc-list-item>
  <vwc-list-item
    value="0"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 0
  </vwc-list-item>
  <vwc-list-item
    value="1"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 1
  </vwc-list-item>
  <vwc-list-item
    value="2"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 2
  </vwc-list-item>
  <vwc-list-item
    value="3"
    mwc-list-item=""
    tabindex="-1"
    aria-disabled="false"
    role="option"
  >
    Item 3 is long
  </vwc-list-item>
</vwc-select>
		`;
	wrapper.appendChild(textElementWrapper);
}


