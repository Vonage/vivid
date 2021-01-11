# Introduction

`vwc-loading-veil` is a UX improvement feature, allowing to present to the user a fast feedback on action while not yet presenting the content as the relevant resources are still loading.

One of the uses of `vwc-loading-veil` is to veil over the whole site during the first load.
Another case could be a use in the complex component / micro-app, that needs some data fetching and pre-processing before being shown, think of widgets or charts as a good candidates for it.
Finally, this could be used in the SPA while navigation from one page to another.

# Timeline

`vwc-loading-veil` life-cycle closely resembles the one of font fallback mechanism described [here](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display#the_font_display_timeline), which is unsurprising since both of them solving the same problem.

Veil timeline comprised from the following phases:
* veil - the whole time the veil is effective; maximum veil time is controlled by `timeout` attribute (defaults to 12 seconds)
* grace - time span from start till showing temporary content; grace time is controlled by `grace` attribute (defaults to 360 millis)
* 'entertainment' - temporary content shown till the veil removal

# API

### Attributes

`delay` - numeric value in millis to wait before showing 'entartaining' (temporary) content; defaults to 360 ms

`timeout` - numeric value in millis to wait before forcibly removing the veil regardless of awaitees; defaults to 12 s

### Methods

`waitFor(awaitees: Promise<unknown>[] | Promise<unknown>): void`
* `awaitees` - one or array of promises, that the veil will wait for, before dismissal (unless timed out)

### Events

`dismissed` - dispatched when the veil is fully removed