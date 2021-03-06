
const CACHE_NAME = 'online-gobang-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/bootstrap.cosmo.min.css',
  '/img/logo.png',
  '/js/bundle.js'
];

self.addEventListener('install', (event) => {
  console.log('installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('open cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener('activate', (event) => {
//   const cacheWhiteList = [];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (!cacheWhiteList.includes(cache)) {
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

self.addEventListener('fetch', (event) => {
  console.log('fetching a request...');
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      }

      let fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((res) => {
        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }

        let resToCache = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resToCache);
        });

        return res;
      }).catch((err) => {
        console.log(err);
      });
    })
  );
});
