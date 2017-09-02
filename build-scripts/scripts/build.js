/* eslint-disable fp/no-mutating-assign */

const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');

const WEBPACK = path.resolve('node_modules', 'webpack/bin/webpack.js');

const BUILD_ENV = {
  NODE_ENV: 'production',
};

const updateEnvironment = (env = {}) => Object.assign(process.env, env);

updateEnvironment(BUILD_ENV);

spawn.sync(WEBPACK,
  ['--colors', '--display-error-details', '--display-optimization-bailout', '--config=build-scripts/prod.config.js'],
  { stdio: ['pipe', 'pipe', 'inherit'] }
);
