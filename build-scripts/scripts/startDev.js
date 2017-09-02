/* eslint-disable fp/no-mutating-assign */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */

const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');
const openBrowser = require('react-dev-utils/openBrowser');

const WEBPACK_DEV_SERVER = path.resolve('./build-scripts/webpack-dev-server.js');
const NODE_DEV_SERVER = path.resolve('./bin/server.js');

const WEBPACK_DEV_SERVER_ENV = {
  UV_THREADPOOL_SIZE: 100,
  NODE_PATH: './src',
  NODE_ENV: 'development',
  PORT: 3000,
  WEBPACK_DLLS: 1,
};

const NODE_DEV_SERVER_ENV = {
  NODE_PATH: './src',
  NODE_ENV: 'development',
  PORT: 3000,
  HTTPS_PORT: 3009,
  WEBPACK_DLLS: 1,
};

const updateEnvironment = (env = {}) => Object.assign(process.env, env);

updateEnvironment(WEBPACK_DEV_SERVER_ENV);

const webpackDevServer = spawn('node', [WEBPACK_DEV_SERVER], { stdio: ['ipc', 'pipe', 'inherit'] });
let nodeDevServer = null;

webpackDevServer.on('message', ({ devPort }) => {
  if (!nodeDevServer) {
    console.info('==> 🚧  Webpack development server listening on port %s', devPort);

    updateEnvironment(NODE_DEV_SERVER_ENV);
    nodeDevServer = spawn('node', [NODE_DEV_SERVER], { stdio: ['ipc', 'inherit', 'inherit'] });
    nodeDevServer.on('message', (host) => {
      openBrowser(host);
    });
  }
});
