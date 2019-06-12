workbox.setConfig({
  debug: true
});

workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// navigation route will return the app shell 'index.html' to all
// navigation requests
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')  
);

workbox.routing.registerRoute(
  new RegExp("\/api\/wiki"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'wiki-articles'
  })
);

workbox.routing.registerRoute(
  new RegExp("https?:\/\/upload\.wikimedia\.org\/wikipedia\/.*\.(png|jpg|svg|jpeg)$", "i"),
  new workbox.strategies.CacheFirst({
    cacheName: 'wiki-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 500, // max 500 images
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
      })  
    ]
  })
);

self.addEventListener('install', (event) => {
  console.log('SW install event');
});

self.addEventListener('activate', (event) => {
  console.log('SW activate event');
});

// This "catch" handler is triggered when any of the other routes fail to
// generate a response. The handler is used to return the offline partial page
// in response to Wikipedia API requests if the Wikipedia API route above fails (i.e,
// cannot reach the network).
workbox.routing.setCatchHandler(({event}) => {
  if (event.request.url.match(/api\/wiki/)) {
    const key = workbox.precaching.getCacheKeyForURL('offline.partial.html');
    return caches.match(key);
  }
  return Response.error();
});