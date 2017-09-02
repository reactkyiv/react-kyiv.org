const path = require('path');
const spawn = require('react-dev-utils/crossSpawn');

const UNIT_TESTS_SCRIPT = path.resolve('./build-scripts/scripts/runUnitTests.js');
const E2E_TESTS_SCRIPT = path.resolve('./build-scripts/scripts/runE2ETests.js');

spawn.sync('node', [UNIT_TESTS_SCRIPT], { stdio: 'inherit' });
spawn.sync('node', [E2E_TESTS_SCRIPT], { stdio: 'inherit' });
