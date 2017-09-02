/* eslint-disable fp/no-mutating-assign */
const spawn = require('react-dev-utils/crossSpawn');

spawn.sync('sh',
  ['./build-scripts/lang/po2json.sh'],
  { stdio: 'inherit' }
);
