# VWC Icon Button Toggle


## Usage
```html
&lt;vwc-icon-button-toggle onicon=”home” officon=”truck” layout=”outlined” shape=”circled” on></vwc-icon-button-toggle>

```



## API


## Properties/Attributes


|name|attr/prop/reflected|type|description|
|--- |--- |--- |--- |
|on|reflected|boolean|The state of the button|
|onicon|attribute|String|A valid vivid icon name|
|officon|attribute|String|A valid vivid icon name|
|layout|reflected|layout/filled/ghost||
|shape|reflected|“circled”/”rounded”||
|connotation|reflected|string|Connotation valid string|
|dense|reflected|boolean||
|enlarged|reflected|boolean||



## Events


|name|event.detail|description|
|--- |--- |--- |
|icon-button-toggle-change|{isOn: boolean}|Indicates the button has been toggled. isOn indicates the on value of the toggle button.|

