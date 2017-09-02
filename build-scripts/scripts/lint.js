/* eslint-disable fp/no-mutating-assign */
const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');
const ESLINT = path.resolve('node_modules', 'eslint/bin/eslint.js');

spawn.sync(ESLINT,
  ['-c', '.eslintrc', 'src'],
  { stdio: 'inherit' }
);
