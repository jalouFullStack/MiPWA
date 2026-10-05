const CACHE_NAME = "mi-pwa-v1";

const ARCHIVOS = ["./", "./index.html", "./style.css", "./script.js"];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");

  event.waitUntil(
    caches.keys().then((cachesExistentes) => {
      return Promise.all(
        cachesExistentes.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        }),
      );
    }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      if (respuesta) {
        return respuesta;
      }
      return fetch(event.request);
    }),
  );
});
