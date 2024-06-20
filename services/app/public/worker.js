// == Caching
// https://developer.chrome.com/docs/workbox/modules/workbox-sw
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js')

// Set workbox to production mode
workbox.setConfig({ debug: false });

// Import workbox packages
const { routing, strategies } = workbox;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

// Config
const version = 'v1';
const networkTimeout = 1;

// TODO: Inject manifest
// https://developer.chrome.com/docs/workbox/modules/workbox-cli

// Static resources
routing.registerRoute(
	({ url, request }) => (request.destination === 'image' || url.pathname.startsWith('/_next/')),
	new strategies.StaleWhileRevalidate({
		cacheName: version,
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxEntries: 300,
				maxAgeSeconds: 7 * 86400,
				purgeOnQuotaError: true,
			}),
		]
	})
);

// Routing (static)
routing.registerRoute(
	({ request }) => request.mode === 'navigate',
	new strategies.StaleWhileRevalidate({
		cacheName: version,
		plugins: [
			// Only cache valid pages
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxEntries: 300,
				maxAgeSeconds: 7 * 86400,
				purgeOnQuotaError: true,
			}),
		]
	})
);

// Routing (dynamic)
routing.registerRoute(
	({ url, request }) => (request.mode === 'navigate' && url.pathname.startsWith('/test/')),
	new strategies.NetworkFirst({
		cacheName: version,
        networkTimeoutSeconds: networkTimeout,
		plugins: [
			// Only cache valid pages
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxEntries: 300,
				maxAgeSeconds: 7 * 86400,
				purgeOnQuotaError: true,
			}),
		]
	})
);