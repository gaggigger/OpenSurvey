importScripts('js/polyfill/cache-polyfill.js');

var cacheKey = 'os-cache';

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheKey).then(function(cache) {
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

var ignoreRequests = new RegExp('(' + [
    'github\.io',
    'connect\.facebook\.net',
    'apis\.google\.com'
].join('(\/?)|\\') + ')$');

function onFetch(event) {
    if (ignoreRequests.test(event.request.url)) {
        console.log('ignored: ', event.request.url);
        return
    }
    event.respondWith(fetchAndCache(event))
}

function fetchAndCache(event) {
    return caches
        .match(event.request)
        .then(function(cached) {
            var networked = fetch(event.request)
                .then(fetchedFromNetwork(event));
            return cached || networked
        })
}

function fetchedFromNetwork(event) {
    return function transform(response) {
        var cacheCopy = response.clone();
        caches
            .open(cacheKey)
            .then(function add(cache) {
                cache.put(event.request, cacheCopy)
            })
            .then(function() {
                // console.log('WORKER: fetch response stored in cache.', event.request.url)
            });
        return response
    }
}

self.addEventListener('fetch', onFetch);
