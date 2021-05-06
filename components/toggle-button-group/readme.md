# vwc-toggle-buttons-group


# Usage


```
<vwc-toggle-button-group>
  <vwc-button value="11">BUTTON</vwc-button>
  <vwc-button value="12">BUTTON</vwc-button>
  <vwc-icon-button icon="home" value="22">BUTTON</vwc-button>
  <vwc-button value="13">BUTTON</vwc-button>
</vwc-toggle-buttons-group>
```



# Template


```
<slot></slot>
```



# API


## Properties/Attributes

|name|attr/prop/reflected|type|description|
|--- |--- |--- |--- |
|multi|reflected|boolean|allows for multiple selections|
|selected (readonly)|property|[]HTMLElement|list of selected items|
|values|property|[]string|The values of the selected items. Setting this property sets the state according to the items with the values in the array|
|items|property|Element[]|A list of valid toggle elements|
|shape|reflected|“pill”/”rounded”||
|accent|reflected|boolean||
|dense|reflected|boolean|Set the size of the buttons as dense|
|enlarged|reflected|boolean|Set the size of the buttons as enlarged|
|required|reflected|boolean|Prevents toggling off the last selection. Also does not send event of non toggled selection.|



## Events


|name|event.detail|description|
|--- |--- |--- |
|selected||Fires when a button is toggled|



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
	*   `layout` - will be set `layout="filled"` on load (note that changing this after initial load will change the way it looks)
