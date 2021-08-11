### Vivid Fonts

As part of the One Vonage unified branding and look'n'feel experience, we are providing a common Web fonts set.
Our font loading service will load a [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) for any supporting platform, while falling back to the static fonts on the non-supporting ones.

---

### Usage

Im most majority of the cases, consuming application should __do nothing__ with regard to fonts initialization.
Fonts service is automatically initialized (fonts pulled and installed into the global document scope) as part of the Vivid Core.

The only case when one needs to perform a proactive fonts service initialization, is when one used Vivid Fonts solely.
In this case do:
```javascript
import { init } from '@vonage/vvd-fonts';
...
init().then(() =>
	//	do post init stuff here
);
```

> Pay attention: while fonts service installs the fonts, it is NOT auto applying them to any native HTML element. To apply Vivid fonts in your application please refer to Vivid Context service documentation.

---

### Performance hints

We are initializing fonts asynchronously.
This approach won't block site's contents rendering, so you'll most likely to experience FOUC behaviour.
There are few things to do about it.
First, we suggest employing some kind of loading veil on web application start up.
This is a well-known practice and is already in use in some of Vonage's application.

Additionally, we suggest to 'decorate' your main HTML with the following optimization hints:
```html
<link rel="preload" crossorigin
	href="//fonts.resources.vonage.com/fonts/v1/Spezia_Web_Complete_Upright.woff2"
	as="font"
	type="font/woff2">
<link rel="prefetch" crossorigin
	href="//fonts.resources.vonage.com/fonts/v1/Spezia_Web_Monospace_Complete.woff2"
	as="font"
	type="font/woff2">
```

Explanation:
* The first link, `preload`, says to browser that it MUST load our basic, used everywhere font immediatelly.
While this will still be performed asyncronously, it'll prioritize our main font resource high.
* The second link, `prefetch`, hints the browser to load our secondary, _monospace_ font, sooner than later.

> Attention! We've found, that `preload` and `prefetch` are **not supported** in Safari (up and include 14), specifially some inconsistensies found when browsing from and between `iframe` elements. Although `iframe` usage is quite rare nowadays, if there is any chance that some HTML will find itself loaded via `iframe`, please do not use the above hints as of now.
