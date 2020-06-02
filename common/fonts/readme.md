# Vivid Fonts

As part of the One Vonage unified branding and look'n'feel experience, we are providing a common Web fonts set.
Our font loading service will load a [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) for any supporting platform, while falling back to the static fonts on the non-supporting ones.

There are two API approaches to init the fonts in your application:
* `JS/TS` driven - import our module and invoke the API method
* `CSS` driven - link a single `CSS` stylesheet to rule them all

See more details about each of those approaches down below.

To use Vivid fonts in your application please apply the following `CSS` rule:
```
body {
	font-family: 'VonageMain';	/* for IE11 only, omit this line if not relevant
	font-family: var(--vvd-font-family-spezia);
}
```

---

#### Support matrix

| | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png) | IE11
| - | - | - | - | - | - | - |
regular fonts | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
variable fonts | ✔ 62+ | ✔ 62+ | ✔ 17+ | ✔ 49+ | ✔ 11+ | 

---

#### `JS/TS` driven initialization
If the `JS/TS` approach is taken, you should follow the example below:

```
import fonts from 'common/fonts/vvd-fonts.js';
...
fonts.init().then(() =>
	//	do post init stuff here
);
```

> Note: this approach won't block site's contents rendering, so you'll most likely to experience FOUC behaviour unless employing some kind of loading vilon on start up.
---

#### `CSS` driven initialization
Link the `vvd-fonts.css` from the location you've put our library in.
It is highly advised to link this resource early in the application lifecycle (for example, up in the `head`).

```
<link rel="stylesheet" href="common/fonts/vvd-fonts.css" />
```

> Note: this approach will block the site's contents rendering until the fonts are fully fetched, yet no FOUC (flash of unstyled content) expected.
