// Custom service worker for immediate activation and cache management

const CACHE_NAME = 'nackte-kanonen-cache-v3';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    // Add more assets as needed, or use a build tool to inject asset list
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate worker immediately
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
                ),
            ),
    );
    self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
