importScripts('js/polyfill/cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('os-cache').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/css/main.css',
                '/js/config.js',
                '/js/services/loader.js',
                '/css/generic.css',
                '/css/app.css',
                '/manifest.json',
                '/js/libs/vuex.js',
                '/js/libs/vue.js',
                '/js/libs/vue-router.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET' && ! /apis\.google|connect\.facebook|lipis\.github/.test(event.request.url)) {
        caches.open('os-cache').then(function(cache) {
            cache.add(event.request.url);
        });
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response;// || fetch(event.request);
        })
    );
});