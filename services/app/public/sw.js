// == Push notifications
// TODO: Separate service workers
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

// == Caching
const cache = {
	name: 'v1',
	// assets: [] // Used to cache specific files
}

// Caching strategies
// const fetchFirst = (request) => fetch(request).catch(() => caches.match(request))
const cacheOnly = (request) => caches.match(request).catch(() => {/* console.log(`Could not find ${request} in cache...`) */})

// Clean up old caches
self.addEventListener("activate", event => {
	event.waitUntil(
		caches.keys()
			.then(keys => keys.filter(k => k != cache.name))
			.then(keys => keys.forEach(k => caches.delete(k)))
	)
})

// Get from cache
// TODO: Do not cache specific routes
self.addEventListener("fetch", event => {
	if(event.request.method != 'GET')
		return

	// Strip parameters
	const reqURL = new URL(event.request.url)
	let req = (reqURL.searchParams.size > 0) ? (reqURL.origin + reqURL.pathname) : event.request;
	
	// Cache response
	if(self.navigator.onLine) {
		caches.open(cache.name).then(c => { c.add(req) })
		return;
	}

	// Offline
	event.respondWith(cacheOnly(req))
})