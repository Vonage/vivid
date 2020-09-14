# Vivid overlay lifecycle

Vivid content may be consumed on different levels.
One may consume a single component, like `vwc-button`.
Another use might be to init a common context via `vvd-context` service to style a common HTML native semantics like `H1`, `p` etc.

Any of those involves internal mechanics initialization, like fetching __fonts__ for typography or initialising __schemes__ for a theming / scheme management.
We call those __vivid core__.

Obviously, there is a lifecycle here.
We've designed Vivid overlay lifecycle to be selfcontained, agnostic to other contexts and to not interfere nor require alignment to the existing application lifecycle or any other framework in place.

# Readiness hook

In order to allow ourselves and consuming applications to run code __after__ initialization is done, __vivid core__ exposes a `getReady` API, that returns an internally managed Promise. This Promise will resolve once all of the __core__ services done and ready.

> Important: in case of __custom__ initialization, `getReady` will throw.

```javascript
import { getReady } from '@vonage/vvd-core.js';

...

getReady().then(() => {
	//	do whatever after the init, eg remove the loading vilon
});
```

Most obvious use of `getReady` is to remove the loading vilon, which could be put over the site in order to prevent FOUC (flash of unstyled content).

# Silent/Auto init

If consuming application took no special action, the first use of the Vivid's component/s will auto initialise the __vivid core__.

## Default init

All of the __vivid core__ services know to init themselves to the default values if not specified otherwise.

## Pre-configured init

In order to help Vivid overlay to initialise itself to some specific state, consuming application should use `data-vvd-context` attribute on `html` element.
The below example will auto-initialise __vivid core__ with the dark theme.

```html
<html data-vvd-context="dark">
</html>
```

> Important: the attribute is being examined at the moment of initialization ONLY, so it should be in place BEFORE the initialization performed. We suggest to use this feature as a purely static setup OOTB.

## Custom flow init

Advanced consumer will manage the visual application state (we mean Vivid's part, eg theming) as per user setting.
Obviously, this state, unless injected into the main html by some server side logic, should involve some async work to be done client side, eg fetching personalised settings from the server or from some local storage like IndexedDB.

For those cases we suggest to use `custom` value in the `data-vvd-context`, which will prevent auto init of the __vivid core__. This is the reason, that in this initialization path the `getReady` API is meaningless, therefore throws.

It is the consuming application, which becomes responsible for the core services initialization.

HTML part:
```html
<html data-vvd-context="custom">
...
```

JavaScript part:
```javascript
import { init as initFonts } from '@vonage/vvd-fonts.js';
import { init as initScheme } from '@vonage/vvd-scheme.js';

Promise
	.all([
		initFonts(),
		setScheme('dark')
	])
	.then(() => ... );
```

Each of the services returns promise of initialization readiness of it's own, thus providing a way to run a post-init logic. Reminder: `getReady` API of the __vivid core__ in the __custom__ initialization flavor won't be available.