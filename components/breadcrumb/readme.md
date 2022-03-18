# breadcrumb

In order to use `breadcrumb` you'll need to import both `breadcrumb` and `breadcrumb-item`:
```js
import '@vonage/vwc-breadcrumb-item/vwc-breadcrumb-item.js';
import '@vonage/vwc-breadcrumb/vwc-breadcrumb.js';
```

## Common Usage
### Code
```html
<vwc-breadcrumb>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```
<vwc-breadcrumb>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>

## Multiple hidden crumbs
### Code
```html
<vwc-breadcrumb>
	<vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
	<vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```
<vwc-breadcrumb>
	<vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
	<vwc-breadcrumb-item href="#" text="breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
