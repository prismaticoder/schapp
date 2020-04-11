self.addEventListener('fetch', function(event) {
    event.respondWith(
        new Response(`This intercepts thesdsd page!`)
    )
})