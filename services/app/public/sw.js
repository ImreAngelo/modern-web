self.addEventListener("push", function (event) {
	// This is only push notifications from the website itself,
	// see the "web-push" branch for push notifications from a
	// server
	self.registration.showNotification("Push Notification", {
		icon: "/favicon-32x32.png",
		body: event.data.text(),
	})
	.catch(() => { /* Missing permissions */ });
});