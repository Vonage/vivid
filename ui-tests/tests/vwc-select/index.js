import '@vonage/vwc-select';
import '@vonage/vwc-list/vwc-list-item.js';


export async function createElementVariations(wrapper) {
	const textElementWrapper = document.createElement('div');
	textElementWrapper.innerHTML = `
	<vwc-select label="VWC Select with long text" helper="Helper Text">
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
<div>
	<vwc-select helper="select with no label">
  <vwc-list-item
    mwc-list-item=""
    tabindex="0"
    aria-disabled="false"
    role="option"
    aria-selected="true"
    selected=""
    activated=""
  >First option</vwc-list-item>
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
<div style="background-color: rebeccapurple">
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
</vwc-select>
</div>
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
	<vwc-select label="Pill auto dense Select" helper="Helper Text" shape="pill">
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
<hr>
	<vwc-select label="Appearance ghost" helper="Helper Text" appearance="ghost" >
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


