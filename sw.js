;
//asignar un nombre y version al cache

const CACHE_NAME = 'v1_cache_miYamaha',
urlsToCache = [
    './',
    './Avenir.ttc',
    './css/styles.css',
    './script.js',
    './img/logo.png'
]

//durante la face de instalacion de genera en caché los activos estaticos

self.addEventListener ( 'install', e => {

    e.waitUntil(
        caches.open( CACHE_NAME )
        .then(cache=>{
            return cache.addAll(urlsToCache)
            .then(()=>self.skipWaiting())
        })
        .catch(err=>console.warn('Error al tratar de registar el sW'), err)
    )

} )

//una vez se instala el SW se activa y busca los recursos para hacer que
//funcione sin conexion 

self.addEventListener ( 'activate', e=> {

    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            cacheNames.map(cacheName=>{
                if(cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName) 
                }
                
            })
        })
         //Le indica al SW activar el cache actual
        .then(() => self.clients.clainm())

    )

} )


//cuando el navegador recupera una url
self.addEventListener ( 'fetch', e=> {

    //responder ya sea con el objeto caché o continuar y buscar la url real

    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                //rescuperando del caché
                return res
            }

            //recuperar la petición del url
            return fetch(e.request)

        })
    )

} )
