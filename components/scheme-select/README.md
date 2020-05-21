# `vwc-scheme-select`

A recommended (but optional) web component controling the app's current selected scheme.
**Requires** [`vvd-scheme`](../../common/scheme) to be initialized.

## Usage

```
<script type="module">
	import '@vonage/vwc-scheme-select';
	import '@vonage/vwc-button';
</script>
<vwc-scheme-select></vwc-scheme-select>
```

It's possible to observe the component selection changes by listening to the `vvdschemeselect` event on the `vwc-scheme-select` component.

```
(async () => {
	await customElements.whenDefined('vwc-scheme-select');
	const schemeSelect = document.querySelector('vwc-scheme-select');
	schemeSelect.addEventListener('vvdschemeselect',
		({ detail: { scheme } }) =>
			// set select scheme in storage of choice...
		)
	);
})();
```
