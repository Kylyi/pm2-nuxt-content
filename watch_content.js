const chokidar = require('chokidar');
const pm2 = require('pm2');

// Watch the content folder for changes
const watcher = chokidar.watch('content', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  usePolling: true,
});

watcher.on('ready', () => {
  console.log('Watching content folder for changes');

  watcher.on('all', (event, path) => {
    console.log(`File ${path} has been ${event}`);
    // When a change is detected, start the build process
    pm2.connect((err) => {
      if (err) {
        console.error(err);
        process.exit(2);
      }

      pm2.start('nuxt-build', (err) => {
        if (err) {
          console.log('HERE')
          console.error(err);
        }
      });

      // Listen for the 'nuxt-build' process exit event
      pm2.launchBus((err, bus) => {
        bus.on('process:event', (data) => {

          if (data.process.name === 'nuxt-build' && data.event === 'exit') {
            // Emit a custom event when the build is finished
            // bus.emit('build:finished');

            setTimeout(() => {
              pm2.disconnect();
            }, 500)
          }
        });
      });
    });
  });
});
