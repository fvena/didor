importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0b1caf5f891628963910.js",
    "revision": "e5458b57d7a4ed9f34d3e21f046eac7d"
  },
  {
    "url": "/_nuxt/4a7e91189acdb75e28d5.js",
    "revision": "9fc3287cebe7633efc86de7e2a14af26"
  },
  {
    "url": "/_nuxt/d2087a1e23c05d9cd45a.js",
    "revision": "a893e042d3d55183e76050b0c59fcf67"
  },
  {
    "url": "/_nuxt/e6961fd67726e3e984d8.js",
    "revision": "80f5fd283ba88073f8a1ac8b6b12d7f5"
  }
], {
  "cacheId": "didor",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
