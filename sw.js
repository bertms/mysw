/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-21 14:28:16
 * @version $Id$
 */
// The files we want to cache
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/mysw/',
    '/mysw/index.html',
    '/mysw/css/style.css',
    '/mysw/images/2.jpg'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
