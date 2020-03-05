/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "iframe.html",
    "revision": "bf7e7e3dd3c8278e94ef56ecaa3c725f"
  },
  {
    "url": "index.html",
    "revision": "399f1ca05e0f7fbeb9db3041c064fa3f"
  },
  {
    "url": "inline-entry.0-09f1e98a.js",
    "revision": "164516c9c0c8c613280b5b527442cff3"
  },
  {
    "url": "legacy/inline-entry.0-3ddd2a0b.js",
    "revision": "1c87af9678bb3c61d196624de7a08d13"
  },
  {
    "url": "legacy/lit-html-4835365c.js",
    "revision": "e7d319277a9cb4807096e3678cffb81a"
  },
  {
    "url": "legacy/manager-048dc424.js",
    "revision": "4565329816e5847f7968f2913f7e8619"
  },
  {
    "url": "legacy/storybook-73d55478.js",
    "revision": "3c69ca0791f94328a10eeaaddc1e1245"
  },
  {
    "url": "legacy/storybook-b9a36b2f.js",
    "revision": "e68b9ff4841dbe0806eb7ee81fe92c6b"
  },
  {
    "url": "lit-html-72aa662a.js",
    "revision": "bbee302e0c07909036c5ca61f4ebe3b4"
  },
  {
    "url": "manager-129abf2a.js",
    "revision": "d5dc4781fa2915dbccf0846b5d229629"
  },
  {
    "url": "polyfills/core-js.577a5602a7262d6256830802d4aaab43.js",
    "revision": "ccf205728fe514f8276191669b5ea48d"
  },
  {
    "url": "polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js",
    "revision": "cff507bc95ad1d6bf1a415cc9c8852b0"
  },
  {
    "url": "polyfills/dynamic-import.b745cfc9384367cc18b42bbef2bbdcd9.js",
    "revision": "ed55766050be285197b8f511eacedb62"
  },
  {
    "url": "polyfills/fetch.191258a74d74243758f52065f3d0962a.js",
    "revision": "fcdc4efda1fe1b52f814e36273ff745d"
  },
  {
    "url": "polyfills/regenerator-runtime.92d44da139046113cb3739b173605787.js",
    "revision": "3aa324bcf8f59cd0eebf46796948aafa"
  },
  {
    "url": "polyfills/systemjs.6dfbfd8f2c3e558918ed74d133a6757a.js",
    "revision": "683aabfb9b006607885b83e45e9a1768"
  },
  {
    "url": "polyfills/webcomponents.d67d6757b8cd44bc35b021ee0b71d197.js",
    "revision": "e90bc4e3aa3ed407808c7b2726581d33"
  },
  {
    "url": "storybook-35ea0fcf.js",
    "revision": "2087ff1313fea3c39ce9d1a0bd6d59b9"
  },
  {
    "url": "storybook-86416036.js",
    "revision": "2ef642ad6a8284fd3514327e29774d47"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"));
