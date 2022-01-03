# vwc-elevation

## Introduction

The _elevation_ component enables a user to set perceived elevation to a certain level.

Note that this component is responsible for the perceived elevation alone and not to DOM elements z-indexing.


## Usage


```
<vwc-elevation dp="2"><div>Content</div></vwc-elevation>
```



## API

### Properties/Attributes

|name|attr/prop/reflected|type| description                                                                               |
|--- |--- |--- |-------------------------------------------------------------------------------------------|
|dp|property/attribute|string| Level in Density-Independent Pixels (DP). Possible values: `0`,`2`,`4`,`8`,`12`,`16`,`24` |

### CSS Variables

|name|description|default|
|--- |--- |--- |
|`--vvd-elevation-background-color`|Color for the elevation surface background | defaults to theme’s surface background |
|`--vvd-elevation-border-radius`|Border radius of the elevation’s surface in pixels| 6px |

# Example:

![image](assets/images/vwc-elevation.svg)

Example’s code:

```
<style>
	#VwcElevation {
		display: inline-block;
	}

	vwc-elevation {
		margin: 5px;
		display: block;
	}
	.card {
		width: 300px;
		height: 30px;
		padding: 20px;
		text-align: center;
	}
</style>
<div>
	<vwc-elevation dp="0">
		<div class="card">
			This is the content inside the elevation with DP 0
		</div>
	</vwc-elevation>

	<vwc-elevation dp="24">
		<div class="card">
			This is the content inside the elevation with DP 24
		</div>
	</vwc-elevation>
</div>
```


