export default (online) => {
  if (online && process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/dist/service-worker.js', { scope: '/' }).
      then(() => {
        console.info('Service worker registered!');
      }).
      catch((error) => {
        console.info('Error registering service worker: ', error);
      });

    navigator.serviceWorker.ready.then((/* registration */) => {
      console.info('Service Worker Ready');
    });
  }
};
