if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/javascripts/sw.js')
    .then(res => console.log("Successfully registered!"))
    .catch(err => console.log(err))
}