var CACHE_NAME = 'ryoshi-v1';
var filesToCache = [
  //Images
  //'/image/a1.jpg'
  //Assets

];

// Listen to installation event
self.addEventListener('install', function(event) {
  // Perform install steps
  /*event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
      })
  );*/
});

self.addEventListener('fetch', function(event) {
  /*event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );*/
});
