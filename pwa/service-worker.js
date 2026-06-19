const CACHE_NAME = "lembrete-facil-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  "./icon.png",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
];

// Instalação e Cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Arquivos em cache!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação e Limpeza de Cache antigo
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Removendo cache antigo:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de Fetch (Cache First)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
