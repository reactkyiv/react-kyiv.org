const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');

const JEST = path.resolve('node_modules', 'jest/bin/jest.js');

spawn.sync(JEST, ['--coverage'], { stdio: 'inherit' });
