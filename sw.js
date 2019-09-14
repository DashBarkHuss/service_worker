if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      console.log(3)
     navigator.serviceWorker.register('sw.js')
     .then((registration) => {
       console.log("Service Worker registration successful")
      }, (err) => {
       console.log("Registration failed")
      })
     })
   }

   var CACHE_NAME = 'static-cache';
   var urlsToCache = [
     '.', 'index.html', 'folder/dash.html'
   ]

   self.addEventListener('install', 
    function(e){
      // console.log(19)
      e.waitUntil(caches.open(CACHE_NAME)
        .then(function(cache){
          return cache.addAll(urlsToCache)
        })
      );
    });

    self.addEventListener('fetch', 
      function(e){
        e.respondWith(
          caches.match(e.request)
          .then(response=>response||fetch(event.request))
        )
      }
    )