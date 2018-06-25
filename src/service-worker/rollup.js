const fs = require('fs');

/**
 * Unfortuately angular prevents us from registering a notification click event 
 * and doesnt implent it itself, so that a click on a  notifcation cant navigate to
 * he result page
 * 
 * This script modifies the regenerated ngsw-worker.js file and insert the 'notificationclick'
 * eventhandler
 * The script will be automatically executed after building the project in poduction moder
 * --> implemented in package.json (start scripts)
 */

const search = "this.scope.addEventListener('push', (event) => this.onPush(event));";
const ngsw_worker = "./dist/ngsw-worker.js";


const code = `\nthis.scope.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification click Received. event', event);
    event.notification.close();
    console.log(event.notification.data.url);
    if (clients.openWindow && event.notification.data.url) {
        event.waitUntil(clients.openWindow(event.notification.data.url));
    }
  });`;

console.log('Rollup: Modify ngsw-worker.js for notificationclick event');

fs.readFile(ngsw_worker, (err, text)=> {
    if(err) {
        console.error(err);
        throw err;
    }
    else{
        let insertIndex = text.indexOf(search) + search.length;
        let t = Buffer.concat([
            text.subarray(0, insertIndex), 
            Buffer.from(code, 'utf-8'), 
            text.subarray(insertIndex, text.length)]);
        fs.writeFile(ngsw_worker, t, (err) => {
            if(err){
                console.error(err);
                throw err;
            }
        });
    }
});