const pm2 = require('pm2');

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  console.log('CONNECTED TO PM2 FROM RESTART_ON_BUILD.JS')

  pm2.launchBus((err, bus) => {
    bus.on('process:event', (data) => {
      if (data.process.name === 'nuxt-build' && data.event === 'exit') {
        console.log('Build finished, restarting nuxt-app instances');
        pm2.restart('nuxt-app', (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  });
});
