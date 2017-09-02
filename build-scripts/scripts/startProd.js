/* eslint-disable fp/no-mutating-assign */

const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');

const BUILD_SCRIPT = path.resolve('./build-scripts/scripts/build.js');

spawn.sync('node', [BUILD_SCRIPT], { stdio: 'inherit' });

const NODE_PROD_SERVER = path.resolve('./bin/server.js');

const NODE_PROD_SERVER_ENV = {
  NODE_PATH: './src',
  NODE_ENV: 'production',
  PORT: 8080,
  HTTPS_PORT: 8081,
};

const updateEnvironment = (env = {}) => Object.assign(process.env, env);

updateEnvironment(NODE_PROD_SERVER_ENV);

spawn('node', [NODE_PROD_SERVER], { stdio: 'inherit' });

if (process.send) {
  process.send('DONE');
}
