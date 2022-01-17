const cacheName = 'v1.taPWA';

self.addEventListener('install', (e) => {
  console.log('Service Worker Install');

  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log('Service Worker Caching all: App content');
      await cache.addAll(appContents);
    })()
  );
});

self.addEventListener('fetch', function (e) {
  console.log('Start Service Worker');
  e.respondWith(
    (async () => {
      const res = await caches.match(e.request);
      console.log(`Service Worker Fetching: ${e.request.url}`);
      if (res) {
        return res;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`Service Worker Caching new files: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

const appContents = [
  './hangman/hangman.js',
  './hangman/graphics/0.png',
  './hangman/graphics/1.png',
  './hangman/graphics/2.png',
  './hangman/graphics/3.png',
  './hangman/graphics/4.png',
  './hangman/graphics/5.png',
  './hangman/graphics/6.png',
  './imgs/favicon.ico',
  './imgs/eksu.png',
  './imgs/hangman.png',
  './imgs/hangmanTwo.png',
  './imgs/logoOne.png',
  './imgs/logoThree.png',
  './imgs/logoTwo.png',
  './imgs/projects.png',
  './imgs/splash.png',
  './imgs/stafford.png',
  './imgs/think.png',
  './imgs/Tobi.webp',
  './imgs/Tobii.png',
  './imgs/webFour.png',
  './imgs/webOne.png',
  './imgs/webThree.png',
  './imgs/webTwo.png',
  './think/think.js',
  './about.css',
  './about.html',
  './app.js',
  './contact.css',
  './contact.html',
  './contact.js',
  './game.html',
  './hangman.css',
  './hangman.html',
  './index.css',
  './index.html',
  './script.js',
  './think.css',
  './think.html',
  './imgs/icon-192x192.png',
  './imgs/icon-256x256.png',
  './imgs/icon-384x384.png',
  './imgs/icon-512x512.png',
];
