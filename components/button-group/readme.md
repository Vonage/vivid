
# vwc-buttons-group


# Usage


```
<vwc-buttons-group>
  <vwc-button click="someFunction()">BUTTON</vwc-button>
  <vwc-button>BUTTON</vwc-button>
  <vwc-button>BUTTON</vwc-button>
</vwc-buttons-group>
```



# Template


```
<slot></slot>
```



# API


## Properties/Attributes


|name|attr/prop/reflected|type|description|
|--- |--- |--- |--- |
|shape|reflected|“pill”/”rounded”||
|dense|reflected|boolean||
|enlarged|reflected|boolean||
|raised|reflected|boolean|defaults to false|
|disabled|reflected|boolean||



# Notes for consumers:



* No errors are thrown for misuse
	* Adding invalid button elements (supported list is in the code right now) will not be handled as buttons
* In order to enforce styles, the following attributes are automatically removed:
	* `layout=”outlined”`
* In order to support a11y, disabled is added per button in the disabled state
