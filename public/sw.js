// Import Workbox from CDN
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.4.0/workbox-sw.js');

const { precacheAndRoute, cleanupOutdatedCaches } = workbox.precaching;
const { registerRoute, NavigationRoute } = workbox.routing;
const { NetworkFirst, CacheFirst } = workbox.strategies;

// Precache all assets injected by workbox-build
precacheAndRoute(self.__WB_MANIFEST);

// Clean up old caches from previous versions
cleanupOutdatedCaches();

// Skip waiting and claim clients immediately
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// Navigation requests (HTML pages) - NetworkFirst with offline fallback
registerRoute(
  new NavigationRoute(
    new NetworkFirst({
      cacheName: 'pages-cache',
      networkTimeoutSeconds: 3,
    }),
  ),
);

// Static assets not in precache - CacheFirst
registerRoute(
  ({ request }) =>
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style' ||
    request.destination === 'script',
  new CacheFirst({
    cacheName: 'static-assets',
  }),
);

// Push notification handling
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
