/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute, setCatchHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

// Cache offline.html explicitly if not in manifest (it should be, but this is safe)
const OFFLINE_URL = '/offline.html';

// Handle navigation requests with a network-only strategy, falling back to offline.html
registerRoute(
    new NavigationRoute(new NetworkOnly(), {
        denylist: [
            /^\/api\//, // Example: Don't handle API routes
        ],
    }),
);

// Catch handler for offline fallback
setCatchHandler(async ({ event }) => {
    if (event.request.destination === 'document') {
        return (await caches.match(OFFLINE_URL)) || Response.error();
    }
    return Response.error();
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
