importScripts('js/polyfill/cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('os-cache').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/js/config.js',
                '/js/services/loader.js',
                '/css/generic.css',
                '/css/app.css',
                '/css/main.css',
                '/manifest.json',
                '/js/libs/vuex.js',
                '/js/libs/vue.js',
                '/js/libs/vue-router.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Dont cache no cors
        if(/lipis/.test(event.request.url)) {
            console.log(event.request.url);
            return;
        }
        caches.match(event.request).then(function(response) {
            if(response) return response;
            return fetch(event.request).catch(function(err) {
                console.error(event.request, err);
            });
        })
    );
});