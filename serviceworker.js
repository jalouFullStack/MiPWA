const CACHE_NAME = "mi-pwa-v2";

const ARCHIVOS = ["./", "./index.html", "./style.css", "./script.js"];

// INSTALACIÓN
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS);
    }),
  );

  self.skipWaiting();
});

// ACTIVACIÓN
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");

  event.waitUntil(
    caches
      .keys()
      .then((cachesExistentes) => {
        return Promise.all(
          cachesExistentes.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// NETWORK FIRST
self.addEventListener("fetch", (event) => {
  // Solo manejar peticiones GET del mismo origen.
  if (
    event.request.method !== "GET" ||
    new URL(event.request.url).origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((respuesta) => {
        // Guardar respuestas correctas.
        if (respuesta.ok) {
          const copia = respuesta.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copia);
          });
        }

        return respuesta;
      })
      .catch(async () => {
        // Si falla la red, buscar en caché.
        const respuestaCache = await caches.match(event.request);

        if (respuestaCache) {
          return respuestaCache;
        }

        // Si no existe una copia, mostrar la página principal.
        if (event.request.mode === "navigate") {
          const pagina = await caches.match("./index.html");

          if (pagina) {
            return pagina;
          }
        }

        // Sin conexión y sin copia disponible.
        return new Response(
          "Sin conexión. Este recurso no está disponible sin internet.",
          {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
            },
          },
        );
      }),
  );
});
