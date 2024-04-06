// == Caching
// https://allegra9.medium.com/add-service-worker-using-next-with-workbox-complete-guide-5d358a2f3f93
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js')

// Config - Disable logging
workbox.setConfig({ debug: false });

// This will trigger the importScripts() for workbox.strategies and its dependencies
// so that it can be used in the event handlers
// https://developer.chrome.com/docs/workbox/modules/workbox-sw/#avoid-async-imports
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-expiration')

self.addEventListener('fetch', (event) => {
	const { request } = event

	// Cache everything
	event.respondWith(
		new workbox.strategies.CacheFirst({
			cacheName: 'v1',
			plugins: [
				// cache indefinitely until the cache storage hits 50
				// then replace the oldest
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 50,
				}),
			],
		}).handle({ event, request }),
	)
})


// == Push notifications
// TODO: Separate service workers?
self.addEventListener("push", event => {
	// This is only push notifications from the website itself,
	// see the "web-push" branch for push notifications from a
	// server
	self.registration.showNotification("Push Notification", {
		icon: "/favicon-32x32.png",
		body: event.data.text(),
	})
	.catch(() => { /* Missing permissions */ });
});