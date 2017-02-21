'use strict';

var cacheVersion = 0;
var currentCache = {
    offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'index.html';

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(currentCache.offline).then(function(cache) {
            return cache.addAll([
                'index.html',
                'images/3.png',
                'images/4.jpg',
                'images/5.jpg',
                'images/6.jpg',
                offlineUrl
            ]);
        })
    );
});

this.addEventListener('fetch', event => {

    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                // Return the offline page
                return caches.match(offlineUrl);
            })
        );
    } else {
        event.respondWith(caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
