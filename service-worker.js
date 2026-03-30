const CACHE_NAME = "planner-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch (offline support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Push notifications (future upgrade ready)
self.addEventListener("push", event => {
  const data = event.data?.text() || "Reminder";
  self.registration.showNotification("Planner", {
    body: data
  });
});