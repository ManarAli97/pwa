if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.log('service worker not registered', err));
}


// let appInstallPrompt = null;
// // const butInstall = document.getElementById('butInstall');
// window.addEventListener('beforeinstallprompt', (e) => {
//     e.preventDefault();
//     console.log("m", appInstallPrompt);
//     appInstallPrompt = e;

// });

// window.addEventListener('beforeinstallprompt', (event) => {
//     // Prevent the mini-infobar from appearing on mobile.
//     event.preventDefault();
//     console.log('👍', 'beforeinstallprompt', event);
//     // Stash the event so it can be triggered later.
//     window.deferredPrompt = event;
//     // Remove the 'hidden' class from the install button container.
//     // divInstall.classList.toggle('hidden', false);
// });