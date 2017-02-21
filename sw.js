this.addEventListener('fetch', event => {
    // request.mode = navigate isn't supported in all browsers
    // request.mode = naivgate 并没有得到所有浏览器的支持
    // so include a check for Accept: text/html essay-header.
    // 因此对 essay-header 的 Accept：text/html 进行核实
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.essay - headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                // Return the offline page
                // 返回离线页面
                return caches.match(offlineUrl);
            })
        );
    } else {
        // Respond with everything else if we can
        // 返回任何我们能返回的东西
        event.respondWith(caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});
