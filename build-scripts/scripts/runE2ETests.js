/* eslint-disable no-process-exit */

const path = require('path');
const { exec } = require('child_process');
const spawn = require('react-dev-utils/crossSpawn');

const PROD_SERVER_SCRIPT = path.resolve('./build-scripts/scripts/startProd.js');
const WEBDRIVER_MANAGER = path.resolve('node_modules', 'webdriver-manager/bin/webdriver-manager');
const PROTRACTOR = path.resolve('node_modules', 'protractor/bin/protractor');

spawn.sync(WEBDRIVER_MANAGER, ['update'], { stdio: 'inherit' });

const prodServer = spawn('node', [PROD_SERVER_SCRIPT], { stdio: ['ipc', 'inherit', 'inherit'] });

prodServer.on('message', () => {
  const e2eTests = spawn.sync(PROTRACTOR, [], { stdio: 'inherit' });

  exec('kill -kill `lsof -t -i tcp:8080`');

  process.exit(e2eTests.status);
});
