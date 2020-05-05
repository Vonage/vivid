# VVD Fonts loading

As part of the One Vonage unified branding and look'n'feel experience, we are to provide a common Web fonts set.
There are two supported approaches to get the standard Vonage fonts into your application:
* `CSS` based
* `JS/TS` based ones

To use Vivid fonts in your application please apply the following `CSS` rule:
```
body {
	font-family: 'VonageMain';	/* IE11 fallback
	font-family: var(--vvd-font);
}
```

---

#### `CSS` driven font loading
In order to get fonts into your application import the `vvd-fontier.css` from the location you've put our library.
It is highly advised to link this resource eagerly.

```
<link rel="stylesheet" href="common/fontier/vvd-fontier.css" />
```

> Note: this approach will block the site's contents rendering until the fonts are fully fetched.

---

#### `JS/TS` driven loading
If the `JS/TS` approach is taken, do as in the following example:

```
import { prepareFont } from 'common/fontier/vvd-fontier.js';
...
prepareFont().then(() => {
	//	do some actions, that you'd defer until fonts are ready
});
```

> Note: this approach won't block site's contents rendering, so you'll most likely experience Flash Of Unstyled Content behaviour.