
# `vvd-scheme`

This module is responsible for initializing a scheme context in a web app and vivid web components.
A scheme is a set of rules defining the theme of the application and can vary from light, dark and more customizable themes...
in Vivid scheme is a high level definition expressed by CSS variables.

## Usage
import the module and invoke it's init function.
init can accept argument of predefined scheme options 'light' / 'dark' / 'syncwithossettings'.
if not argument provided it will init a default scheme option ('light').
init function returns a promise resolving the load of the scheme.
As scheme are crucial part of application styling it is advised to wait for it to load before exposing un-styled content.

```
<script type="module" async>
	import { init } from '../node_modules/@vonage/vvd-scheme/vvd-scheme.js';

	(async () => {
	await init('dark');
	document.body.classList.add('app-style-ready');
	})();
</script>

<!-- Waiting for scheme to load as it's a crucial part of the app style -->
<style rel="stylesheet">
	body:not(.app-style-ready) {
	visibility: hidden;
	}
</style>
```
