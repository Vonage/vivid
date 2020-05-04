# VVD Fonts loading

We provide 2 approaches to get the standard Vonage fonts into your application: `CSS` based and `JS/TS` based ones.

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