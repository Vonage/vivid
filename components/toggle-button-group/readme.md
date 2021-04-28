# vwc-toggle-buttons-group


# Usage


```
<vwc-toggle-buttons-group>
  <vwc-button value="11" layout="text" type="submit">BUTTON</vwc-button>
  <vwc-button value="12" layout="text" type="submit">BUTTON</vwc-button>
  <vwc-button value="13" layout="text" type="submit">BUTTON</vwc-button>
</vwc-toggle-buttons-group>
```



# Template


```
<slot></slot>
```



# API


## Properties/Attributes


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td><strong>attr/prop/reflected</strong>
   </td>
   <td><strong>type</strong>
   </td>
   <td><strong>description</strong>
   </td>
  </tr>
  <tr>
   <td>
<h3>multi</h3>


   </td>
   <td>reflected
   </td>
   <td>boolean
   </td>
   <td>allows for multiple selections
   </td>
  </tr>
  <tr>
   <td>
<h3>selected (readonly)</h3>


   </td>
   <td>property
   </td>
   <td>[]HTMLElement
   </td>
   <td>list of selected items
   </td>
  </tr>
  <tr>
   <td>
<h3>values</h3>


   </td>
   <td>property
   </td>
   <td>[]string
   </td>
   <td>The values of the selected items. Setting this property sets the state according to the items with the values in the array
   </td>
  </tr>
  <tr>
   <td>
<h3>items</h3>


   </td>
   <td>property
   </td>
   <td>Element[]
   </td>
   <td>A list of valid toggle elements
   </td>
  </tr>
  <tr>
   <td>
<h3>shape</h3>


   </td>
   <td>reflected
   </td>
   <td>“pill”/”rounded”
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
<h3>accent</h3>


   </td>
   <td>reflected
   </td>
   <td>boolean
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
<h3>dense</h3>


   </td>
   <td>reflected
   </td>
   <td>boolean
   </td>
   <td>
		Set the size of the buttons as dense
   </td>
  </tr>
  <tr>
   <td>
<h3>enlarged</h3>


   </td>
   <td>reflected
   </td>
   <td>boolean
   </td>
   <td>
		Set the size of the buttons as enlarged
   </td>
  </tr>
</table>



## Events


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td><strong>event.detail</strong>
   </td>
   <td><strong>description</strong>
   </td>
  </tr>
  <tr>
   <td>
<h3>selected</h3>


   </td>
   <td>
   </td>
   <td>Fires when a button is toggled
   </td>
  </tr>
</table>



# Notes for consumers:



*   No errors are thrown for misuse
	*   Setting a button without a `value` will return a null value if selected.
	*   Adding invalid button elements (supported list is in the code right now) will not be shown or handled as buttons
*   Handling `selected` events:
	*   When handling a `selected` event one would probably like to query the element.values or element.selected to get the current state after the change
*   One can add more buttons dynamically
	*   If you remove an item and not destroy it, remember that there’s a listener on this item
*   Selected items have the `selected`
*   In order to enforce styles, the following attributes are automatically removed:
	*   `layout=”outlined”`
