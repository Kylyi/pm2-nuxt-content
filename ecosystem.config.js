module.exports = {
  apps: [
    {
      name: 'nuxt-build',
      script: 'yarn build',
      watch: false,
      ignore_watch: ['.output', 'node_modules', '.nuxt', 'dist'],
      instances: 1,
      autorestart: false,
      watch_options: {
        followSymlinks: false,
        usePolling: true,
      },
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'nuxt-app',
      script: 'node .output-live/server/index.mjs',
      instances: 1,
      autorestart: false,
      env: {
        NODE_ENV: 'production',
      },
      listen_timeout: 5000,
      kill_timeout: 5000,
    },
    {
      name: 'watch-content',
      script: 'watch_content.js',
      instances: 1,
      autorestart: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'restart-on-build',
      script: 'restart-on-build.js',
      instances: 1,
      autorestart: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
