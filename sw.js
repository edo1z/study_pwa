var cacheName = 'hoge';
var data = [
  'img/img.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Installed');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching data');
      return cache.addAll(data);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request)
      .then(function(r) {
        if (r) {
          console.log('r', r);
          return r;
        }
        return fetch(e.request);
      }
    )
  );
});
