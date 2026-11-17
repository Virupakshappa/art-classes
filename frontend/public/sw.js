// Service worker: keeps the app shell and static files on the device so
// repeat visits load instantly and the app still opens on weak or no network.
const CACHE = 'dancing-needles-v3';
const SHELL = ['/', '/index.html', '/manifest.json', '/favicon.ico', '/fonts/cormorant-600-latin.woff2'];
const NAV_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const putInCache = (request, response) => {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
};

// Pages: try the network briefly, otherwise serve the cached app shell
const handleNavigation = (request) => {
  const network = fetch(request).then((res) => putInCache('/index.html', res));
  const timeout = new Promise((resolve) => setTimeout(resolve, NAV_TIMEOUT_MS));
  return Promise.race([network, timeout])
    .then((res) => res || caches.match('/index.html').then((cached) => cached || network))
    .catch(() => caches.match('/index.html'));
};

// Hashed build files never change, so the cached copy is always right
const handleStatic = (request) =>
  caches.match(request).then((cached) => cached || fetch(request).then((res) => putInCache(request, res)));

// Everything else: answer from cache right away, refresh in the background
const handleOther = (request) =>
  caches.match(request).then((cached) => {
    const network = fetch(request).then((res) => putInCache(request, res)).catch(() => cached);
    return cached || network;
  });

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls must always be fresh; the app keeps its own offline copy of them
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
  } else if (url.pathname.startsWith('/static/')) {
    event.respondWith(handleStatic(request));
  } else {
    event.respondWith(handleOther(request));
  }
});
