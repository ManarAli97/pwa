const staticCacheName = 'site-static-v3';
const dynamicCacheName = 'site-dynamic-v3';
const assets = [
    'offline.html'
];

// install event 
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {

    if (evt.request.url.indexOf('enter') > -1) {
        evt.respondWith(
            caches.open(dynamicCacheName).then(function(cache) {

                return cache.match(evt.request).then(function(response) {

                    var fetchPromise = fetch(evt.request).then(function(networkResponse) {

                        cache.put(evt.request, networkResponse.clone());
                        return networkResponse;
                    });

                    return response || fetchPromise;
                });
            }),
        );
    } else {


        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {

                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        if ((evt.request.url.indexOf('.css') > -1 || evt.request.url.indexOf('.js') > -1 || evt.request.url.indexOf('.png') > -1 || evt.request.url.indexOf('.gif') > -1 || evt.request.url.indexOf('.jpg') > -1 || evt.request.url.indexOf('.mp4') > -1) && evt.request.url.indexOf('app.js') <= -1) {
                            cache.put(evt.request.url, fetchRes.clone());

                            return fetchRes;
                        } else {

                            return fetchRes;
                        }

                    })
                });
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('offline.html');
                }
            })
        )
    }
});