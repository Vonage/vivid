# Vivid Fonts

As part of the One Vonage unified branding and look'n'feel experience, we are providing a common Web fonts set.
Our font loading service will load a [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) for any supporting platform, while falling back to the static fonts on the non-supporting ones.

To apply Vivid fonts in your application please refer to typography module documentation.

---

#### Support matrix

| | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png) |
| - | - | - | - | - | - |
regular fonts | ✔ | ✔ | ✔ | ✔ | ✔ |
variable fonts | ✔ 62+ | ✔ 62+ | ✔ 17+ | ✔ 49+ | ✔ 11+ | 

---

#### `JS/TS` driven initialization
If the `JS/TS` approach is taken, you should follow the example below:

```
import fonts from '@vonage/vvd-fonts';
...
fonts.init().then(() =>
	//	do post init stuff here
);
```

> Note: this approach won't block site's contents rendering, so you'll most likely to experience FOUC behaviour unless employing some kind of loading vilon on start up.
---
