/**
 * Carta Mágica de San Valentín 💕 - Service Worker PWA
 * Soporte Offline Completo & Rendimiento Instantáneo:
 * - Estrategia Cache First / Stale While Revalidate para estilos, fuentes, scripts e imágenes.
 * - Pre-cacheo atómico del App Shell y recursos esenciales.
 * - Activación inmediata con claim de clientes y purga de cachés antiguas.
 */

const CACHE_NAME = 'san-valentin-shell-v1';
const RUNTIME_CACHE = 'san-valentin-runtime-v1';

// Recursos esenciales del App Shell pre-cacheados en la instalación
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './cats/cat1.png',
  './cats/cat2.png',
  './cats/cat3.png',
  './cats/cat4.png'
];

// Evento Install: Descarga y almacenamiento en caché del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((error) => {
        console.warn('[SW San Valentín] Advertencia durante pre-cacheo:', error);
      });
    })
  );
  self.skipWaiting();
});

// Evento Activate: Limpieza de versiones obsoletas y toma de control activa
self.addEventListener('activate', (event) => {
  const activeCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !activeCaches.includes(name))
          .map((name) => {
            console.log('[SW San Valentín] Purgando caché obsoleta:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Función auxiliar: Guardado seguro en caché de runtime
async function putInRuntime(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') {
    const url = new URL(request.url);
    const isGoogleFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
    if (!isGoogleFont && response.type !== 'basic') {
      return;
    }
  }
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
  } catch (err) {
    // No-op defensivo
  }
}

// Estrategia Stale While Revalidate: sirve del caché inmediatamente y actualiza en background
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        putInRuntime(request, networkResponse);
      }
      return networkResponse;
    })
    .catch((err) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      throw err;
    });

  return cachedResponse || fetchPromise;
}

// Intercepción de solicitudes de red
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Filtrar peticiones GET y protocolos válidos (http / https)
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;

  // 1. Navegación HTML: Network-first con fallback a index.html en caché
  const isNavigation = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            putInRuntime(request, networkResponse);
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // 2. Fuentes externas (Google Fonts: googleapis y gstatic)
  const isGoogleFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (isGoogleFont) {
    event.respondWith(
      staleWhileRevalidate(request).catch(() => caches.match(request))
    );
    return;
  }

  // 3. Estilos, scripts e imágenes estáticas: Cache First / Stale While Revalidate
  const isStaticResource =
    url.pathname.includes('/static/') ||
    url.pathname.includes('/cats/') ||
    url.pathname.includes('/icons/') ||
    /\.(?:css|js|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot)$/i.test(url.pathname);

  // Evitar interceptar streaming multimedia con peticiones de rango parcial
  const isMediaStream = /\.(?:mp3|mp4|webm|wav|ogg)$/i.test(url.pathname);

  if (isStaticResource && !isMediaStream) {
    event.respondWith(
      staleWhileRevalidate(request).catch(() => caches.match(request))
    );
    return;
  }

  // 4. Estrategia por defecto: Cache First con fallback a red
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && !isMediaStream) {
          putInRuntime(request, networkResponse);
        }
        return networkResponse;
      });
    })
  );
});
